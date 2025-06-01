<script lang="ts">
	import { Search } from '@lucide/svelte';
	import { Button } from './ui/button';
	import { Input } from './ui/input';
	import { goto } from '$app/navigation';
	let value = '';

	const handleSubmit = async (e: Event) => {
		e.preventDefault();
		goto(`/search?name=${value}`,{invalidateAll : true});
	};
</script>

<form class="flex w-full md:w-[60%]" onsubmit={handleSubmit}>
	<Input bind:value class="rounded-r-none p-5 " />
	<Button
		type="submit"
		class="h-[42px] rounded-l-none bg-orange-400 font-serif text-[10px] hover:bg-orange-300"
	>
		<Search class="h-full w-full text-white hover:text-orange-600" />
	</Button>
</form>
