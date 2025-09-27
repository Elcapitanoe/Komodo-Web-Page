import type { PageProps } from '../lib/types';
import { HeroSection } from '../components/HeroSection';
import { Notes } from '../components/Notes';
import { ReleaseSection } from '../components/ReleaseSection';
import { ModuleInfoSection } from '../components/ModuleInfoSection';
import { Footer } from '../components/Footer';

export function renderApp(container: HTMLElement, props: PageProps) {
  container.innerHTML = '';

  const wrapper = document.createElement('div');
  wrapper.className = 'space-y-12 text-slate-100';

  wrapper.appendChild(HeroSection(props.release, props.releases, props.rateLimit));

  const gridLayout = document.createElement('div');
  gridLayout.className = 'grid gap-8 lg:grid-cols-[1.7fr_1fr]';

  if (props.release) {
    gridLayout.appendChild(ReleaseSection(props.release));
  }

  gridLayout.appendChild(Notes(props.rateLimit));
  wrapper.appendChild(gridLayout);

  wrapper.appendChild(ModuleInfoSection());
  wrapper.appendChild(Footer(props.lastDeployed));

  container.appendChild(wrapper);
}
