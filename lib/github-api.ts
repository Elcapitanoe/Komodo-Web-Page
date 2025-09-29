import type { Release, RateLimit, GitHubApiResponse, ApiError } from './types';

const GITHUB_API_BASE = 'https://api.github.com';
const REPO_OWNER = 'Elcapitanoe';
const REPO_NAME = 'Komodo-Build-Prop';
const REQUEST_TIMEOUT = 15000;
const MAX_RETRIES = 2;

function resolveGitHubToken(): string | undefined {
  const envVarNames = ['GH_TOKEN', 'GITHUB_TOKEN'];
  const viteEnvVarNames = ['GH_TOKEN', 'VITE_GH_TOKEN', 'GITHUB_TOKEN', 'VITE_GITHUB_TOKEN'];

  if (typeof process !== 'undefined' && typeof process.env !== 'undefined') {
    for (const name of envVarNames) {
      const value = process.env[name];
      if (value) {
        return value;
      }
    }
  }

  try {
    const env = (import.meta as ImportMeta | undefined)?.env;
    if (env) {
      const envRecord = env as Record<string, string | undefined>;
      for (const name of viteEnvVarNames) {
        const value = envRecord[name];
        if (value) {
          return value;
        }
      }
    }
  } catch {
    // Ignore errors accessing import.meta in non-browser environments
  }

  return undefined;
}

interface RequestOptions {
  readonly timeout?: number;
  readonly retries?: number;
  readonly etag?: string;
}

class GitHubApiError extends Error implements ApiError {
  public readonly code: string;

  constructor(
    message: string,
    public readonly status: number = 0,
    code?: string
  ) {
    super(message);
    this.name = 'GitHubApiError';
    this.code = code ?? 'UNKNOWN_ERROR'; // fallback ke string default
  }
}


function createHeaders(etag?: string): HeadersInit {
  const headers: Record<string, string> = {
    'User-Agent': 'Komodo-Build-Prop-Site/1.0',
    'Accept': 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
  };

  const token = resolveGitHubToken();
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  if (etag) {
    headers['If-None-Match'] = etag;
  }

  return headers;
}

async function fetchWithTimeout(
  url: string,
  options: RequestInit & { timeout?: number }
): Promise<Response> {
  const { timeout = REQUEST_TIMEOUT, ...fetchOptions } = options;
  
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);
  
  try {
    const response = await fetch(url, {
      ...fetchOptions,
      signal: controller.signal,
    });
    clearTimeout(timeoutId);
    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    if (error instanceof Error && error.name === 'AbortError') {
      throw new GitHubApiError('Request timeout', 408, 'TIMEOUT');
    }
    throw error;
  }
}

async function fetchWithRetry(
  url: string,
  options: RequestOptions = {}
): Promise<Response> {
  const { timeout = REQUEST_TIMEOUT, retries = MAX_RETRIES, etag } = options;
  let lastError: Error;

  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const response = await fetchWithTimeout(url, {
        headers: createHeaders(etag),
        timeout,
      });
      
      if (response.ok || response.status === 304) {
        return response;
      }
      
      if (response.status === 403) {
        const resetTime = response.headers.get('X-RateLimit-Reset');
        const resetDate = resetTime ? new Date(parseInt(resetTime) * 1000) : null;
        throw new GitHubApiError(
          `Rate limit exceeded${resetDate ? `. Reset at: ${resetDate.toISOString()}` : ''}`,
          403,
          'RATE_LIMIT'
        );
      }
      
      if (response.status === 404) {
        throw new GitHubApiError('Resource not found', 404, 'NOT_FOUND');
      }
      
      if (response.status >= 500 && attempt < retries) {
        const delay = Math.min(1000 * Math.pow(2, attempt), 5000); // Max 5 second delay
        await new Promise(resolve => setTimeout(resolve, delay));
        continue;
      }
      
      throw new GitHubApiError(
        `HTTP ${response.status}: ${response.statusText}`,
        response.status,
        'HTTP_ERROR'
      );
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));
      
      if (lastError instanceof GitHubApiError && 
          (lastError.code === 'RATE_LIMIT' || lastError.code === 'NOT_FOUND')) {
        throw lastError;
      }
      
      if (attempt < retries) {
        const delay = Math.min(1000 * Math.pow(2, attempt), 5000);
        await new Promise(resolve => setTimeout(resolve, delay));
        continue;
      }
      
      throw lastError;
    }
  }
  
  throw lastError!;
}

export async function fetchReleases(): Promise<GitHubApiResponse<Release[]>> {
  const url = `${GITHUB_API_BASE}/repos/${REPO_OWNER}/${REPO_NAME}/releases`;
  
  try {
    const response = await fetchWithRetry(url, { retries: MAX_RETRIES });
    
    if (!response.ok) {
      throw new GitHubApiError(`Failed to fetch releases: ${response.status}`, response.status);
    }
    
    const releases: Release[] = await response.json();
    const rateLimit = extractRateLimit(response);
    
    // Log for ISR debugging
    console.log(`Fetched ${releases.length} releases, rate limit: ${rateLimit.remaining}/${rateLimit.limit}`);
    
    return { data: releases, rateLimit };
  } catch (error) {
    if (error instanceof GitHubApiError) {
      throw error;
    }
    throw new GitHubApiError('Failed to fetch releases', 0, 'FETCH_ERROR');
  }
}

export async function fetchRateLimit(): Promise<RateLimit> {
  const url = `${GITHUB_API_BASE}/rate_limit`;
  
  try {
    const response = await fetchWithRetry(url, { retries: MAX_RETRIES });
    
    if (!response.ok) {
      throw new GitHubApiError(`Failed to fetch rate limit: ${response.status}`, response.status);
    }
    
    const data = await response.json();
    return extractRateLimit(response, data);
  } catch (error) {
    console.warn('Failed to fetch rate limit:', error);
    return {
      limit: 0,
      remaining: 0,
      reset: 'Unknown',
    };
  }
}

function extractRateLimit(response: Response, data?: any): RateLimit {
  const limit = parseInt(response.headers.get('X-RateLimit-Limit') || '0', 10);
  const remaining = parseInt(response.headers.get('X-RateLimit-Remaining') || '0', 10);
  const resetTimestamp = parseInt(response.headers.get('X-RateLimit-Reset') || '0', 10);

  const coreResource = data?.resources?.core ?? {};
  const rateData = data?.rate ?? {};

  const finalLimit = limit || coreResource.limit || rateData.limit || 0;
  const finalRemaining = remaining || coreResource.remaining || rateData.remaining || 0;
  const finalReset = resetTimestamp || coreResource.reset || rateData.reset || 0;
  
  const resetDate = new Date(finalReset * 1000);
  const reset = resetDate.toLocaleString('en-US', {
    timeZone: 'Asia/Jakarta',
  year: 'numeric',
  month: 'short',
  day: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
  hour12: false,
}) + ' (UTC+7)';
  
  return {
    limit: finalLimit,
    remaining: finalRemaining,
    reset,
  };
}

export function findLatestStableRelease(releases: Release[]): Release | null {
  if (!releases || releases.length === 0) {
    return null;
  }
  
  const stableRelease = releases.find(release => 
    !release.draft && 
    !release.prerelease &&
    !release.name.toLowerCase().includes('draft') &&
    !release.name.toLowerCase().includes('pre') &&
    !release.tag_name.toLowerCase().includes('alpha') &&
    !release.tag_name.toLowerCase().includes('beta')
  );
  
  return stableRelease || releases[0]!;
}