<script lang="ts">
	import { goto } from '$app/navigation';
	import NavbarDash from '$lib/components/dashboard/navbar-dash.svelte';
	import Header from '$lib/components/dashboard/header.svelte';
	import { isLogin } from '$lib/stores/user-store';
	import { onMount } from 'svelte';
	
	
	let { children } = $props()

	onMount(() => {
		if ($isLogin === false) {
			goto("/auth/login")
		}
	})
</script>

<div class="bg-[#fffaf0] min-h-screen flex">
	<!-- Sidebar -->
	<div class="hidden md:block fixed h-screen w-[20%]">
		<NavbarDash />
	</div>

	<!-- Main Content -->
	<div class="w-full md:ml-[20%] md:w-[80%]">
		<Header title="" />
		{@render children()}
	</div>
</div>

