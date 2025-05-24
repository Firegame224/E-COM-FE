<script lang="ts">
	import { StoreIcon } from '@lucide/svelte';
	import { goto } from '$app/navigation';
	import { flip } from 'svelte/animate';
	import type { ProductType } from '$lib/types/product-types';

	export let Api : ProductType[]
	const handleClick = ({id} : {id : String}) => {
		goto(`/product/${id}`)
	}
</script>

<div class="grid grid-cols-2 gap-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
	{#each Api as prod (prod?.id)}
		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<!-- svelte-ignore a11y_click_events_have_key_events -->
		<div
		animate:flip
		on:click={() => handleClick({ id : prod.id})}
		class="group relative cursor-pointer rounded-md rounded-b-none bg-white shadow shadow-black"
		>
			<div
				class="relative flex flex-col items-center justify-center rounded-md rounded-b-none p-2 pb-0 transition duration-500 group-hover:border-3 group-hover:border-orange-600"
			>
				<div class="h-[200px] w-full">
					<img
						src={prod.image ||
							'https://i.pinimg.com/736x/5e/39/6b/5e396bb1b17681759922dd10f8a9d702.jpg'}
						alt={prod.product_name}
						class="h-full w-full rounded-md object-cover transition duration-500 group-hover:scale-105"
					/>
				</div>
				<div class="line-clamp-2 flex h-25 w-full flex-col justify-between p-5">
					<p>{prod.product_name}</p>
					<p class="font-semibold text-orange-600">Rp {prod.price.toLocaleString()}</p>
				</div>
			</div>
			<div
				class="absolute z-10 flex w-full items-center justify-center rounded-b-sm bg-gradient-to-br from-orange-600 to-orange-300 p-2 opacity-0 transition duration-700 group-hover:opacity-100">
				<a href={`/store/${prod.storeId}`} class="flex items-center gap-3">
					<StoreIcon class="w-5 h-5"/>
					Lihat Toko
				</a>
			</div>
		</div>
	{/each}
</div>
