<script lang="ts">
	import { profile } from '$lib/stores/user-store';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { Textarea } from '$lib/components/ui/textarea';
	import { ChevronRight, Loader, StoreIcon, User } from '@lucide/svelte';
	import { goto } from '$app/navigation';
	import type { StoresTypes } from '$lib/types/store-types';
	import { Button } from "$lib/components/ui/button";
	import ImageUpload from '$lib/components/image-upload.svelte';
	import { userApi } from '$lib/providers/user-api';
	import { onMount } from 'svelte';
	import { fade, scale } from 'svelte/transition';
	import StoreCard from '../store/store-card.svelte';

	let isLoading: boolean = false;
	let onEdit: boolean = false;
	let Name: string;
	let Bio: string;
	let image: File | null;

	const toggleEdit = () => (onEdit = !onEdit);
	const setImage = (url: File) => {
		image = url;
	};

	const handleSubmit = async (e: Event) => {
		e.preventDefault();
		isLoading = true;
		try {
			await userApi.updateUser({ name: Name, bio: Bio, image });
			
			toggleEdit();
			await goto('/dashboard', { invalidateAll: true });
		} finally {
			isLoading = false;
		}
	};

	export let Stores: StoresTypes[] | [] = [];

	onMount(() => {
		Name = $profile?.profile.name as string;
		Bio = $profile?.profile.bio as string;
	});
</script>

<main
	class="w-full h-full justify-center flex flex-col md:flex-row gap-5 shadow bg-gradient-to-br from-orange-700 to-orange-200 py-5 rounded-sm shadow-black"
>
	<form
		transition:fade={{ duration: 700 }}
		class="w-full md:w-[40%] items-center flex flex-col gap-3 border-r-2 p-5"
		onsubmit={handleSubmit}
	>
		<Label
			class="w-full flex items-center justify-start text-white text-md md:text-[20px] font-semibold"
		>
			<User fill="white" class="w-5 h-5" />
			{$profile?.profile.name}
		</Label>
		<div class="w-40 h-40" transition:scale={{ duration: 300 }}>
			{#if !onEdit}
				<img src={$profile?.profile.image} alt="yaya" class="w-full h-full object-cover" />
			{:else}
				<ImageUpload imageDefault={$profile?.profile.image} {setImage} />
			{/if}
		</div>
		<div class="w-full flex-col flex items-center justify-center">
			<Label
				class="w-full flex items-center justify-start text-white text-sm md:text-[15px] font-semibold"
			>
				Name :
			</Label>
			<Input
				name="name"
				bind:value={Name}
				class="w-full border-white border-3 text-black text-sm md:text-[15px] bg-white font-semibold"
				disabled={!onEdit}
			/>
		</div>
		<div class="w-full flex-col flex items-center justify-center">
			<Label
				class="w-full flex items-center justify-start text-white text-sm md:text-[15px] font-semibold"
			>
				Email :
			</Label>
			<Input
				name="email"
				value={$profile?.email}
				class="w-full border-white border-3 text-black text-sm md:text-[15px] bg-white font-semibold"
				disabled
			/>
		</div>
		<div class="w-full flex-col flex items-center justify-center">
			<Label
				class="w-full flex items-center justify-start text-white text-sm md:text-[15px] font-semibold"
			>
				Bio :
			</Label>
			<Textarea
				name="bio"
				bind:value={Bio}
				class="w-full border-white border-3 text-black text-sm md:text-[14px] bg-white font-semibold h-36 resize-none"
				disabled={!onEdit}
			/>
		</div>
		<div class="w-full flex gap-2">
			{#if onEdit}
				<Button
					class="w-1/2 bg-orange-600 hover:bg-orange-200 transition duration-700"
					onclick={toggleEdit}
				>
					Batal
				</Button>
				<Button
					class="w-1/2 bg-orange-600 hover:bg-orange-200 transition duration-700 flex items-center justify-center"
					type="submit"
				>
					{#if isLoading}
						<Loader class="animate-spin" />
					{:else}
						<p>Simpan</p>
					{/if}
				</Button>
			{:else}
				<Button
					class="w-full bg-orange-600 hover:bg-orange-200 transition duration-700"
					onclick={() => (onEdit = true)}
				>
					Ubah Profile
				</Button>
			{/if}
		</div>
	</form>
	<section class="w-full flex flex-col gap-3 p-5">
		<Label
			class="w-full flex items-center justify-start text-white text-md md:text-[20px] font-semibold"
		>
			<StoreIcon class="w-5 h-5" />
			Toko :
		</Label>
		<StoreCard Stores={Stores}/>
	</section>
</main>
