<script lang="ts">
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { ImageDownIcon, Trash } from '@lucide/svelte';
	import { onMount } from 'svelte';

	export let imageDefault;
	export let setImage: any;
	let file: File | null;
	let imagePreview: string = '';

	const handlerFileChange = (e: Event) => {
		const input = e.target as HTMLInputElement;
		if (input.files && input.files[0]) {
			file = input.files[0];
			imagePreview = URL.createObjectURL(file);
			setImage(file);
		}
	};

	const removeFile = () => {
		imagePreview = imageDefault;
	};

	onMount(() => {
		imagePreview = imageDefault;
        setImage(imageDefault)
	});
</script>

<div class="w-full h-full relative border-2 border-black rounded-sm">
	<img src={imagePreview ? imagePreview : imageDefault} alt="hoho" class="w-full h-full object-cover" />
	{#if imagePreview !== imageDefault}
		<Trash class="w-5 h-5 absolute right-0 top-0 bg-white rounded cursor-pointer" onclick={removeFile} />
	{/if}
	<Label
		class="text-[15px] bg-white rounded font-semibold cursor-pointer flex mt-2 items-center gap-1 absolute right-0 bottom-0"
	>
		<ImageDownIcon class="w-6 h-6" />
		<Input type="file" class="hidden w-5 h-5" onchange={handlerFileChange} />
	</Label>
</div>
