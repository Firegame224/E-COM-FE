<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import Dialog from '$lib/components/dialog.svelte';
	import { Button } from '$lib/components/ui/button';
	import Label from '$lib/components/ui/label/label.svelte';
	import { Separator } from '$lib/components/ui/separator';
	import { Copy, Edit, Plus, Store } from '@lucide/svelte';
	import { fade } from 'svelte/transition';
	import ImageUpload from '$lib/components/image-upload.svelte';
	import { Input } from '$lib/components/ui/input';
	import { Textarea } from '$lib/components/ui/textarea';
	import { onMount } from 'svelte';
	import { productApi } from '$lib/providers/product-api';
	import toast from 'svelte-french-toast';

	let { products } = page.data;

	// state
	let isOpen = false;
	let storeId = '';
	let isLoading = false;

	let name= '';
	let description = '';
	let price = 0;
	let stok= 0;

	let image: File | string;

	const setImage = (data: File | string) => {
		image = data;
	};

	// Handling function
	const handleSubmit = async (e: SubmitEvent) => {
		e.preventDefault();
		isLoading = true;
		try {
			await productApi.createProductByStoreId({ storeId, name, stok, price, image, description });

			window.location.reload()
		} finally {
			isLoading = false;
			isOpen = false;
		}
	};

	onMount(() => {
		if (products.length === 0) {
			isOpen = true;
		}
	});
</script>

<Dialog {isOpen} message="Tambahkan Product Baru">
	<form class="flex w-full flex-col justify-center gap-4 p-2" onsubmit={handleSubmit}>
		<Label>Store Id :{storeId}</Label>
		<div class="flex w-[35%] flex-col items-center gap-2">
			<Label class="text-black">Tambahkan Gambar (Wajib)</Label>
			<ImageUpload {setImage} imageDefault="https://static.thenounproject.com/png/690578-200.png" />
		</div>
		<div class="flex w-full flex-col gap-4">
			<div class="flex flex-col gap-2">
				<Label class="text-black" for="name">Nama Produk</Label>
				<Input bind:value={name} id="name" placeholder="Contoh: Teh Botol Sosro" required />
			</div>
			<div class="w-full flex gap-2">
			<div class="flex flex-col gap-2 w-1/2">
				<Label class="text-black" for="price">Harga</Label>
				<Input bind:value={price} id="price" type="number" placeholder="Contoh : 20000" required />
			</div>
			<div class="flex flex-col gap-2 w-1/2">
				<Label class="text-black" for="stok">Stok</Label>
				<Input bind:value={stok} id="stok" type="number" placeholder="Contoh : 10" required />
			</div>
			</div>
			<div class="flex flex-col gap-2">
				<Label class="text-black" for="desc">Deskripsi</Label>
				<Textarea
					bind:value={description}
					id="desc"
					class="h-[105px]"
					placeholder="Tambahkan deskripsi produk"
					required
				/>
			</div>
		</div>
		<div class="mt-4 flex w-full justify-end gap-2">
			<Button type="button" onclick={() => (isOpen = false)} class="bg-gray-400 hover:bg-gray-500"
				>Batal</Button
			>
			<Button type="submit" class="bg-orange-600 hover:bg-orange-400">Simpan Produk</Button>
		</div>
	</form>
</Dialog>

<main transition:fade={{ duration: 700 }} class="h-full w-full p-5">
	<div
		class="h-full w-full gap-10 rounded-sm bg-gradient-to-br from-orange-600 to-orange-200 p-10 py-5 shadow shadow-black"
	>
		<div class="flex w-full">
			<div class="mb-5 flex w-full flex-col gap-1">
				<Label class="text-sm font-bold text-white md:text-xl">Produk</Label>
				<Label class="text-[10px] text-white md:text-sm">Tambahkan Produk ke toko anda</Label>
			</div>
		</div>
		<div class="flex w-full flex-col gap-5">
			{#each products as store}
				<div class="min-h-[200px] w-full rounded-md bg-white p-5">
					<div class="flex w-full items-center justify-between gap-3">
						<div class="flex items-center gap-3">
							<Store class="h-5 w-5" />
							<Label class="text-[12px] md:text-[15px]"
								>{store.store_name} ( {store.product.length} )</Label
							>
						</div>
						<div>
							<Button
								onclick={() => ((storeId = `${store.id}`), (isOpen = true))}
								class=" flex cursor-pointer bg-orange-600 text-white transition duration-700 hover:bg-orange-400"
							>
								<Plus class="h-10 w-10" />
								<p class="font-semibold">Tambah Product</p>
							</Button>
						</div>
					</div>
					<Separator class="my-2 border-1 border-black" />
					{#if store.product.length > 0}
						<div class="scrollbar-hide flex h-full w-full overflow-x-auto gap-3">
							{#each store.product as prod}
								<Button
									class="group relative flex h-full max-w-40 flex-shrink-0 cursor-pointer flex-col overflow-hidden rounded-sm border-1 border-black bg-orange-500 p-2 transition duration-700 hover:bg-orange-400"
								>
									<img
										src={prod.image || "https://static.thenounproject.com/png/690578-200.png"}
										alt="Product"
										class="h-[150px] w-full rounded-sm object-cover"
									/>
									<div class="flex w-full flex-col items-center gap-3 py-2">
										<Label class="text-white text-xs max-w-full truncate">{prod.product_name}</Label>
									</div>
									<div
										class="absolute inset-0 z-10 flex translate-y-10 flex-col items-center justify-center gap-3 rounded-sm bg-gradient-to-br from-orange-600 to-orange-200 p-2 opacity-0 blur-sm transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 group-hover:blur-none"
									>
										<Label class="text-white">Option :</Label>
										<Button
											onclick={() => (navigator.clipboard.writeText(prod.id), toast.success("Id Berhasil Di Copy"))}
											class="flex w-full cursor-pointer items-center justify-center gap-2 border border-white bg-orange-600/70 text-white hover:bg-orange-400 "
										>
											<Copy class="h-5 w-5" />
											<p>Copy Id</p>
										</Button>
										<Button
											onclick={() => goto(`/dashboard/product/${prod.id}`)}
											class="flex w-full cursor-pointer items-center justify-center gap-2 border border-white bg-orange-600/70 text-white hover:bg-orange-400"
										>
											<Edit class="h-5 w-5" />
											<p>Edit</p>
										</Button>
									</div>
								</Button>
							{/each}
						</div>
					{:else}
						<div class="flex h-full w-full items-center justify-center">
							<p>Belum ada product yang ditambahkan</p>
						</div>
					{/if}
				</div>
			{/each}
		</div>
	</div>
</main>
