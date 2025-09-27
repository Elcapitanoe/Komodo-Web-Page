import type { Release, RateLimit } from '../lib/types';
import {
  formatDownloadCount,
  calculateTotalDownloadsFromAllReleases,
  calculateTotalDownloads,
} from '../lib/utils';

export function HeroSection(
  release: Release | null,
  releases: Release[] = [],
  rateLimit?: RateLimit
): HTMLElement {
  const section = document.createElement('section');
  section.className = 'rounded-lg border border-slate-200 bg-white p-6 shadow-sm sm:p-8';

  const totalDownloadsAll = releases.length > 0 ? calculateTotalDownloadsFromAllReleases(releases) : 0;
  const latestReleaseDownloads = release ? calculateTotalDownloads(release.assets) : 0;
  const latestTag = release?.tag_name ?? 'Awaiting release';
  const publishedDate = release ? new Date(release.published_at).toLocaleDateString() : 'Not published yet';
  const rateLimitRemaining = rateLimit ? `${rateLimit.remaining}/${rateLimit.limit}` : 'Unavailable';
  const rateLimitReset = rateLimit?.reset ?? 'Unknown';

  section.innerHTML = `
    <div class="space-y-6">
      <div class="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div class="space-y-3">
          <p class="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Komodo Build Prop</p>
          <h1 class="text-3xl font-semibold text-slate-900 sm:text-4xl">Spoof your Android device with a Pixel identity</h1>
          <p class="text-sm text-slate-600 sm:max-w-xl">
            A lightweight Magisk module that updates build properties so Google services recognise your device as a Pixel 9 Pro XL.
          </p>
        </div>
        ${
          release
            ? `
              <a
                href="${release.assets[0]?.browser_download_url ?? '#'}"
                class="inline-flex items-center justify-center gap-2 rounded-md border border-slate-300 bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>Download</span>
                <span class="font-mono text-xs">${release.tag_name}</span>
              </a>
            `
            : `
              <div class="rounded-md border border-dashed border-slate-300 px-4 py-2 text-sm text-slate-500">
                First public release is on the way.
              </div>
            `
        }
      </div>

      <div class="grid gap-3 sm:grid-cols-3">
        <div class="rounded-md border border-slate-200 bg-slate-50 p-4">
          <p class="text-xs font-medium uppercase tracking-wide text-slate-500">Total downloads</p>
          <p class="mt-2 text-2xl font-semibold text-slate-900">${formatDownloadCount(totalDownloadsAll)}</p>
        </div>
        <div class="rounded-md border border-slate-200 bg-slate-50 p-4">
          <p class="text-xs font-medium uppercase tracking-wide text-slate-500">Latest release downloads</p>
          <p class="mt-2 text-2xl font-semibold text-slate-900">${formatDownloadCount(latestReleaseDownloads)}</p>
        </div>
        <div class="rounded-md border border-slate-200 bg-slate-50 p-4">
          <p class="text-xs font-medium uppercase tracking-wide text-slate-500">Published builds</p>
          <p class="mt-2 text-2xl font-semibold text-slate-900">${releases.length}</p>
        </div>
      </div>

      <div class="grid gap-6 sm:grid-cols-2">
        <div class="space-y-3">
          <div>
            <p class="text-xs font-medium uppercase tracking-wide text-slate-500">Latest build</p>
            <p class="mt-1 text-lg font-semibold text-slate-900">${latestTag}</p>
            <p class="text-sm text-slate-600">${release ? release.name : 'No package published yet'}</p>
          </div>
          <p class="text-xs text-slate-500">Published ${publishedDate}</p>
        </div>
        <div class="space-y-3">
          <p class="text-xs font-medium uppercase tracking-wide text-slate-500">GitHub API window</p>
          <p class="text-sm text-slate-600">Requests left: <span class="font-semibold text-slate-900">${rateLimitRemaining}</span></p>
          <p class="text-xs text-slate-500">Reset at ${rateLimitReset}</p>
        </div>
      </div>

      <div class="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        ${[
          'Pixel 9 Pro XL profile',
          'Magisk & Android 10+',
          'Rollback friendly zip',
          'Open source module',
        ]
          .map(
            feature => `
              <div class="rounded-md border border-slate-200 bg-white p-4 text-sm text-slate-600">
                ${feature}
              </div>
            `
          )
          .join('')}
      </div>
    </div>
  `;

  return section;
}
