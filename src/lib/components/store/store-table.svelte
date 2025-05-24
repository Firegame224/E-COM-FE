<script lang="ts">
	import { Input } from '../ui/input';
	import * as Table from '../ui/table';

	export let Columns: any;
	export let Rows: any;
	export let key: string;
    export let title : string
	//Search
	let search = '';
	$: filteredData = Rows.filter((item: any) =>
		item[key].toLowerCase().includes(search.toLowerCase())
	);
</script>

<main class="flex h-full w-full flex-col gap-2 rounded-md bg-[#f9f9f9] p-5">
	<Input bind:value={search} class="h-8 w-[40%] rounded-sm" placeholder="Filter" />
	<Table.Root class="gap-2 border-1">
		<Table.Caption>{title}</Table.Caption>
		<Table.Header class="border-1">
			<Table.Row class="bg-gradient-to-br from-orange-600 to-orange-200">
				{#each Columns as data}
					<Table.Head>{data.label}</Table.Head>
				{/each}
			</Table.Row>
		</Table.Header>
		<Table.Body class="">
			{#if filteredData.length > 0}
				{#each filteredData as sis}
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
                <Table.Cell class="text-center py-4 text-[#666] italic" colspan={Columns.length}>
                    Data Tidak Ditemukan
                </Table.Cell>
            </Table.Row>
            {/if}
		</Table.Body>
	</Table.Root>
</main>
