import type { Release } from '../lib/types';
import { formatDate, formatFileSize, formatDownloadCount, createSafeMarkdown } from '../lib/utils';

function renderSimpleMarkdown(markdown: string): string {
  if (!markdown || typeof markdown !== 'string') {
    return '';
  }

  return markdown
    .replace(/^### (.*$)/gim, '<h3 class="mt-6 text-lg font-semibold text-slate-900">$1</h3>')
    .replace(/^## (.*$)/gim, '<h2 class="mt-7 text-xl font-semibold text-slate-900">$1</h2>')
    .replace(/^# (.*$)/gim, '<h1 class="mt-8 text-2xl font-semibold text-slate-900">$1</h1>')
    .replace(/\*\*(.*?)\*\*/g, '<strong class="text-slate-900">$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/`([^`]+)`/g, '<code class="rounded bg-slate-100 px-2 py-1 font-mono text-sm text-slate-700">$1</code>')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-slate-900 underline decoration-slate-300 hover:text-slate-600">$1</a>')
    .replace(/^\* (.*$)/gim, '<li class="pl-1 text-slate-700">$1</li>')
    .replace(/(<li>.*<\/li>)/s, '<ul class="ml-5 list-disc space-y-2">$1</ul>')
    .replace(/\n\n/g, '</p><p class="mt-3">')
    .replace(/\n/g, '<br>')
    .replace(/^(?!<)/, '<p>')
    .concat('</p>');
}

export function ReleaseSection(release: Release): HTMLElement {
  const section = document.createElement('section');
  section.className = 'rounded-lg border border-slate-200 bg-white p-6 shadow-sm sm:p-8';

  const safeMarkdown = createSafeMarkdown(release.body);

  section.innerHTML = `
    <div class="space-y-6">
      <div class="space-y-2">
        <p class="text-xs font-semibold uppercase tracking-wide text-slate-500">Latest release</p>
        <h2 class="text-2xl font-semibold text-slate-900">${release.name}</h2>
        <p class="text-sm text-slate-600">${release.body ? 'Overview of the newest Komodo package.' : 'No changelog supplied for this build.'}</p>
      </div>

      <div class="grid gap-3 sm:grid-cols-3">
        <div class="rounded-md border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
          <p class="text-xs font-medium uppercase tracking-wide text-slate-500">Version</p>
          <p class="mt-2 text-lg font-semibold text-slate-900">${release.tag_name}</p>
        </div>
        <div class="rounded-md border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
          <p class="text-xs font-medium uppercase tracking-wide text-slate-500">Published</p>
          <p class="mt-2 text-lg font-semibold text-slate-900">${formatDate(release.published_at)}</p>
        </div>
        <div class="rounded-md border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
          <p class="text-xs font-medium uppercase tracking-wide text-slate-500">Assets</p>
          <p class="mt-2 text-lg font-semibold text-slate-900">${release.assets.length}</p>
        </div>
      </div>

      ${safeMarkdown ? `
        <div class="space-y-4 rounded-md border border-slate-200 bg-white p-4 text-sm leading-relaxed text-slate-700" id="release-content">
          <p class="text-xs font-semibold uppercase tracking-wide text-slate-500">Changelog</p>
          <div class="space-y-3">${renderSimpleMarkdown(safeMarkdown)}</div>
        </div>
      ` : ''}

      ${release.assets.length > 0 ? `
        <div class="space-y-3">
          <div class="flex flex-wrap items-center justify-between gap-2">
            <h3 class="text-xs font-semibold uppercase tracking-wide text-slate-500">Downloads</h3>
            <a
              href="https://github.com/Elcapitanoe/Komodo-Build-Prop/releases"
              target="_blank"
              rel="noopener noreferrer"
              class="text-xs font-medium text-slate-600 underline decoration-slate-300 hover:text-slate-900"
            >
              View release history
            </a>
          </div>

          <div class="space-y-2">
            ${release.assets
              .map(
                asset => `
                  <a
                    href="${asset.browser_download_url}"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="flex flex-col gap-1 rounded-md border border-slate-200 bg-white p-4 text-sm text-slate-700 transition hover:bg-slate-50"
                  >
                    <span class="font-medium text-slate-900">${asset.name}</span>
                    <span class="text-xs text-slate-500">${formatFileSize(asset.size)} • ${asset.download_count > 0 ? `${formatDownloadCount(asset.download_count)} downloads` : 'No download data yet'}</span>
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
