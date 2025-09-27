export function Footer(lastDeployed: string): HTMLElement {
  const footer = document.createElement('footer');
  footer.className = 'rounded-lg border border-slate-200 bg-white p-6 text-sm text-slate-600 shadow-sm';

  footer.innerHTML = `
    <div class="flex flex-col gap-3 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left">
      <div class="space-y-1">
        <p class="text-xs font-semibold uppercase tracking-wide text-slate-500">Maintainers</p>
        <p>
          Crafted by <a href="https://github.com/Elcapitanoe" class="text-slate-700 underline decoration-slate-300 hover:text-slate-900" target="_blank" rel="noopener noreferrer">@Elcapitanoe</a>
          <span class="text-slate-400">•</span>
          Configured by <a href="https://github.com/0x11DFE" class="text-slate-700 underline decoration-slate-300 hover:text-slate-900" target="_blank" rel="noopener noreferrer">@0x11DFE</a>
        </p>
      </div>
      <div class="rounded-md border border-slate-200 bg-slate-50 px-4 py-2 text-xs font-medium uppercase tracking-wide text-slate-600">
        Last deployed ${lastDeployed}
      </div>
    </div>
  `;

  return footer;
}
