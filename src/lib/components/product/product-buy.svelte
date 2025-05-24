<script lang="ts">
	import { snapToken } from '$lib/api/pay-api';
	import { Loader, ShoppingBagIcon } from '@lucide/svelte';
	import toast from 'svelte-french-toast';
	let isLoading: boolean = false;

	export let stok;
	export let productId;

	const handleTransaction = async () => {
		isLoading = true;
		try {
			await snapToken(productId);
		} catch (error) {
			toast(`${error}`);
		} finally {
			isLoading = false;
		}
	};
</script>

<svelte:head>
	<script
		src="https://app.sandbox.midtrans.com/snap/snap.js"
		data-client-key="SB-Mid-client-TsZ5ui08QBqn3mJs">
	</script>
</svelte:head>

<main class="flex w-full items-center justify-end">
	{#if stok > 0}
		<button
			on:click={handleTransaction}
			class="flex h-10 w-1/2 cursor-pointer items-center justify-center gap-3 rounded-md bg-gradient-to-br from-orange-600 to-orange-300 transition duration-700 hover:bg-gradient-to-tl hover:from-orange-300 hover:to-orange-600"
		>
		<div class="text-[13px] font-semibold md:text-lg flex items-center justify-center gap-3">
			{#if isLoading}
					<Loader class="animate-spin"/>
			{:else}
					<ShoppingBagIcon class="h-5 w-5" />
					<p>Beli Sekarang</p>
			{/if}
		</div>
		</button>
	{:else}
		<button
			disabled
			class="flex h-10 w-1/2 items-center justify-center gap-3 rounded-md bg-gradient-to-br from-orange-600 to-orange-300 opacity-80"
		>
			<ShoppingBagIcon class="h-5 w-5" />
			<p class="text-[13px] font-semibold md:text-lg">Produk terjual habis</p>
		</button>
	{/if}
</main>
