<script lang="ts">
	
	import { ShoppingCart, StoreIcon, X } from '@lucide/svelte';
	import { fade } from 'svelte/transition';
	import ProductQuantity from '$lib/components/product/product-quantity.svelte';
	import { Label } from '$lib/components/ui/label';
	import ProductBuy from '$lib/components/product/product-buy.svelte';
	import { profile } from '$lib/stores/user-store';
	import { onMount } from 'svelte';
	import { authSession } from '$lib/helpers/auth-check';
	import CommentsInput from '$lib/components/comments/comments-input.svelte';
	import CommentsCard from '$lib/components/comments/comments-card.svelte';
	import { page } from '$app/stores';

	$: product = $page.data.product;
	$: category = $page.data.category || [];
	$: comment = $page.data.comment || [];

	$: succesOrder = product?.order?.filter((ord: any) => ord?.status === 'Success');
	$: quantity = 1;

	onMount(async () => {
		const user = await authSession();

		profile.set(user);
	});
</script>

<div class="flex h-full w-full flex-col gap-5 px-2 pt-10 md:px-16">
	<section
		transition:fade={{ duration: 500 }}
		class="shadow-1 relative flex flex-col justify-between gap-2 rounded bg-white p-5 md:flex-row md:pl-20"
	>
		<Label
			onclick={() => window.history.back()}
			class="absolute right-0 top-0 z-10 rounded bg-gradient-to-br from-orange-600 to-orange-200 p-1 transition duration-700 hover:opacity-60"
		>
			<X class="h-6 w-6 text-white" />
		</Label>
		{#if product && product.image}
			<div
				class="relative flex h-[400px] w-full items-center justify-center md:h-[500px] md:w-[350px]"
			>
				<img src={product.image} alt={product.product_name} class="h-full w-full object-cover" />
				<p
					class="absolute left-0 top-0 flex items-center justify-center rounded rounded-tl-none bg-gradient-to-br from-orange-600 to-orange-200 px-4 py-1 text-[15px] font-bold"
				>
					Stok : {product.stok}
				</p>
			</div>
		{:else}
			<div
				class="flex min-h-[500px] min-w-[350px] animate-pulse items-center justify-center bg-gray-500"
			></div>
		{/if}
		<div
			class="bg-light-300 line-clamp-2 flex w-full flex-col justify-between gap-2 md:w-3/5 md:p-5"
		>
			<div class="flex min-h-20 w-full items-center justify-between">
				<div class="flex w-full flex-col">
					<p class="text-[28px] font-bold">{product.product_name}</p>
					<p class="flex items-center gap-1">
						<ShoppingCart class="h-5 w-5" />{succesOrder.length}x Terjual
					</p>
				</div>
				<p
					class={`${product.status === 'Tersedia' && product.stok > 0 ? 'bg-green-600' : 'bg-red-600'} rounded-md px-3 py-2 text-[15px] font-semibold text-white`}
				>
					{product.status}
				</p>
			</div>
			<div class="flex w-full flex-col py-3">
				<p class="text-orange-600">Deskripsi :</p>
				<p class="text-sm">{product.description}</p>
			</div>
			<div class="flex w-full flex-col justify-between gap-3 rounded-md bg-gray-100 p-5">
				<p class="text-3xl font-bold text-orange-600">Rp{product.price.toLocaleString()}</p>
			</div>
			<div class="flex w-full flex-col gap-2">
				{#if category.length === 0}
					<p class="text-orange-600">Produk Tidak Termasuk Ke Dalam Kategori Apapun !</p>
				{:else}
					<p class="text-orange-600">Kategori :</p>
					<div class="grid grid-cols-6 gap-2">
						{#each category as cat (cat.id)}
							<a
								href={`/category?name=${cat.category_name}`}
								class="flex w-full items-center justify-center rounded bg-orange-600 p-1 text-[10px] font-semibold text-white transition duration-700 hover:opacity-70 md:text-[13px]"
							>
								{cat.category_name}
							</a>
						{/each}
					</div>
				{/if}
			</div>
			<div class="flex w-full flex-col gap-2">
				<p class="text-orange-600">Kuantitas :</p>
				<ProductQuantity stok={product.stok} bind:quantity />
			</div>
			<div class="mt-5 flex w-full items-center gap-3 xl:w-1/2">
				<ProductBuy
					bind:quantity
					productId={product.id}
					stok={product.stok}
					price={product.price}
				/>
			</div>
		</div>
	</section>
	<section
		transition:fade={{ duration: 500 }}
		class="shadow-1 relative flex flex-row justify-between gap-2 rounded bg-white p-5 md:pl-20"
	>
		<a href={`/store/${product.Store.id}`} class="group h-14 w-14 rounded-full bg-gray-200 p-2">
			<StoreIcon class="h-full w-full transition duration-700 group-hover:animate-spin" />
		</a>
		<div class="flex w-full flex-col">
			<p class="text-lg font-bold">Store :</p>
			<p class="text-sm font-semibold">{product.Store.store_name}</p>
		</div>
	</section>
	<section
		transition:fade={{ duration: 500 }}
		class="shadow-1 relative flex min-h-screen flex-col gap-2 rounded bg-white p-5 md:p-20"
	>
		<div class="w-full">
			<p class="text-lg font-semibold">Ulasan ({comment.length})</p>
		</div>
		<div class="flex w-full flex-col gap-10">
			<CommentsInput profile={$profile} productId={product.id} />
			<div class="flex w-full">
				<CommentsCard {comment} />
			</div>
		</div>
	</section>
</div>
