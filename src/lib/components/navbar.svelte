<script>
	import { page } from '$app/stores';
	import Search from './search.svelte';
	import Session from './session.svelte';

	$: path = $page.url.pathname;
</script>

{#if path.startsWith('/dashboard')}{:else}
	<nav
		data-sveltekit-reload
		class="flex h-36 w-full flex-col gap-2 bg-orange-600 p-5 md:h-28 md:flex-row"
	>
		<div class="flex w-full items-center justify-between">
			<div class="flex w-1/2 items-center justify-start md:w-1/3">
				<a class="text-[20px] font-semibold text-white" href="/">Kyy-Commerce</a>
			</div>
			<div class="hidden w-1/3 items-center justify-center md:flex">
				<Search />
			</div>
			<div class="flex w-1/2 items-center justify-end md:w-1/3">
				<Session />
			</div>
		</div>
		<div class="flex w-full items-center justify-center md:hidden">
			<Search />
		</div>
	</nav>
{/if}
