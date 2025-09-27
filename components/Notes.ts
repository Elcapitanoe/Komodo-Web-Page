import type { RateLimit } from '../lib/types';

export function Notes(rateLimit?: RateLimit): HTMLElement {
  const div = document.createElement('aside');
  div.className = 'flex h-full flex-col justify-between gap-8 rounded-3xl border border-amber-400/40 bg-amber-500/15 p-8 text-slate-950 shadow-[0_20px_60px_-25px_rgba(245,158,11,0.6)] dark:text-white';

  const resetTime = rateLimit?.reset ?? 'Unknown';

  div.innerHTML = `
    <div class="space-y-4">
      <div class="inline-flex items-center gap-3 rounded-full border border-amber-400/60 bg-amber-500/25 px-4 py-1 text-xs font-semibold uppercase tracking-[0.28em] text-amber-200">
        Heads up
      </div>
      <h3 class="text-2xl font-semibold leading-snug text-white">
        Create a backup before flashing any build.
      </h3>
      <p class="text-sm leading-relaxed text-amber-100/80">
        Tweaking system props is powerful but unforgiving. Snapshot your device, verify bootloader access, and make sure you know how to restore stock images. You are responsible for every change applied.
      </p>
    </div>

    <div class="rounded-2xl border border-white/10 bg-black/20 p-4 text-sm text-amber-100/80">
      <p class="font-semibold uppercase tracking-[0.2em] text-amber-200">GitHub API Status</p>
      <p class="mt-1 text-lg font-semibold text-white">${rateLimit ? `${rateLimit.remaining} requests left` : 'Monitoring offline'}</p>
      <p class="mt-2 text-xs text-amber-100/70">Refresh resets at <span class="font-medium">${resetTime}</span>. If downloads fail, wait for the window to renew.</p>
    </div>
  `;

  return div;
}
