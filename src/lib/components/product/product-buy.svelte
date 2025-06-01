<script lang="ts">
	import { paymentHandle } from '$lib/providers/pay-api';
	import { Loader, ShoppingBagIcon } from '@lucide/svelte';
	import toast from 'svelte-french-toast';
	import { Button } from '../ui/button';
	import { profile } from '$lib/stores/user-store';
	import Login from '../modals/login.dialog.svelte';
	import { goto } from '$app/navigation';

	let isLoading: boolean = false;

	export let stok: number;
	export let productId: string;
	export let quantity: number;
	export let price: number;

	let isOpen = false;

	const handleTransaction = async () => {
		isLoading = true;
		try {
			await paymentHandle.handleOrder({ productId: productId, quantity, price });
		} catch (error) {
			toast(`${error}`);
		} finally {
			isLoading = false;
		}
	};
</script>

<Login bind:isOpen />
<main class="w-full">
	{#if stok > 0}
		{#if $profile}
			<Button
				onclick={handleTransaction}
				class="flex w-full cursor-pointer items-center justify-center gap-3 rounded bg-orange-600 p-6 transition duration-700 hover:bg-orange-400"
			>
				<div class="flex items-center justify-center gap-3 text-[13px]">
					{#if isLoading}
						<Loader class="animate-spin w-5 h-5" />
					{:else}
						<ShoppingBagIcon class="h-5 w-5" />
						<p>Beli Sekarang</p>
					{/if}
				</div>
			</Button>
		{:else}
			<Button
				onclick={() => (isOpen = true)}
				class="flex w-full cursor-pointer items-center justify-center gap-3 rounded bg-orange-600 p-6 transition duration-700 hover:bg-orange-400"
			>
				<div class="flex items-center justify-center gap-3 text-[13px]">
					{#if isLoading}
						<Loader class="animate-spin w-5 h-5" />
					{:else}
						<ShoppingBagIcon class="h-5 w-5" />
						<p>Beli Sekarang</p>
					{/if}
				</div>
			</Button>
		{/if}
	{:else}
		<Button
			class="flex w-full items-center justify-center gap-3 rounded bg-orange-600 p-6"
			disabled
		>
			<ShoppingBagIcon class="h-5 w-5" />
			<p class="text-[13px] font-semibold">Produk terjual habis</p>
		</Button>
	{/if}
</main>
