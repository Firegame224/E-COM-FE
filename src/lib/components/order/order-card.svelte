<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import { ChevronRight } from '@lucide/svelte';
	import Button from '../ui/button/button.svelte';
	import { goto } from '$app/navigation';
	export let orders;

</script>

<div class="flex w-full flex-col gap-2">
	{#each orders as order}
		<Card.Root class="flex w-full flex-row gap-0 bg-white p-2">
			<div class="h-full w-[35%] p-5 md:w-[20%]">
				<img
					src={order.product.image}
					alt="halo"
					class="min-h-30 h-full w-full object-cover md:h-auto"
				/>
			</div>
			<div class="relative h-full w-[65%] p-5 md:w-[80%]">
				<div
					class={`${order.status === 'Success' ? 'bg-green-500' : order.status === 'Pending' ? 'bg-yellow-400' : 'bg-red-500'} absolute right-0 top-0 flex items-center justify-center rounded-sm px-5 py-2 text-xs font-semibold text-black md:text-sm`}
				>
					{order.status}
				</div>
				<div class="text-md flex w-full flex-col gap-1">
					<p class="font-semibold text-orange-600">Order Detail :</p>
					<p class="text-xs font-semibold text-black md:text-sm">id : {order.order_id}</p>
					<p class="text-xs font-semibold text-black md:text-sm">
						Produk : {order.product.product_name}
					</p>
					<p class="text-xs font-semibold text-black md:text-sm">
						Harga : Rp {order.price.toLocaleString()}
					</p>
					<p class="text-xs font-semibold text-black md:text-sm">
						Jumlah dipesan : {order.price / order.product.price}pcs
					</p>
				</div>
				<Button
					class="absolute bottom-0 right-0 flex cursor-pointer items-center justify-center gap-1 bg-orange-600 transition duration-700 hover:bg-orange-200"
					onclick={() => goto(`/product/${order.product.id}`)}
				>
					<p class="hidden font-semibold md:flex">Kunjungi</p>
					<ChevronRight class="h-5 w-5" />
				</Button>
			</div>
		</Card.Root>
	{/each}
</div>
