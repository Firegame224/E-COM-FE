<script lang="ts">
	import { fade, scale } from 'svelte/transition';
	import { profile } from '$lib/stores/user-store';
	import { Button } from '$lib/components/ui/button';
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import Table from '$lib/components/tables/table.svelte';
	import { orderColumns, orderRows } from '$lib/components/tables/table-orders';
	import { Label } from '$lib/components/ui/label';

	let { orders } = page.data;

	const rows = orderRows({ orders: orders });
</script>

<main transition:fade={{ duration: 700 }} class="h-full w-full p-5">
	<div
		class="flex flex-col h-full w-full items-center justify-center gap-10 rounded-sm bg-gradient-to-br from-orange-600 to-orange-200 p-10 py-5 shadow shadow-black"
	>
		<div class="flex w-full">
			<div class="mb-5 flex w-full flex-col gap-1">
				<Label class="text-[17px] text-white md:text-xl"
					>Order data ({orders.length})
				</Label>
				<Label class="text-[10px] text-white md:text-sm">Kelola data pembelian user disini</Label>
			</div>
		</div>
		<div class="min-h-screen w-full">
			<Table Rows={rows} Columns={orderColumns} title="Table order" key="user_id" />
		</div>
	</div>
</main>
