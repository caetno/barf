<script lang="ts">
	import '../app.postcss';

	// Highlight JS
	import hljs from 'highlight.js/lib/core';
	import 'highlight.js/styles/github-dark.css';
	import { storeHighlightJs } from '@skeletonlabs/skeleton';
	import xml from 'highlight.js/lib/languages/xml'; // for HTML
	import css from 'highlight.js/lib/languages/css';
	import javascript from 'highlight.js/lib/languages/javascript';
	import typescript from 'highlight.js/lib/languages/typescript';

	hljs.registerLanguage('xml', xml); // for HTML
	hljs.registerLanguage('css', css);
	hljs.registerLanguage('javascript', javascript);
	hljs.registerLanguage('typescript', typescript);
	storeHighlightJs.set(hljs);

	// Floating UI for Popups
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
	import { storePopup } from '@skeletonlabs/skeleton';
	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });

	import { page, navigating, updated } from '$app/stores';
	import { AppBar } from '@skeletonlabs/skeleton';
</script>



<AppBar background=""  padding="p-2" gridColumns="grid-cols-1" slotDefault="place-self-center" slotTrail="place-content-end">
  <div class="relative flex justify-center items-center">
    <!-- Logo -->
    <img src="/logo.png" class="w-24 h-auto relative z-10" alt="Logo" />

    <!-- Blur-Effekt -->
    <div class="absolute w-full h-full rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 blur-lg"></div>
  </div>
</AppBar>





<slot />

<style>
  .frosted-glass {
    background-color: rgba(255, 255, 255, 0.3); /* Weiße Farbe mit 30% Transparenz */
    backdrop-filter: blur(10px); /* Unschärfe-Effekt */
    -webkit-backdrop-filter: blur(10px); /* Unschärfe-Effekt für Safari */
    border: 1px solid rgba(255, 255, 255, 0.18); /* Optional: eine leichte Umrandung */
  }
</style>