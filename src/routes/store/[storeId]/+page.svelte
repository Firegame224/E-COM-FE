<script lang="ts">
	import { page } from '$app/state';
	import Header from '$lib/components/dashboard/header.svelte';
	import ProductCard from '$lib/components/product/product-card.svelte';
	import { Label } from '$lib/components/ui/label';
	import { convertDate } from '$lib/helpers/date';
	import { ShoppingBag, StoreIcon, CalendarClock, UserIcon } from '@lucide/svelte';
	import { fade } from 'svelte/transition';

	let store = page.data;

</script>

<Header title=""/>
<main class="flex min-h-screen w-full flex-col gap-4 bg-gray-50">
	<!-- Section Header Toko -->
	<section
		transition:fade={{ duration: 500 }}
		class="shadow-md flex flex-col md:flex-row gap-5 bg-white rounded-md p-6 md:p-8 mx-4 mt-4"
	>
		<!-- Kiri: Identitas Toko -->
		<div class="w-full md:w-[30%] bg-gradient-to-b from-orange-700 to-orange-400 p-5 flex rounded-md">
			<div class="flex h-16 w-16 items-center justify-center rounded-full bg-white shadow shadow-black">
				<StoreIcon class="w-8 h-8 text-orange-700" />
			</div>
			<div class="flex flex-col justify-center ml-4">
				<Label class="font-bold text-white text-base">{store.store_name}</Label>
				<Label class="text-sm text-white">{store.info}</Label>
			</div>
		</div>
		<!-- Identitas pemilik -->
		<div class="w-full md:w-[30%] bg-gradient-to-b from-orange-700 to-orange-400 p-5 flex rounded-md">
			<div class="flex h-16 min-w-16 items-center justify-center rounded-full bg-white shadow shadow-black">
				<img src={store.user.profile.image} alt={store.store_name} class="w-full h-full rounded-full object-cover"/>
			</div>
			<div class="flex flex-col justify-center ml-4">
				<Label class="font-bold text-white">Owner :</Label>
				<Label class="font-semibold text-white text-sm">{store.user.profile.name}</Label>
				<Label class="text-xs text-white font-sans">{store.user.profile.bio}</Label>
			</div>
		</div>

		<!-- Kanan: Info Produk dan Tanggal -->
		<div class="w-full md:w-[30%] flex flex-col justify-center gap-3">
			<Label class="flex items-center gap-2 text-gray-700">
				<ShoppingBag class="w-5 h-5" />
				<span>Produk : {store.product.length}</span>
			</Label>
			<Label class="flex items-center gap-2 text-gray-700">
				<CalendarClock class="w-5 h-5" />
				<span>Bergabung pada : {convertDate({ date: store.created_At })}</span>
			</Label>
		</div>
	</section>

	<!-- Section Produk -->
	<section class="bg-white mx-4 p-6 rounded-md shadow-md">
		<div class="text-lg font-semibold mb-4">Produk :</div>
		<ProductCard Api={store.product} />
	</section>
</main>
