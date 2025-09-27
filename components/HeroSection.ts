import type { Release, RateLimit } from '../lib/types';
import { formatDownloadCount, calculateTotalDownloadsFromAllReleases } from '../lib/utils';

export function HeroSection(
  release: Release | null,
  releases: Release[] = [],
  rateLimit?: RateLimit
): HTMLElement {
  const section = document.createElement('section');
  section.className = 'relative overflow-hidden rounded-3xl border border-white/10 bg-white/10 p-10 shadow-[0_25px_70px_-20px_rgba(59,130,246,0.35)] backdrop-blur-xl';

  const totalDownloadsAll = releases.length > 0 ? calculateTotalDownloadsFromAllReleases(releases) : 0;
  const rateLimitRemaining = rateLimit ? `${rateLimit.remaining}/${rateLimit.limit}` : '—';
  const rateLimitReset = rateLimit?.reset ?? 'Unknown';
  const latestTag = release?.tag_name ?? 'Awaiting Release';

  section.innerHTML = `
    <div class="relative">
      <div class="pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full bg-cyan-400/10 blur-3xl"></div>
      <div class="pointer-events-none absolute -bottom-12 left-12 h-48 w-48 rounded-full bg-purple-500/20 blur-3xl"></div>

      <div class="grid gap-10 lg:grid-cols-[1.4fr_1fr]">
        <div class="space-y-6">
          <span class="inline-flex items-center gap-2 rounded-full border border-cyan-400/40 bg-cyan-500/20 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-100">
            Komodo Build Prop
          </span>

          <h1 class="text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Reimagine your device identity.
          </h1>

          <p class="max-w-2xl text-lg text-slate-200/90">
            Komodo spoofs your Android build so Google services treat it like a Pixel 9 Pro XL. Unlock experiments, stay compatible, and keep control with a lightweight Magisk module engineered for tinkerers.
          </p>

          ${release ? `
            <div class="flex flex-wrap items-center gap-4">
              <a
                href="${release.assets[0]?.browser_download_url ?? '#'}"
                class="inline-flex w-full max-w-full flex-wrap items-center gap-3 whitespace-normal rounded-full bg-gradient-to-r from-cyan-400/80 via-sky-400/80 to-blue-500/80 px-6 py-3 text-base font-medium text-white shadow-[0_20px_45px_-20px_rgba(34,211,238,0.6)] transition hover:scale-[1.02] hover:shadow-[0_20px_60px_-20px_rgba(34,211,238,0.8)] sm:w-auto"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span class="flex-shrink-0 text-lg">⬇</span>
                <span class="flex min-w-0 flex-1 flex-wrap gap-1 text-left">
                  <span class="flex-shrink-0">Download</span>
                  <span class="min-w-0 break-all sm:truncate">${release.tag_name}</span>
                </span>
              </a>
              <span class="rounded-full border border-white/20 px-4 py-2 text-sm text-slate-200/80">
                Published ${new Date(release.published_at).toLocaleDateString()}
              </span>
            </div>
          ` : `
            <div class="rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-sm text-slate-200/80">
              We are preparing the first public drop. Stay tuned for the launch announcement.
            </div>
          `}
        </div>

        <div class="flex flex-col gap-6 rounded-3xl border border-white/10 bg-slate-950/60 p-6 shadow-inner">
          <div class="flex items-center justify-between">
            <span class="text-sm font-medium uppercase tracking-[0.2em] text-slate-400">Latest Build</span>
            <span class="text-xs text-slate-500">status feed</span>
          </div>
          <div class="space-y-4">
            <div>
              <p class="text-3xl font-semibold text-white">${latestTag}</p>
              <p class="min-w-0 break-words text-balance text-sm text-slate-400">${release ? release.name : 'No packages published yet'}</p>
            </div>
            <div class="grid gap-3 text-sm text-slate-300">
              <div class="flex items-center justify-between rounded-2xl border border-white/5 bg-white/5 px-4 py-3">
                <span class="font-medium text-slate-200">Downloads</span>
                <span class="font-semibold text-cyan-300">${totalDownloadsAll > 0 ? formatDownloadCount(totalDownloadsAll) : '0'}</span>
              </div>
              <div class="flex items-center justify-between rounded-2xl border border-white/5 bg-white/5 px-4 py-3">
                <span class="font-medium text-slate-200">Published Builds</span>
                <span class="font-semibold text-cyan-300">${releases.length}</span>
              </div>
              <div class="flex items-center justify-between rounded-2xl border border-white/5 bg-white/5 px-4 py-3">
                <span class="font-medium text-slate-200">API Window</span>
                <span class="font-semibold text-cyan-300">${rateLimitRemaining}</span>
              </div>
            </div>
            <p class="text-xs text-slate-500">Resets at <span class="font-medium text-slate-300">${rateLimitReset}</span></p>
          </div>
        </div>
      </div>

      <div class="mt-10 grid gap-4 rounded-3xl border border-white/10 bg-black/20 p-6 text-sm text-slate-300 sm:grid-cols-2 lg:grid-cols-4">
        <div class="space-y-2">
          <p class="text-xs uppercase tracking-[0.28em] text-slate-500">Identity Mask</p>
          <p class="text-base font-semibold text-white">Pixel 9 Pro XL profile</p>
        </div>
        <div class="space-y-2">
          <p class="text-xs uppercase tracking-[0.28em] text-slate-500">Compatibility</p>
          <p class="text-base font-semibold text-white">Magisk & Android 10+</p>
        </div>
        <div class="space-y-2">
          <p class="text-xs uppercase tracking-[0.28em] text-slate-500">Update cadence</p>
          <p class="text-base font-semibold text-white">Rapid when Pixel drops</p>
        </div>
        <div class="space-y-2">
          <p class="text-xs uppercase tracking-[0.28em] text-slate-500">Safety</p>
          <p class="text-base font-semibold text-white">Rollback-friendly zip</p>
        </div>
      </div>
    </div>
  `;

  return section;
}
