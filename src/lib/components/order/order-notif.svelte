<script lang="ts">
	import { Button } from '../ui/button';
	import * as DropdownMenu from '../ui/dropdown-menu';
	import type { Profile } from '$lib/types/user-types';
	import { ShoppingBag } from '@lucide/svelte';
	import toast from 'svelte-french-toast';
	import { paymentHandle } from '$lib/providers/pay-api';
	import { goto } from '$app/navigation';
	import { orderApi } from '$lib/providers/order-api';

	export let profile: Profile;

	
	const orders = profile.order.filter((item) => item.status === 'Pending');

	const handleTransaction = async (data: { productId: string; orderId: string }) => {
		try {
			await paymentHandle.handleSnap({ productId: data.productId, orderId: data.orderId });
		} catch (error) {
			toast(`${error}`);
		}
	};

	const deletetransaction = async (data : {orderId : string}) => {
		try {
			await orderApi.deleteOrderById({orderId : data.orderId});
			window.location.reload();
		} catch (error) {
			console.log(error);
			return;
		}
	}

</script>

<svelte:head>
	<script
		src="https://app.sandbox.midtrans.com/snap/snap.js"
		data-client-key="SB-Mid-client-TsZ5ui08QBqn3mJs"
	>
	</script>
</svelte:head>

<DropdownMenu.Root>
	<DropdownMenu.Trigger>
		<Button
			class="border-1 relative h-12 w-12 cursor-pointer rounded-full border-white bg-transparent p-0 shadow-none transition duration-700 hover:bg-orange-300"
		>
			<p
				class="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-semibold text-white"
			>
				{orders.length}
			</p>
			<ShoppingBag class="h-full w-full" />
		</Button>
	</DropdownMenu.Trigger>
	<DropdownMenu.Content class="mr-10">
		{#if orders.length > 0}
			<DropdownMenu.Group>
				{#each orders as order}
					<DropdownMenu.Item>
						<div
							class="flex w-full flex-col gap-2 rounded-lg bg-white p-4 shadow hover:bg-gray-100"
						>
							<!-- Informasi Produk -->
							<div class="flex flex-col">
								<p class="text-sm font-semibold text-gray-800">Produk:</p>
								<p class="text-sm text-gray-700">{order.product_id}</p>
							</div>

							<!-- Info Order -->
							<div class="flex flex-col">
								<p class="text-sm font-semibold text-gray-800">ID Pesanan:</p>
								<p class="text-xs text-gray-600">{order.order_id}</p>

								<p class="mt-2 text-sm font-semibold text-gray-800">Harga:</p>
								<p class="text-sm text-gray-700">Rp {order.price.toLocaleString()}</p>

								<p class="mt-2 text-sm font-semibold text-gray-800">Status:</p>
								<p class="text-sm text-yellow-600">{order.status}</p>
							</div>

							<!-- Tanggal Order -->
							<div class="flex flex-col">
								<p class="mt-2 text-xs text-gray-500">
									Dipesan: {new Date(order.order_at).toLocaleDateString()}
								</p>
							</div>

							<!-- Tombol -->
							<div class="w-full flex gap-2 items-center justify-between">
								<Button
									onclick={async () =>
										await deletetransaction({
											orderId: order.order_id
										})}
									class="mt-3 w-1/2 bg-red-600 text-white hover:bg-orange-700"
								>
									Hapus
								</Button>
								<Button
									onclick={async () =>
										await handleTransaction({
											productId: order.product_id,
											orderId: order.order_id
										})}
									class="mt-3 w-1/2 bg-orange-600 text-white hover:bg-orange-700"
								>
									Bayar Sekarang
								</Button>
							</div>
						</div>
					</DropdownMenu.Item>
				{/each}
			</DropdownMenu.Group>
		{:else}
			<DropdownMenu.Label class="px-4 py-2 text-sm text-gray-500">
				Belum ada pesanan
			</DropdownMenu.Label>
		{/if}
	</DropdownMenu.Content>
</DropdownMenu.Root>
