<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import { storeApi } from '$lib/providers/store-api';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import Confirm from '$lib/components/modals/confirm.dialog.svelte';
	import { CalendarDaysIcon, Clock, Loader, Trash } from '@lucide/svelte';
	import { onMount } from 'svelte';
	import toast from 'svelte-french-toast'; 
	import { fade } from 'svelte/transition';
	import { convertDate } from '$lib/helpers/date';
	import StoreTable from '$lib/components/tables/table.svelte';
	import { productRows, productColumns } from '$lib/components/tables/table-product';


	let { store } = page.data;

	// State
	let isOpen = false;
	let isLoading = false;
	let onEdit = false;
	// Value input
	let name = '';
	let info = '';
	
	//Handling function
	const updateHandle = async (e: SubmitEvent) => {
		e.preventDefault();
		isLoading = true;
		try {
			await storeApi.updateStore({ id: store.id, name, info });
			goto(`/dashboard/store/`, { invalidateAll: true });
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
			await storeApi.deleteStoreById({ id: store.id });
			goto('/dashboard/store', { invalidateAll: true });
		} catch (error) {
			toast.error(`${error}`);
		} finally {
			isLoading = false;
		}
	};

	//Table data
	const rows = productRows({product : store.product})

	onMount(() => {
		name = store.store_name as string;
		info = store.info as string;
	});

	
</script>

<Confirm bind:isOpen bind:isLoading onConfirm={deleteHandle} />
<main transition:fade={{ duration: 700 }} class="w-full p-5 h-full">
	<div
		class="w-full h-full gap-5 flex flex-col p-2 md:p-10 shadow bg-gradient-to-br from-orange-500 to-orange-200 py-5 rounded-sm shadow-black"
	>
		<div class="w-full flex items-center justify-between gap-2">
			<div class="w-full flex flex-col">
				<Label class="text-white font-bold text-sm md:text-xl"
					>Detail Store :
				</Label>
				<Label class="text-[10px] md:text-sm text-white font-semibold">
					Berisi Detail dari toko {store.store_name}
				</Label>
			</div>
			<div class="flex justify-end items-center flex-col">
				<Button
					onclick={() => (isOpen = true)}
					class="bg-red-600 hover:bg-red-200 transition duration-700 cursor-pointer"
				>
					<Trash class="w-10 h-10" />
				</Button>
			</div>
		</div>
		<form
			onsubmit={updateHandle}
			transition:fade={{ duration: 700 }}
			class="w-full items-center flex flex-col gap-3 p-5 bg-white rounded-md shadow shadow-black"
		>
			<div class="w-full flex-col flex items-center justify-center gap-1">
				<Label
					class="w-full flex items-center justify-start text-sm md:text-[15px] font-semibold"
				>
					Store name :
				</Label>
				<Input
					name="name"
					class="w-full border-2 border-black text-black text-sm md:text-[15px] bg-white font-semibold"
					disabled={!onEdit}
					bind:value={name}
				/>
			</div>
			<div class="w-full flex-col flex items-center justify-center gap-1">
				<Label
					class="w-full flex items-center justify-start text-sm md:text-[15px] font-semibold"
				>
					Info :
				</Label>
				<Input
					name="info"
					class="w-full border-black border-2 text-black text-sm md:text-[15px] bg-white font-semibold"
					bind:value={info}
					disabled={!onEdit}
				/>
			</div>
			<div class="w-full flex gap-2">
				{#if onEdit}
					<Button
						onclick={() => (onEdit = false)}
						class="w-1/2 bg-orange-500 hover:bg-orange-200 transition duration-700 cursor-pointer"
					>
						Batal
					</Button>
					<Button
						class="w-1/2 bg-[#f44336] hover:bg-orange-300 transition duration-700 flex items-center justify-center cursor-pointer"
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
						class="w-full bg-[#f44336] hover:bg-orange-300 transition duration-700 cursor-pointer"
						onclick={() => (onEdit = true)}
					>
						Ubah Store
					</Button>
				{/if}
			</div>
			<div
				class="w-full text-white text-xs text-right italic mt-3 flex justify-between items-center"
			>
				<Label class="flex gap-1">
					<CalendarDaysIcon class="w-5 h-5" />
					<p class="text-[10px] md:text-sm">Dibuat: {convertDate({ date: store.created_At })}</p>
				</Label>
				<Label class="flex gap-1">
					<Clock class="w-5 h-5" />
					<p class="text-[10px] md:text-sm">
						Terakhir diubah: {convertDate({ date: store.update_At })}
					</p>
				</Label>
			</div>
		</form>
		<section class="w-full p-5 bg-white rounded-md shadow shadow-black">
			<StoreTable Columns={productColumns} Rows={rows} key="product_name" title ="Tabel Product"/>
		</section>
	</div>
</main>
