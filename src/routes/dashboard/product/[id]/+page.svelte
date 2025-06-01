<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import Confirm from '$lib/components/modals/confirm.dialog.svelte';
	import { Loader, Trash } from '@lucide/svelte';
	import { onMount } from 'svelte';
	import toast from 'svelte-french-toast';
	import { fade } from 'svelte/transition';
	import ImageUpload from '$lib/components/image-upload.svelte';
	import Textarea from '$lib/components/ui/textarea/textarea.svelte';
	import { productApi } from '$lib/providers/product-api';
	import ProductToggle from '$lib/components/product/product-toggle.svelte';
	import { catApi } from '$lib/providers/category-api';

	$: product = $page.data.product;
	$: category = $page.data.category;

	// State
	let isOpen = false;
	let isLoading = false;
	let onEdit = false;

	// Value input
	$: name = '';
	$: description = '';
	$: stok = 0;
	$: price = 0;
	let image: File | string | undefined;

	// Category
	let onSelected: string[];

	// Set value Image
	let setImage = (data: File) => {
		image = data;
	};

	// Product
	const updateHandle = async (e: SubmitEvent) => {
		e.preventDefault();
		isLoading = true;
		try {
			productApi.updateProduct({
				id: product.product.id,
				name,
				description,
				stok,
				storeId: product.product.storeId,
				price,
				image
			});

		} catch (error) {
			toast.error(`${error}`);
		} finally {
			onEdit = false;
			isLoading = false;
		}
	};

	const deleteHandle = async () => {
		isLoading = true;
		try {
			await productApi.deleteById({ id: product.product.id });
		} catch (error) {
			toast.error(`${error}`);
		} finally {
			isLoading = false;
		}
	};

	// Category
	const addCategories = async (e: SubmitEvent) => {
		e.preventDefault();
		isLoading = true;
		try {
			await catApi.addProductCategory({ id: product.product.id, name: onSelected });
		} catch (error) {
			toast.error(`${error}`);
		} finally {
			isLoading = false;
		}
	};

	const deleteCategories = async () => {
		try {
			await catApi.deleteProductCategory({ id: product.product.id });
			onSelected = [];
		} catch (error) {
			toast.error(`${error}`);
		}
	};

	onMount(() => {
		name = product.product.product_name;
		description = product.product.description;
		stok = product.product.stok;
		price = product.product.price;
		image = product.product.image;
		onSelected = product.category.map((cat: { category_name: string }) => cat.category_name);
	});
</script>

<Confirm bind:isOpen bind:isLoading onConfirm={deleteHandle} />
<main transition:fade={{ duration: 700 }} class="h-full w-full p-5">
	<div
		class="flex h-full w-full flex-col gap-5 rounded-sm bg-gradient-to-br from-orange-600 to-orange-200 p-2 py-5 shadow shadow-black md:p-10"
	>
		<div class="flex w-full items-center justify-between gap-2">
			<div class="flex w-full flex-col">
				<Label class="text-sm font-bold text-white md:text-xl"
					>Detail Product : {product.product.product_name}
					<p class="text-red-600"></p>
				</Label>
				<Label class="text-[10px] font-semibold text-white md:text-sm">
					Berisi Detail Product dari toko {product.product.Store.store_name}
				</Label>
			</div>
			<div class="flex flex-col items-center justify-end">
				<Button
					onclick={() => (isOpen = true)}
					class="cursor-pointer bg-red-600 transition duration-700 hover:bg-red-200"
				>
					<Trash class="h-10 w-10" />
				</Button>
			</div>
		</div>
		<section class="flex w-full flex-col gap-5 rounded-md bg-white p-5 shadow shadow-black">
			<Label class="text-sm md:text-lg">Chart Order</Label>
		</section>
		<!-- Edit Product -->
		<form
			onsubmit={updateHandle}
			transition:fade={{ duration: 700 }}
			class="flex w-full flex-col gap-5 rounded-md bg-white p-5 shadow shadow-black"
		>
			<Label class="text-sm md:text-lg">Edit Produk</Label>
			<div class="flex w-full flex-col items-center justify-between px-1 md:flex-row">
				<!-- Upload Image -->
				<div class="h-full w-full md:w-[35%]">
					{#if !onEdit}
						<img
							src={product.product.image || 'https://static.thenounproject.com/png/690578-200.png'}
							alt="yaya"
							class="max-h-[300px] w-full object-cover"
						/>
					{:else}
						<ImageUpload imageDefault={image} {setImage} />
					{/if}
				</div>
				<!-- Product Description -->
				<div class="flex w-full flex-col justify-start gap-2 md:w-[60%]">
					<Label for="deskripsi" class="text-sm font-semibold md:text-[15px]">Deskripsi</Label>
					<Textarea
						id="deskripsi"
						name="deskripsi"
						bind:value={description}
						class="h-[205px] resize-none border-2 border-black bg-white text-sm font-semibold text-black md:text-[15px]"
						disabled={!onEdit}
					/>
				</div>
			</div>
			<!-- Product Name -->
			<div class="flex w-full gap-1">
				<div class="flex w-[50%] flex-col gap-2">
					<Label for="name" class="text-sm font-semibold md:text-[15px]">Store Name</Label>
					<Input
						id="name"
						name="name"
						bind:value={name}
						class="border-2 border-black bg-white text-sm font-semibold text-black md:text-[15px]"
						disabled={!onEdit}
					/>
				</div>
				<!-- Product Price -->
				<div class="flex w-[50%] flex-col gap-2">
					<Label for="price" class="text-sm font-semibold md:text-[15px]">Harga</Label>
					<Input
						id="price"
						name="price"
						type="number"
						bind:value={price}
						class="border-2 border-black bg-white text-sm font-semibold text-black md:text-[15px]"
						disabled={!onEdit}
					/>
				</div>
				<!-- Product Stok -->
				<div class="flex w-[50%] flex-col gap-2">
					<Label for="stok" class="text-sm font-semibold md:text-[15px]">Stok</Label>
					<Input
						id="stok"
						name="stok"
						type="number"
						bind:value={stok}
						class="border-2 border-black bg-white text-sm font-semibold text-black md:text-[15px]"
						disabled={!onEdit}
					/>
				</div>
			</div>
			<div class="mt-4 flex w-full gap-2">
				{#if onEdit}
					<Button
						onclick={() => (onEdit = false)}
						class="w-1/2 cursor-pointer bg-orange-500 transition duration-700 hover:bg-orange-200"
					>
						Batal
					</Button>
					<Button
						class="flex w-1/2 cursor-pointer items-center justify-center bg-[#f44336] transition duration-700 hover:bg-orange-300"
						type="submit"
					>
						{#if isLoading}
							<Loader class="animate-spin" />
						{:else}
							<p>Simpan</p>
						{/if}
					</Button>
				{:else}
					<Button
						type="button"
						class="w-full cursor-pointer bg-[#f44336] hover:bg-orange-300"
						onclick={() => (onEdit = true)}
					>
						Ubah Produk
					</Button>
				{/if}
			</div>
		</form>
		<!-- Update Category -->
		<form
			onsubmit={addCategories}
			class="flex w-full flex-col gap-5 rounded-md bg-white p-5 shadow shadow-black"
		>
			<div class="flex w-full items-center justify-between gap-2">
				<div class="flex w-full flex-col">
					<Label class="text-sm font-bold text-white md:text-xl">
						<p class="text-red-600">Tambahkan Ke Kategori</p>
					</Label>
				</div>
				<div class="flex flex-col items-center justify-end">
					<Button
						onclick={deleteCategories}
						class="cursor-pointer bg-red-600 transition duration-700 hover:bg-red-200"
					>
						<Trash class="h-10 w-10" />
					</Button>
				</div>
			</div>
			<ProductToggle bind:onSelected {category} />
			{#if onSelected.length > 0}
				<div class="flex w-full flex-wrap gap-2">
					{#each onSelected as name}
						<span class="rounded bg-orange-200 px-2 py-1 text-xs font-semibold text-orange-700"
							>{name}</span
						>
					{/each}
				</div>
				<Button
					class="flex w-full cursor-pointer items-center justify-center bg-[#f44336] transition duration-700 hover:bg-orange-300"
					type="submit"
				>
					{#if isLoading}
						<Loader class="animate-spin" />
					{:else}
						<p>Tambah Kategori</p>
					{/if}
				</Button>
			{/if}
		</form>
	</div>
</main>
