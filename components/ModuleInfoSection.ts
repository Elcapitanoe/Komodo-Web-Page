export function ModuleInfoSection(): HTMLElement {
  const section = document.createElement('section');
  section.className = 'rounded-lg border border-slate-200 bg-white p-6 shadow-sm sm:p-8';

  section.innerHTML = `
    <div class="grid gap-8 lg:grid-cols-[1.1fr_1fr]">
      <div class="space-y-4">
        <p class="text-xs font-semibold uppercase tracking-wide text-slate-500">Module overview</p>
        <h2 class="text-2xl font-semibold text-slate-900">How Komodo reshapes your device</h2>
        <p class="text-sm leading-relaxed text-slate-600">
          Komodo rewrites build properties so your handset impersonates a Pixel 9 Pro XL. That unlocks Pixel-specific services while keeping the module easy to roll back.
        </p>

        <ul class="grid gap-3 sm:grid-cols-2">
          ${[
            {
              title: 'Identity swap',
              description: 'Spoofs model, manufacturer, and fingerprint for Pixel-grade compatibility.',
            },
            {
              title: 'Optimised defaults',
              description: 'Tunes props for Google Photos, Call Screening, and other Pixel-only features.',
            },
            {
              title: 'Reversible design',
              description: 'Remove the module or restore backups to revert every injected property.',
            },
            {
              title: 'Open source',
              description: 'Inspect the code, adapt it to your needs, and contribute improvements.',
            },
          ]
            .map(
              item => `
                <li class="rounded-md border border-slate-200 bg-slate-50 p-4">
                  <p class="text-sm font-semibold text-slate-900">${item.title}</p>
                  <p class="mt-1 text-xs leading-relaxed text-slate-600">${item.description}</p>
                </li>
              `
            )
            .join('')}
        </ul>
      </div>

      <div class="space-y-6">
        <div class="space-y-3">
          <p class="text-xs font-semibold uppercase tracking-wide text-slate-500">Installation flow</p>
          <ol class="space-y-3 text-sm text-slate-600">
            ${[
              'Download the latest Komodo zip from the releases above.',
              'Open Magisk Manager → Modules → “Install from storage”.',
              'Select the Komodo package and let Magisk patch the props.',
              'Reboot and confirm Pixel-only experiences are enabled.',
            ]
              .map(
                (step, index) => `
                  <li class="flex gap-3">
                    <span class="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full border border-slate-300 text-xs font-medium text-slate-600">${index + 1}</span>
                    <span>${step}</span>
                  </li>
                `
              )
              .join('')}
          </ol>
        </div>

        <div class="space-y-3">
          <p class="text-xs font-semibold uppercase tracking-wide text-slate-500">Baseline requirements</p>
          <ul class="space-y-2 text-sm text-slate-600">
            ${[
              'Android 10 or newer with Magisk v20.4+',
              'Unlocked bootloader and a full system backup',
              'Comfort using recovery tools or fastboot',
              'Reliable internet for future Pixel drops',
            ]
              .map(item => `<li class="flex gap-2"><span class="text-slate-400">•</span><span>${item}</span></li>`)
              .join('')}
          </ul>
        </div>
      </div>
    </div>
  `;

  return section;
}
