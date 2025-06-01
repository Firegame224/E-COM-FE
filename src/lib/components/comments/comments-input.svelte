<script lang="ts">
	import toast from 'svelte-french-toast';
	import Login from '../modals/login.dialog.svelte';
	import { Button } from '../ui/button';
	import { Textarea } from '../ui/textarea';
	import { commentApi } from '$lib/providers/comment-api';
	import { Loader } from '@lucide/svelte';
	import { goto, invalidate, invalidateAll } from '$app/navigation';
	import { page } from '$app/state';

	export let profile;
	export let productId: string;

	let komentar: string = '';
	let isActive = false;
	let isOpen = false;
	let isLoading = false;

	const handleClose = () => {
		isActive = false;
		komentar = '';
	};

	const handleSubmit = async (e: Event) => {
		e.preventDefault();
		isLoading = true;
		try {
			await commentApi.createComment({ productId, komentar });
			goto(page.url.pathname, { invalidateAll: true, noScroll: true });
		} catch (error) {
			console.log(error);
			return;
		} finally {
			isLoading = false;
			komentar = '';
			isActive = false;
		}
	};
</script>

<Login bind:isOpen />
{#if profile}
	<form class="flex w-full flex-col gap-3" onsubmit={handleSubmit}>
		<div class="flex h-full w-full gap-3">
			<div class="h-full w-[10%] rounded-full md:w-[8%]">
				<img
					src={profile.profile.image}
					alt={profile.email}
					class="h-10 w-10 rounded-full object-cover md:h-14 md:w-14"
				/>
			</div>
			<div class="h-full w-[90%] md:w-[92%]">
				<Textarea
					required
					onfocus={() => (isActive = true)}
					bind:value={komentar}
					placeholder="Tambahkan ulasan anda tentang produk ini"
				/>
			</div>
		</div>
		{#if isActive}
			<div class="flex w-full items-center justify-end gap-2">
				<Button
					class="bg-orange-500 text-white hover:bg-white hover:text-orange-600"
					onclick={handleClose}>Batal</Button
				>
				<Button
					disabled={komentar === ''}
					type="submit"
					class="bg-orange-600 transition duration-700 hover:bg-orange-400"
				>
					{#if isLoading}
						<Loader class="h-5 w-5 animate-spin" />
					{:else}
						<p class="text-white">Kirim</p>
					{/if}
				</Button>
			</div>
		{/if}
	</form>
{:else}
	<form class="flex h-20 w-full flex-col gap-3">
		<div class="flex h-full w-full gap-3">
			<div class="h-full w-[10%] rounded-full md:w-[8%]">
				<img
					src="https://i.pinimg.com/736x/09/7d/3c/097d3cf1d036e549d1caa10ad9268dfe.jpg"
					alt="Logout"
					class="h-10 w-10 rounded-full object-cover md:h-14 md:w-14"
				/>
			</div>
			<div class="w-[90%] md:w-[92%]">
				<Textarea
					disabled={komentar !== ''}
					onclick={() => (isOpen = true)}
					oninput={() => (isOpen = true)}
					value={komentar}
					placeholder="Tambahkan ulasan anda tentang produk ini"
				/>
			</div>
		</div>
	</form>
{/if}
