<script lang="ts">
	import '../app.css';
	import { Toaster } from 'svelte-french-toast';
	import Navbar from '$lib/components/navbar.svelte';
	import Footer from '$lib/components/footer.svelte';

	let { children } = $props();
</script>

<Toaster />
<div class="flex min-h-screen flex-col bg-gray-300">
	<Navbar />
	{@render children()}
	<Footer/>
</div>
