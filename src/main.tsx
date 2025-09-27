import React, { useCallback, useEffect, useMemo, useState } from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter, Route, Routes } from 'react-router-dom';
import '../styles/globals.css';

import { initializeTheme } from './theme';
import type { Release, RateLimit } from '../lib/types';
import {
  fetchReleases,
  fetchRateLimit,
  findLatestStableRelease,
} from '../lib/github-api';

initializeTheme();

type DataState =
  | { status: 'loading'; releases: Release[]; latest: Release | null; rateLimit?: RateLimit; error?: undefined }
  | { status: 'error'; releases: Release[]; latest: Release | null; rateLimit?: RateLimit; error: string }
  | { status: 'ready'; releases: Release[]; latest: Release | null; rateLimit?: RateLimit; error?: undefined };

const initialState: DataState = {
  status: 'loading',
  releases: [],
  latest: null,
};

function useReleaseData() {
  const [state, setState] = useState<DataState>(initialState);

  const load = useCallback(async () => {
    setState({ status: 'loading', releases: [], latest: null });

    const [releasesResult, rateLimitResult] = await Promise.allSettled([
      fetchReleases(),
      fetchRateLimit(),
    ]);

    if (releasesResult.status === 'fulfilled') {
      const latest = findLatestStableRelease(releasesResult.value.data);
      const rateLimit =
        rateLimitResult.status === 'fulfilled'
          ? rateLimitResult.value
          : releasesResult.value.rateLimit;

      setState({
        status: 'ready',
        releases: releasesResult.value.data,
        latest,
        rateLimit,
      });
      return;
    }

    const fallbackRateLimit =
      rateLimitResult.status === 'fulfilled' ? rateLimitResult.value : undefined;

    setState({
      status: 'error',
      releases: [],
      latest: null,
      rateLimit: fallbackRateLimit,
      error: releasesResult.reason instanceof Error
        ? releasesResult.reason.message
        : 'Failed to load release data.',
    });
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  return useMemo(() => ({ state, retry: load }), [state, load]);
}

function HomeRoute(): JSX.Element {
  const { state, retry } = useReleaseData();

  if (state.status === 'loading') {
    return (
      <section className="flex min-h-[50vh] flex-col items-center justify-center gap-4 text-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary-500 border-b-transparent" />
        <p className="text-base text-gray-600 dark:text-gray-300">Loading latest releases…</p>
      </section>
    );
  }

  if (state.status === 'error') {
    return (
      <section className="flex min-h-[50vh] flex-col items-center justify-center gap-4 text-center">
        <p className="text-lg font-semibold text-red-500">We could not load release information.</p>
        <p className="max-w-md text-sm text-gray-600 dark:text-gray-400">
          {state.error}
        </p>
        <button
          type="button"
          onClick={() => {
            void retry();
          }}
          className="rounded-lg bg-primary-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-primary-700"
        >
          Try again
        </button>
      </section>
    );
  }

  return (
    <section className="space-y-6">
      <header className="space-y-2 text-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Release overview</h1>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Data fetched from the existing GitHub API client at runtime.
        </p>
      </header>

      {state.latest && (
        <article className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900">
          <h2 className="text-xl font-semibold text-primary-600">Latest stable release</h2>
          <p className="mt-1 text-lg font-medium text-gray-900 dark:text-gray-100">{state.latest.name}</p>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Published on {new Date(state.latest.published_at).toLocaleString()}
          </p>
          <a
            href={`https://github.com/{GITHUB_USERNAME}/{REPO_NAME}/releases/tag/${state.latest.tag_name}`}
            className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-primary-600 hover:text-primary-500"
          >
            View on GitHub
          </a>
        </article>
      )}

      <section className="rounded-xl border border-dashed border-gray-300 p-4 text-sm dark:border-gray-700">
        <p className="font-semibold text-gray-900 dark:text-white">API usage</p>
        <p className="text-gray-600 dark:text-gray-400">
          Remaining requests: {state.rateLimit?.remaining ?? '—'} / {state.rateLimit?.limit ?? '—'}
        </p>
        <p className="text-xs text-gray-500 dark:text-gray-500">
          Resets at: {state.rateLimit?.reset ?? 'Unknown'}
        </p>
      </section>
    </section>
  );
}

function AppRouter(): JSX.Element {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<HomeRoute />} />
      </Routes>
    </HashRouter>
  );
}

const container = document.getElementById('app');

if (!container) {
  throw new Error('Missing #app container.');
}

ReactDOM.createRoot(container).render(
  <React.StrictMode>
    <AppRouter />
  </React.StrictMode>
);
