import type { Release } from '../lib/types';
import { formatDate, formatFileSize, formatDownloadCount, createSafeMarkdown } from '../lib/utils';

function renderSimpleMarkdown(markdown: string): string {
  if (!markdown || typeof markdown !== 'string') {
    return '';
  }

  return markdown
    .replace(/^### (.*$)/gim, '<h3 class="text-lg font-semibold text-white/90 mt-6 mb-2">$1</h3>')
    .replace(/^## (.*$)/gim, '<h2 class="text-xl font-semibold text-white mt-7 mb-3">$1</h2>')
    .replace(/^# (.*$)/gim, '<h1 class="text-2xl font-semibold text-white mt-8 mb-4">$1</h1>')
    .replace(/\*\*(.*?)\*\*/g, '<strong class="text-white">$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/`([^`]+)`/g, '<code class="rounded bg-white/10 px-2 py-1 font-mono text-sm text-cyan-200">$1</code>')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-cyan-200 underline decoration-cyan-400/40 hover:text-white">$1</a>')
    .replace(/^\* (.*$)/gim, '<li class="pl-1">$1</li>')
    .replace(/(<li>.*<\/li>)/s, '<ul class="ml-4 list-disc space-y-2">$1</ul>')
    .replace(/\n\n/g, '</p><p class="mt-3">')
    .replace(/\n/g, '<br>')
    .replace(/^(?!<)/, '<p>')
    .concat('</p>');
}

export function ReleaseSection(release: Release): HTMLElement {
  const section = document.createElement('section');
  section.className = 'relative overflow-hidden rounded-3xl border border-white/10 bg-white/10 p-10 shadow-[0_25px_70px_-20px_rgba(14,165,233,0.35)] backdrop-blur-xl';

  const safeMarkdown = createSafeMarkdown(release.body);

  section.innerHTML = `
    <div class="pointer-events-none absolute -top-24 left-10 h-48 w-48 rounded-full bg-sky-400/20 blur-3xl"></div>
    <div class="pointer-events-none absolute -bottom-10 right-6 h-40 w-40 rounded-full bg-violet-500/20 blur-3xl"></div>

    <div class="relative space-y-8">
      <div class="flex flex-wrap items-start justify-between gap-6">
        <div class="space-y-3">
          <span class="inline-flex items-center gap-2 rounded-full border border-sky-400/50 bg-sky-500/20 px-4 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-sky-100">Latest drop</span>
          <h2 class="text-3xl font-semibold text-white">${release.name}</h2>
          <p class="text-sm text-slate-200/80">${release.body ? 'Fresh tweaks and fixes packaged in a Magisk-ready zip.' : 'No changelog supplied for this build.'}</p>
        </div>
        <div class="grid gap-4 sm:grid-cols-3">
          <div class="rounded-2xl border border-white/10 bg-black/20 p-4 text-sm text-slate-200/80">
            <p class="uppercase tracking-[0.28em] text-xs text-slate-400">Version</p>
            <p class="mt-2 text-lg font-semibold text-white">${release.tag_name}</p>
          </div>
          <div class="rounded-2xl border border-white/10 bg-black/20 p-4 text-sm text-slate-200/80">
            <p class="uppercase tracking-[0.28em] text-xs text-slate-400">Published</p>
            <p class="mt-2 text-lg font-semibold text-white">${formatDate(release.published_at)}</p>
          </div>
          <div class="rounded-2xl border border-white/10 bg-black/20 p-4 text-sm text-slate-200/80">
            <p class="uppercase tracking-[0.28em] text-xs text-slate-400">Assets</p>
            <p class="mt-2 text-lg font-semibold text-white">${release.assets.length}</p>
          </div>
        </div>
      </div>

      ${safeMarkdown ? `
        <div class="rounded-3xl border border-white/10 bg-black/30 p-6 text-sm text-slate-200/90">
          <h3 class="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">Changelog</h3>
          <div class="prose prose-invert mt-4 max-w-none text-slate-200/90" id="release-content">
            ${renderSimpleMarkdown(safeMarkdown)}
          </div>
        </div>
      ` : ''}

      ${release.assets.length > 0 ? `
        <div class="space-y-4">
          <div class="flex flex-wrap items-center justify-between gap-4">
            <h3 class="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">Downloads</h3>
            <a
              href="https://github.com/Elcapitanoe/Komodo-Build-Prop/releases"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-xs font-medium uppercase tracking-[0.28em] text-slate-200 transition hover:border-white/60 hover:text-white"
            >
              Browse history →
            </a>
          </div>

          <div class="space-y-3">
            ${release.assets
              .map(
                (asset) => `
                  <a
                    href="${asset.browser_download_url}"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="group flex items-center justify-between gap-4 rounded-3xl border border-white/10 bg-slate-950/60 px-5 py-4 transition hover:border-cyan-300/60 hover:bg-slate-900"
                  >
                    <div class="flex flex-1 items-center gap-4">
                      <div class="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/10 text-lg text-cyan-200 transition group-hover:border-cyan-300/60 group-hover:text-white">⤓</div>
                      <div class="min-w-0 space-y-1">
                        <p class="truncate text-base font-semibold text-white">${asset.name}</p>
                        <p class="text-xs text-slate-300">${formatFileSize(asset.size)} • ${asset.download_count > 0 ? `${formatDownloadCount(asset.download_count)} downloads` : 'No stats yet'}</p>
                      </div>
                    </div>
                    <span class="text-sm text-cyan-200 transition group-hover:text-white">Get file</span>
                  </a>
                `
              )
              .join('')}
          </div>
        </div>
      ` : ''}
    </div>
  `;

  return section;
}
