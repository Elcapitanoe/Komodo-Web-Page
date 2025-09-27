export function ModuleInfoSection(): HTMLElement {
  const section = document.createElement('section');
  section.className = 'relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-10 shadow-[0_25px_70px_-20px_rgba(76,29,149,0.35)] backdrop-blur-xl';

  section.innerHTML = `
    <div class="pointer-events-none absolute -top-24 right-14 h-56 w-56 rounded-full bg-fuchsia-500/20 blur-3xl"></div>
    <div class="pointer-events-none absolute bottom-0 left-0 h-64 w-64 rounded-full bg-indigo-500/10 blur-3xl"></div>

    <div class="relative grid gap-12 lg:grid-cols-[1.2fr_1fr]">
      <div class="space-y-8">
        <div class="space-y-3">
          <span class="inline-flex items-center gap-2 rounded-full border border-violet-400/50 bg-violet-500/20 px-4 py-1 text-xs font-semibold uppercase tracking-[0.28em] text-violet-100">Module Intel</span>
          <h2 class="text-3xl font-semibold text-white">How Komodo reshapes your device</h2>
          <p class="text-sm leading-relaxed text-slate-200/80">The module rewrites build properties so your handset impersonates a Pixel 9 Pro XL. That unlocks server-side perks, improves compatibility, and keeps Google services placated.</p>
        </div>

        <div class="grid gap-4 sm:grid-cols-2">
          <div class="rounded-3xl border border-white/10 bg-black/20 p-6">
            <h3 class="text-base font-semibold text-white">Identity swap</h3>
            <p class="mt-2 text-sm text-slate-200/80">Spoofs model, manufacturer, and fingerprint so SafetyNet and feature flags think you are genuine Pixel hardware.</p>
          </div>
          <div class="rounded-3xl border border-white/10 bg-black/20 p-6">
            <h3 class="text-base font-semibold text-white">Optimized defaults</h3>
            <p class="mt-2 text-sm text-slate-200/80">Tunes props for Google Photos, Call Screening, AI Core and other exclusives that typically stay locked to Pixels.</p>
          </div>
          <div class="rounded-3xl border border-white/10 bg-black/20 p-6">
            <h3 class="text-base font-semibold text-white">Reversible by design</h3>
            <p class="mt-2 text-sm text-slate-200/80">Remove the module or restore your backup to immediately revert all injected properties without residue.</p>
          </div>
          <div class="rounded-3xl border border-white/10 bg-black/20 p-6">
            <h3 class="text-base font-semibold text-white">Open source</h3>
            <p class="mt-2 text-sm text-slate-200/80">Inspect every change on GitHub. Fork it, adapt it for other devices, and contribute improvements.</p>
          </div>
        </div>
      </div>

      <div class="flex flex-col gap-8 rounded-3xl border border-white/10 bg-black/30 p-6">
        <div>
          <h3 class="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">Installation flow</h3>
          <ol class="mt-4 space-y-4 text-sm text-slate-200/80">
            <li class="flex gap-3">
              <span class="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full border border-cyan-400/60 bg-cyan-500/20 text-xs font-semibold text-cyan-100">1</span>
              <span>Pull the newest Komodo package (.zip) using the download tiles above.</span>
            </li>
            <li class="flex gap-3">
              <span class="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full border border-cyan-400/60 bg-cyan-500/20 text-xs font-semibold text-cyan-100">2</span>
              <span>Open Magisk Manager → Modules → tap “Install from storage”.</span>
            </li>
            <li class="flex gap-3">
              <span class="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full border border-cyan-400/60 bg-cyan-500/20 text-xs font-semibold text-cyan-100">3</span>
              <span>Select the Komodo zip and let Magisk patch the properties.</span>
            </li>
            <li class="flex gap-3">
              <span class="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full border border-cyan-400/60 bg-cyan-500/20 text-xs font-semibold text-cyan-100">4</span>
              <span>Reboot into system and verify Pixel-only experiences are unlocked.</span>
            </li>
          </ol>
        </div>

        <div>
          <h3 class="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">Baseline requirements</h3>
          <ul class="mt-4 space-y-3 text-sm text-slate-200/80">
            <li class="flex gap-3">
              <span class="mt-1 text-cyan-300">▹</span>
              <span>Android 10 or newer with Magisk v20.4+</span>
            </li>
            <li class="flex gap-3">
              <span class="mt-1 text-cyan-300">▹</span>
              <span>Unlocked bootloader and a complete system backup</span>
            </li>
            <li class="flex gap-3">
              <span class="mt-1 text-cyan-300">▹</span>
              <span>Comfort using recovery tools or fastboot for recovery</span>
            </li>
            <li class="flex gap-3">
              <span class="mt-1 text-cyan-300">▹</span>
              <span>Stable internet to fetch updates when Google ships new builds</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  `;

  return section;
}
