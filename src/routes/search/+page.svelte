<script lang="ts">
	import { page } from '$app/stores';
	import Header from '$lib/components/dashboard/header.svelte';
	import ProductCard from '$lib/components/product/product-card.svelte';

	$: product = $page.data.product;
	$: url = $page.data.url
</script>

<main class="flex h-full flex-col gap-3 px-5 py-5 md:px-40">
	<Header title={`Hasil pencarian untuk ${url}`} />
	<div class="p-4">
		{#if product.length > 0}
			<ProductCard Api={product as any} />
		{:else}
			<div class="flex h-full min-h-screen w-full items-center justify-center">
				<p class="text-lg md:text-xl text-orange-600 font-bold">Produk yang anda cari tidak ditemukan</p>
			</div>
		{/if}
	</div>
</main>
