<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
</script>

<svelte:head>
	<title>Klekovina - Hiking Trip Organizer</title>
	<link rel="icon" href={favicon} />
</svelte:head>
{@render children()}
