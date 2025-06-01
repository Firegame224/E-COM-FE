<script lang="ts">
	import { Label } from '$lib/components/ui/label';
	import { fade } from 'svelte/transition';
	import { profile } from '$lib/stores/user-store';
	import { page } from '$app/stores';
	import OrderCard from '$lib/components/order/order-card.svelte';

	$: orders = $page.data.orders || [];
</script>

<main transition:fade={{ duration: 700 }} class="h-full w-full p-5">
	<div
		class="h-full w-full gap-10 rounded-sm bg-gradient-to-br from-orange-600 to-orange-200 p-10 py-5 shadow shadow-black"
	>
		<div class="flex w-full">
			<div class="mb-5 flex w-full flex-col gap-1">
				<Label class="text-[17px] text-white md:text-xl"
					>{$profile?.profile.name || 'Name'} Order ({orders.length})
				</Label>
				<Label class="text-[10px] text-white md:text-sm">Kelola data pembelian anda disini</Label>
			</div>
		</div>
		<div class="flex min-h-screen w-full items-center">
			{#if orders.length > 0}
				<OrderCard {orders} />
			{:else}
				<div class="flex h-full w-full items-center justify-center">
					<p class="text-sm font-semibold text-white md:text-lg">Belum ada data pembelian</p>
				</div>
			{/if}
		</div>
	</div>
</main>
