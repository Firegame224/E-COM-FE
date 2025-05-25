<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import { storeApi } from '$lib/api/store-api';
	import { Button } from '$lib/components/ui/button';
	import StoreCard from '$lib/components/store/store-card.svelte';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import Dialog from '$lib/components/dialog.svelte';
	import { Loader, Plus } from '@lucide/svelte';
	import toast from 'svelte-french-toast';
	import { fade } from 'svelte/transition';
	import { onMount } from 'svelte';

	let { stores } = page.data;

	let isopen = false;
	let isLoading = false;

	let name = '';
	let info = '';

	const handleSubmit = async (e: SubmitEvent) => {
		e.preventDefault();
		isLoading = true;
		try {
			const create = await storeApi.createStore({ name, info });
			isopen = false;
			name = '';
			info = '';
			goto(`/dashboard/store/${create.id}`, { invalidateAll: true });
		} finally {
			isLoading = false;
			isopen = false;
		}
	};

	onMount(() => {
		if (stores.length === 0) {
			isopen = true;
		}
	});
</script>

<Dialog isOpen={isopen} message="Buat toko Baru?">
	<form onsubmit={handleSubmit} class="flex w-full flex-col gap-5 p-5">
		<div class="flex w-full flex-col gap-2">
			<Label class="text-sm font-semibold">Nama Toko :</Label>
			<Input bind:value={name} placeholder="Tambahkan nama toko" class="p-5" required />
			<Label class="text-sm font-semibold">Info Toko :</Label>
			<Input placeholder="Tambahkan Info toko" class="p-5" bind:value={info} required />
		</div>
		<div class="flex w-full items-center justify-end gap-3">
			{#if stores.length > 0}
				<Button
					onclick={() => (isopen = false)}
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
					<p>Tambah Toko</p>
				{/if}
			</Button>
		</div>
	</form>
</Dialog>

<main transition:fade={{ duration: 700 }} class="h-full w-full p-5">
	<div
		class="h-full w-full gap-10 rounded-sm bg-gradient-to-br from-orange-600 to-orange-200 p-10 py-5 shadow shadow-black"
	>
		<div class="flex w-full">
			<div class="mb-5 flex w-full flex-col gap-1">
				<Label class="text-sm font-bold text-white md:text-xl">Toko ({stores.length})</Label>
				<Label class="text-[10px] text-white md:text-sm">Kelola Toko anda disini</Label>
			</div>
			<div>
				<Button
					onclick={() => (isopen = true)}
					class=" flex cursor-pointer bg-orange-600 text-white transition duration-700 hover:bg-orange-500"
				>
					<Plus class="h-10 w-10" />
					<p class="font-semibold">Tambah Toko</p>
				</Button>
			</div>
		</div>
		<div class="flex w-full flex-col gap-5">
			<StoreCard Stores={stores} />
		</div>
	</div>
</main>
