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



<AppBar>
	<svelte:fragment slot="lead">{$page.url.pathname}</svelte:fragment>
	
	<svelte:fragment slot="trail">
		<a href="/dogs" aria-label="Hunde verwalten">🐕</a>
		<a href="/meats" aria-label="Fleischsorten verwalten">🥩</a>
		<a href="/rechner" aria-label="BARF-Rechner">🧮</a>
	</svelte:fragment>
</AppBar>




<slot />