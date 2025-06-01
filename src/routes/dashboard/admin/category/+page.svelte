<script lang="ts">
	import { catApi } from '$lib/providers/category-api';
	import { fade } from 'svelte/transition';
	import { Button } from '$lib/components/ui/button';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import ProductCard from '$lib/components/product/product-card.svelte';
	import { Label } from '$lib/components/ui/label';
	import { FileBadge, Loader, Plus, Trash } from '@lucide/svelte';
	import Dialog from '$lib/components/dialog.svelte';
	import { Input } from '$lib/components/ui/input';
	import { onMount } from 'svelte';
	import Confirm from '$lib/components/modals/confirm.dialog.svelte';

	let name = '';
	let isOpen = false;
	let onConfirm = false;
	let isLoading = false;
	let catId = '';

	$: products = $page.data.products;
	$: url = $page.data.url;
	$: category = $page.data.category;

	const handleClick = (id: string, name: string) => {
		catId = id;
		goto(`/dashboard/admin/category?name=${name}`, { invalidateAll: true, noScroll: true });
	};

	const handleDelete = async () => {
		isLoading = false;
		try {
			await catApi.deleteCategory({id : catId});
			goto('/dashboard/admin/category', { noScroll: true, invalidateAll: true });
		} catch (error) {
			console.error(error);
		} finally {
			onConfirm = false;
			isLoading = false;
		}
	};

	const handleSubmit = async (e: Event) => {
		e.preventDefault();
		isLoading = true;
		try {
			await catApi.createCategory({ name });
			goto('/dashboard/admin/category', { noScroll: true, invalidateAll: true });
		} catch (error) {
			console.error(error);
		} finally {
			name = '';
			isOpen = false;
			isLoading = false;
		}
	};

	onMount(() => {
		if (category.length === 0) isOpen = true;
	});
</script>

<Confirm bind:isLoading bind:isOpen={onConfirm} onConfirm={handleDelete} />
<Dialog {isOpen} message="Tambahkan kategori">
	<form onsubmit={handleSubmit} class="flex w-full flex-col gap-5 p-5">
		<div class="flex w-full flex-col gap-2">
			<Label class="text-sm font-semibold">Nama Kategori :</Label>
			<Input bind:value={name} placeholder="Masukan nama kategori" class="p-5" required />
		</div>
		<div class="flex w-full items-center justify-end gap-3">
			{#if category.length > 0}
				<Button
					onclick={() => (isOpen = false)}
					class="cursor-pointer bg-orange-500 font-semibold text-white transition duration-700 hover:bg-orange-300"
				>
					Batal
				</Button>
			{/if}
			<Button
				type="submit"
				class="items-centercursor-pointer flex bg-gradient-to-br from-orange-400 to-orange-600 font-semibold text-white transition duration-700 hover:opacity-60"
				disabled={isLoading}
			>
				{#if isLoading}
					<Loader class="h-10 w-10" />
				{:else}
					<Plus class="h-10 w-10" />
					<p>Tambah Kategori</p>
				{/if}
			</Button>
		</div>
	</form>
</Dialog>
<main transition:fade={{ duration: 700 }} class="h-full w-full p-5">
	<div
		class="flex h-full w-full flex-col gap-5 rounded-sm bg-gradient-to-br from-orange-600 to-orange-300 p-10 py-5 shadow shadow-black"
	>
		<div class="flex w-full">
			<div class="mb-2 flex w-full flex-col gap-1">
				<Label class="text-sm font-bold text-white md:text-xl">Category</Label>
				<Label class="text-[10px] text-white md:text-sm">Kelola kategori produk disini</Label>
			</div>
			<div class="flex gap-2">
				<Button
					onclick={() => (isOpen = true)}
					class=" flex cursor-pointer bg-orange-600 text-white transition duration-700 hover:bg-orange-500"
				>
					<Plus class="h-10 w-10" />
					<p class="font-semibold">Tambah Category</p>
				</Button>
				{#if catId}
					<Button
						onclick={() => onConfirm = true }
						class=" flex cursor-pointer bg-red-600 text-white transition duration-700 hover:bg-red-400"
					>
						<Trash class="h-10 w-10" />
					</Button>
				{/if}
			</div>
		</div>
		<div class="flex w-full flex-col gap-3 p-5">
			{#if category.length > 0}
				<div class="grid w-full grid-cols-4 gap-2 md:grid-cols-8">
					{#each category as cat}
						<Button
							class={`${cat.category_name === url ? 'bg-white' : 'bg-orange-200'} cursor-pointer p-5 text-black transition duration-700 hover:bg-white`}
							onclick={() => handleClick(cat.id, cat.category_name)}
						>
							{cat.category_name}
						</Button>
					{/each}
				</div>
			{/if}
			<div class="flex w-full flex-col">
				<p class="text-white font-semibold text-lg">Product ({products.length})</p>
				{#if products.length > 0}
					<ProductCard Api={products} />
				{:else}
					<div class="flex h-full w-full items-center justify-center p-10">
						<p class="text-lg font-semibold text-white">Belum ada produk yg ditemukan</p>
					</div>
				{/if}
			</div>
		</div>
	</div>
</main>
