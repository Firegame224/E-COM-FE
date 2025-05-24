<script lang="ts">
	import { page } from '$app/state';
	import { StoreIcon, X } from '@lucide/svelte';
	import Buy from '$lib/components/product/product-buy.svelte';
	import { fade } from 'svelte/transition';

	const { product, category } = page.data;

</script>

<div class="min-h-screen w-full px-2 pt-10 md:px-16 flex flex-col gap-5">
    <div transition:fade={{duration : 500}} class="shadow-1 flex flex-col justify-between gap-2 rounded bg-white p-5 md:flex-row md:pl-20 relative">
        <a href="/" class="bg-gradient-to-br from-orange-600 to-orange-200  absolute top-0 right-0 rounded-sm hover:opacity-60 transition duration-700">
            <X class="w-6 h-6"/>
        </a>
        {#if product && product.image}
			<div class="flex h-[400px] w-full items-center justify-center md:h-[500px] md:w-[350px] relative">
				<img src={product.image} alt={product.product_name} class="h-full w-full object-cover" />
                <p class="absolute rounded-tl-none top-0 left-0 bg-gradient-to-br from-orange-600 to-orange-200 text-[15px] font-bold px-4 py-1 items-center justify-center flex rounded">
                    Stok : {product.stok}
                </p>
			</div>
		{:else}
			<div class="flex min-h-[500px] min-w-[350px] animate-pulse items-center justify-center bg-gray-500"></div>
		{/if}
		<div class="bg-light-300 line-clamp-2 flex w-full flex-col gap-2 md:w-3/5 md:p-5">
			<div class="w-full flex items-center justify-between min-h-20">
                <p class="text-[28px] font-bold">{product.product_name}</p>
                <p class="text-[20px] p-2 font-bold bg-gradient-to-br from-orange-600 to-orange-200 rounded-md">{product.status}</p>
            </div>
			<p class="font-semibold">Deskripsi :</p>
            <p class="text-md font-serif">{product.description || "Deskripsi Mungkin belum di tambahkan"}</p>
			<div class="flex w-full flex-col justify-between gap-3 rounded-md bg-gray-100 p-5">
				<p class="text-3xl font-bold text-orange-600">Rp{product.price.toLocaleString()}</p>
                    {#if category.length === 0}
                        Produk Belum termasuk Kedalam Kategory apapun
                    {:else}
                    <div class="grid grid-cols-6 gap-2">
                    {#each category as cat (cat.id)}
					    <a
                        href={`/category/?name=${cat.category_name}`}
					    class="flex w-full items-center justify-center rounded bg-gradient-to-br from-orange-600 to-orange-200 p-1 text-[12px] md:text-[15px] font-semibold hover:opacity-70 transition duration-700">
					        {cat.category_name}
					    </a>
					{/each}
                    </div>
                    {/if}
			</div>
            <Buy productId={product.id} stok={product.stok}/>
		</div>
	</div>
    <div transition:fade={{duration : 500}} class="shadow-1 flex justify-between gap-2 rounded bg-white p-5 flex-row md:pl-20 relative">
        <a href= {`/store/${product.Store.id}`} class="group w-14 h-14 bg-gray-200 p-2 rounded-full">
            <StoreIcon class="w-full h-full group-hover:animate-spin transition duration-700"/>
        </a>
        <div class="flex flex-col w-[94%]">
            <p class="font-bold text-lg">Store :</p>
            <p class="font-semibold text-sm">{product.Store.store_name}</p>
        </div>
    </div>
</div>
