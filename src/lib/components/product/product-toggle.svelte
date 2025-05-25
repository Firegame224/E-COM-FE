<script lang="ts">
	import * as ToggleGroup from '$lib/components/ui/toggle-group';

	export let category: any[];
	export let onSelected: string[];
</script>

<ToggleGroup.Root
	type="multiple"
	class="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 gap-2 items-center w-full"
	bind:value={onSelected}
>
	{#each category as cat}
		<ToggleGroup.Item
			value={cat.category_name}
			class="border border-black text-[10px] shadow-md transition
                cursor-pointer
				duration-200 ease-in-out
				data-[state=on]:border-orange-700
				data-[state=on]:bg-orange-500 data-[state=on]:text-white sm:text-sm"
		>
			{cat.category_name}
		</ToggleGroup.Item>
	{/each}
</ToggleGroup.Root>