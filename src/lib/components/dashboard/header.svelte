<script lang="ts">
	import { ArrowBigLeft } from '@lucide/svelte';
	import { Button } from '../ui/button';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';

	$: pathname = $page.url.pathname;
	export let title: string;

	const handleClick = () => {
		if (pathname.startsWith('/dashboard') && pathname !== "/dashboard") {
			window.history.back();
		}
		goto('/', { noScroll: true });
	};
</script>

<div class="flex w-full justify-between p-2">
	<p class="tetx-orange-600 font-semibold">{title}</p>
	<Button
		class="flex items-center gap-2 bg-orange-600 hover:bg-gray-200 hover:opacity-75"
		onclick={handleClick}
	>
		<ArrowBigLeft class="h-5 w-5" />
		Kembali
	</Button>
</div>
