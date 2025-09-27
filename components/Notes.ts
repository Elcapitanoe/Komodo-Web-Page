import type { RateLimit } from '../lib/types';

export function Notes(rateLimit?: RateLimit): HTMLElement {
  const div = document.createElement('aside');
  div.className = 'flex h-full flex-col justify-between gap-6 rounded-lg border border-amber-200 bg-amber-50 p-6 text-slate-800';

  const resetTime = rateLimit?.reset ?? 'Unknown';

  div.innerHTML = `
    <div class="space-y-3">
      <p class="text-xs font-semibold uppercase tracking-wide text-amber-700">Reminder</p>
      <h3 class="text-lg font-semibold text-slate-900">Back up before you flash anything.</h3>
      <p class="text-sm leading-relaxed text-slate-700">
        Changing build properties is powerful but unforgiving. Keep a full system backup, confirm bootloader access, and be ready to restore stock images if something goes wrong.
      </p>
    </div>

    <div class="rounded-md border border-amber-200 bg-white p-4 text-sm text-slate-700">
      <p class="text-xs font-semibold uppercase tracking-wide text-amber-700">GitHub API status</p>
      <p class="mt-2 text-base font-semibold text-slate-900">${rateLimit ? `${rateLimit.remaining} requests left` : 'Monitoring offline'}</p>
      <p class="mt-1 text-xs text-slate-600">Resets at <span class="font-medium text-slate-900">${resetTime}</span>. If downloads fail, wait for the next window.</p>
    </div>
  `;

  return div;
}
