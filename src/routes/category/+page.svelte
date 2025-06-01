<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import Header from '$lib/components/dashboard/header.svelte';
	import ProductCard from '$lib/components/product/product-card.svelte';
	import Button from '$lib/components/ui/button/button.svelte';

	$: product = $page.data.product;
	$: url = $page.data.url;
	$: category = $page.data.category;
</script>

<main class="flex h-full flex-col gap-3 px-5 py-5 md:px-40">
	<Header title={`Hasil pencarian untuk kategori ${url}`} />
	{#if category.length > 0}
		<div class="grid w-full grid-cols-4 gap-2 md:grid-cols-8">
			{#each category as cat}
				<Button
					class={`${cat.category_name === url ? "bg-orange-600" : "bg-orange-400"} hover:bg-orange-300 p-5 transition duration-700 cursor-pointer`}
					onclick={() => goto(`/category?name=${cat.category_name}`, { invalidateAll: true })}
				>
					{cat.category_name}
				</Button>
			{/each}
		</div>
	{/if}
	<div class="p-4">
		{#if product.length > 0}
			<ProductCard Api={product as any} />
		{:else}
			<div class="flex h-full min-h-screen w-full items-center justify-center">
				<p class="text-lg text-orange-600">Produk yang anda cari tidak ditemukan</p>
			</div>
		{/if}
	</div>
</main>
