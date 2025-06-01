<script lang="ts">
	import { Button } from '../ui/button';
	import Dialog from '../dialog.svelte';
	import { goto } from '$app/navigation';

	export let isOpen: boolean;
</script>

<Dialog message="Anda Harus Login Untuk Melanjutkan" {isOpen}>
	<div class="flex w-full items-center justify-end gap-3">
		<Button
			onclick={() => (isOpen = false)}
			class="p-5 cursor-pointer bg-orange-400 font-semibold text-white transition duration-700 hover:bg-orange-300"
		>
			Batal
		</Button>
		<Button
			class="items-center cursor-pointer flex bg-orange-600 font-semibold text-white transition duration-700 p-5 hover:bg-orange-500 hover:opacity-75"
			onclick={() => goto('/auth/login')}
		>
			Login
		</Button>
	</div>
</Dialog>
