<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import NavbarDash from '$lib/components/dashboard/navbar-dash.svelte';
	import { onMount } from 'svelte';
	
	
	let { children } = $props();
	let {user}= page.data;

	onMount(() => {
		if (!user) {
			goto("/auth/login")
		}
	})
</script>

<div class="bg-gray-200 w-full min-h-screen flex">
	<div class="w-[25%] hidden md:flex">
		<NavbarDash />
	</div>
	<div class="w-full md:w-[75%]">
		{@render children()}
	</div>
</div>
