export function ModuleInfoSection(): HTMLElement {
  const section = document.createElement('section');
  section.className = 'bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-8 mb-8 animate-slide-up';

  section.innerHTML = `
    <div class="flex items-start justify-between mb-6 pb-4 border-b border-gray-100 dark:border-gray-700">
      <div class="flex-1">
        <h2 class="font-semibold text-gray-900 dark:text-white mb-2 flex items-center gap-3">
          <span class="text-2xl" role="img" aria-label="Info">ℹ️</span>
          <span class="text-3xl">About This Module</span>
        </h2>
        <p class="text-gray-600 dark:text-gray-300">
          Learn more about Komodo Build Prop and what it does for your device.
        </p>
      </div>
    </div>

    <div class="space-y-6">
      <!-- What is this module -->
      <div class="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg p-6 border border-blue-200 dark:border-blue-800">
        <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
          <span class="text-lg" role="img" aria-label="Question">❓</span>
          What is Komodo Build Prop?
        </h3>
        <p class="text-gray-700 dark:text-gray-300 leading-relaxed">
          Komodo Build Prop is a Magisk module that modifies your Android device's build properties to spoof it as a Google Pixel 9 Pro XL. 
          This allows your device to gain access to Pixel-exclusive features and optimizations that are normally restricted to Google's own devices.
        </p>
      </div>

      <!-- How it works -->
      <div class="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg p-6 border border-purple-200 dark:border-purple-800">
        <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
          <span class="text-lg" role="img" aria-label="Gear">⚙️</span>
          How It Works
        </h3>
        <p class="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
          The module works by modifying key system properties in your device's build.prop file, making Google services 
          believe your device is a genuine Pixel 9 Pro XL. This includes:
        </p>
        <ul class="space-y-2 text-gray-700 dark:text-gray-300">
          <li class="flex items-start gap-2">
            <span class="text-purple-500 dark:text-purple-400 mt-1">•</span>
            <span>Device model and manufacturer identification</span>
          </li>
          <li class="flex items-start gap-2">
            <span class="text-purple-500 dark:text-purple-400 mt-1">•</span>
            <span>Hardware specifications and capabilities</span>
          </li>
          <li class="flex items-start gap-2">
            <span class="text-purple-500 dark:text-purple-400 mt-1">•</span>
            <span>Software version and security patch level</span>
          </li>
          <li class="flex items-start gap-2">
            <span class="text-purple-500 dark:text-purple-400 mt-1">•</span>
            <span>Google Play Services certification status</span>
          </li>
        </ul>
      </div>

      <!-- Requirements -->
      <div class="bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-lg p-6 border border-orange-200 dark:border-orange-800">
        <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
          <span class="text-lg" role="img" aria-label="Requirements">📋</span>
          Requirements
        </h3>
        <ul class="space-y-2 text-gray-700 dark:text-gray-300">
          <li class="flex items-start gap-2">
            <span class="text-orange-500 dark:text-orange-400 mt-1">•</span>
            <span><strong>Rooted Android device</strong> with Magisk installed</span>
          </li>
          <li class="flex items-start gap-2">
            <span class="text-orange-500 dark:text-orange-400 mt-1">•</span>
            <span><strong>Android 10+</strong> for optimal compatibility</span>
          </li>
          <li class="flex items-start gap-2">
            <span class="text-orange-500 dark:text-orange-400 mt-1">•</span>
            <span><strong>Magisk v20.4+</strong> or newer version</span>
          </li>
          <li class="flex items-start gap-2">
            <span class="text-orange-500 dark:text-orange-400 mt-1">•</span>
            <span><strong>Full system backup</strong> recommended before installation</span>
          </li>
        </ul>
      </div>

      <!-- Installation Guide -->
      <div class="bg-gradient-to-r from-gray-50 to-slate-50 dark:from-gray-900/20 dark:to-slate-900/20 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
        <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
          <span class="text-lg" role="img" aria-label="Installation">🔧</span>
          Quick Installation Guide
        </h3>
        <ol class="space-y-3 text-gray-700 dark:text-gray-300">
          <li class="flex items-start gap-3">
            <span class="flex-shrink-0 w-6 h-6 bg-primary-600 text-white text-sm font-bold rounded-full flex items-center justify-center">1</span>
            <span>Download the latest module file (.zip) from the downloads section above</span>
          </li>
          <li class="flex items-start gap-3">
            <span class="flex-shrink-0 w-6 h-6 bg-primary-600 text-white text-sm font-bold rounded-full flex items-center justify-center">2</span>
            <span>Open Magisk Manager app on your rooted device</span>
          </li>
          <li class="flex items-start gap-3">
            <span class="flex-shrink-0 w-6 h-6 bg-primary-600 text-white text-sm font-bold rounded-full flex items-center justify-center">3</span>
            <span>Go to "Modules" section and tap "Install from storage"</span>
          </li>
          <li class="flex items-start gap-3">
            <span class="flex-shrink-0 w-6 h-6 bg-primary-600 text-white text-sm font-bold rounded-full flex items-center justify-center">4</span>
            <span>Select the downloaded module file and install</span>
          </li>
          <li class="flex items-start gap-3">
            <span class="flex-shrink-0 w-6 h-6 bg-primary-600 text-white text-sm font-bold rounded-full flex items-center justify-center">5</span>
            <span>Reboot your device to activate the module</span>
          </li>
        </ol>
      </div>
    </div>
  `;

  return section;
}
