<script lang="ts">
	import { Button } from "../ui/button";
	import { Loader } from "@lucide/svelte";
	import Dialog from "../dialog.svelte";

    export let isOpen : boolean
    export let isLoading : boolean
    export let onConfirm : () => void
</script>

<Dialog message="Apakah kamu yakin ?" isOpen={isOpen}>
    	<div class="w-full items-center flex gap-3 justify-end">
		<Button
			onclick={() => (isOpen = false)}
			class="bg-orange-500 text-white font-semibold hover:bg-orange-300 transition duration-700 cursor-pointer"
		>
			Batal
		</Button>
		<Button
			class="flex items-centercursor-pointer text-white font-semibold bg-gradient-to-br from-orange-400 to-orange-600 hover:opacity-60 transition duration-700"
			disabled={isLoading}
            onclick={onConfirm}
            >
			{#if isLoading}
				<Loader class="w-10 h-10" />
			{:else}
				Lanjutkan
			{/if}
		</Button>
	</div>
</Dialog>