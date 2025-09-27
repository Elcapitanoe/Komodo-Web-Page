export function Footer(lastDeployed: string): HTMLElement {
  const footer = document.createElement('footer');
  footer.className = 'relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-8 text-sm text-slate-200/80 backdrop-blur-xl';

  footer.innerHTML = `
    <div class="pointer-events-none absolute inset-x-0 -top-20 h-40 bg-gradient-to-b from-white/20 to-transparent blur-3xl"></div>
    <div class="relative flex flex-col gap-4 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left">
      <div>
        <p class="text-xs uppercase tracking-[0.28em] text-slate-400">Maintainers</p>
        <p class="mt-2 text-sm text-slate-200/80">
          Crafted by <a href="https://github.com/Elcapitanoe" class="text-cyan-200 underline decoration-cyan-400/40 hover:text-white" target="_blank" rel="noopener noreferrer">@Elcapitanoe</a>
          <span class="text-slate-500">•</span>
          Configured with care by <a href="https://github.com/0x11DFE" class="text-cyan-200 underline decoration-cyan-400/40 hover:text-white" target="_blank" rel="noopener noreferrer">@0x11DFE</a>
        </p>
      </div>
      <div class="rounded-full border border-white/10 bg-black/20 px-5 py-2 text-xs font-medium uppercase tracking-[0.28em] text-slate-200/70">
        Last deployed ${lastDeployed}
      </div>
    </div>
  `;

  return footer;
}
