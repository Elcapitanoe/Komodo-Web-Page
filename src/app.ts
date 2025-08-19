import type { PageProps } from '../lib/types';
import { HeroSection } from '../components/HeroSection';
import { Notes } from '../components/Notes';
import { ReleaseSection } from '../components/ReleaseSection';
import { ModuleInfoSection } from '../components/ModuleInfoSection';
import { Footer } from '../components/Footer';

export function renderApp(container: HTMLElement, props: PageProps) {
  // Clear container
  container.innerHTML = '';

  // Create main wrapper with fade-in animation
  const wrapper = document.createElement('div');
  wrapper.className = 'opacity-0 transition-opacity duration-1000';
  
  // Render components
  wrapper.appendChild(HeroSection(props.release, props.releases));
  wrapper.appendChild(Notes());
  
  if (props.release) {
    wrapper.appendChild(ReleaseSection(props.release));
  }
  
  wrapper.appendChild(ModuleInfoSection());
  wrapper.appendChild(Footer(props.lastDeployed));

  container.appendChild(wrapper);

  // Trigger fade-in animation
  requestAnimationFrame(() => {
    wrapper.classList.remove('opacity-0');
    wrapper.classList.add('opacity-100');
  });
}
