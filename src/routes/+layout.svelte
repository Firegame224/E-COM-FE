<script lang="ts">
	import '../app.css';
	import { Toaster } from 'svelte-french-toast';
	import Navbar from '$lib/components/navbar.svelte';

	let { children } = $props();
</script>

<Navbar />
<div class="bg-gray-300 min-h-screen">
	{@render children()}
	<Toaster />
</div>
