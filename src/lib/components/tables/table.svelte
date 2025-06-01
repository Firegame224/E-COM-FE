<script lang="ts">
	import { Button } from '../ui/button';
	import { Input } from '../ui/input';
	import * as Table from '../ui/table';

	export let Columns: any;
	export let Rows: any;
	export let key: string;
	export let title: string;

	//Search
	let search = '';
	let page = 1;
	let limit = 10;

	$: filteredData = Rows.filter((item: any) =>
		item[key].toLowerCase().includes(search.toLowerCase())
	);

	$: filtered = filteredData.slice((page - 1) * limit, page * limit);
	$: maxPage = Math.ceil(filteredData.length / limit);
	$: if (search !== '' && page !== 1) {
		page = 1;
	}
</script>

<main class="flex h-full w-full flex-col gap-2 rounded-md bg-[#f9f9f9] p-5">
	<Input bind:value={search} class="h-8 w-[40%] rounded-sm" placeholder="Filter" />
	<Table.Root class="border-1 gap-2">
		<Table.Caption>{title}</Table.Caption>
		<Table.Header class="border-1">
			<Table.Row class="bg-gradient-to-br from-orange-600 to-orange-200">
				{#each Columns as data}
					<Table.Head>{data.label}</Table.Head>
				{/each}
			</Table.Row>
		</Table.Header>
		<Table.Body class="">
			{#if filtered.length > 0}
				{#each filtered as sis}
					<Table.Row class="items-center">
						{#each Columns as data}
							<Table.Cell>
								{sis[data.key]}
							</Table.Cell>
						{/each}
					</Table.Row>
				{/each}
			{:else}
				<Table.Row>
					<Table.Cell class="py-4 text-center italic text-[#666]" colspan={Columns.length}>
						Data Tidak Ditemukan
					</Table.Cell>
				</Table.Row>
			{/if}
		</Table.Body>
	</Table.Root>
	<div class="flex w-full items-center justify-center">
		<Button
			disabled={page === 1}
			onclick={() => (page - 1)}
			class="cursor-pointer bg-orange-500 transition duration-700 hover:bg-orange-400"
		>
			<p class="text-sm font-semibold text-white">Prev</p>
		</Button>

		<p class="px-4 text-sm font-bold text-black">Page {page}</p>

		<Button
			disabled={page === maxPage}
			onclick={() => {
				page = Math.min(maxPage, page + 1);
			}}
			class="cursor-pointer bg-orange-500 transition duration-700 hover:bg-orange-400"
		>
			<p class="text-sm font-semibold text-white">Next</p>
		</Button>
	</div>
</main>
