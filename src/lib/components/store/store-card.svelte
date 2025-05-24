<script lang="ts">
	import { goto } from '$app/navigation';
	import { Label } from '$lib/components/ui/label';
	import type { StoresTypes } from '$lib/types/store-types';
	import { ChevronRight, StoreIcon } from '@lucide/svelte';

	export let Stores: StoresTypes[] = [];
</script>

<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2">
	{#if Stores.length > 0}
		{#each Stores as store}
			<div
				class="w-full bg-gray-200 flex justify-between p-3 md:p-5 rounded-md gap-3 hover:opacity-80 transition duration-700 cursor-pointer"
			>
				<div class="h-full flex items-center justify-center min-w-[20%]">
					<StoreIcon class="w-10 h-10" />
				</div>
				<div class="flex justify-start items-start flex-col gap-2 w-[60%]">
					<Label class="line-clamp-1">{store?.store_name}</Label>
					<Label class="text-[10px] line-clamp-1">{store?.info}</Label>
				</div>
				<div class="flex justify-end items-center w-[20%]">
					<ChevronRight onclick={() => goto(`/dashboard/store/${store?.id}`)} />
				</div>
			</div>
		{/each}
	{:else}
		<p class="text-md font-semibold text-white">Belum Ada Toko Disini</p>
	{/if}
</div>
