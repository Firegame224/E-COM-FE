<script lang="ts">
	import { fade, scale } from 'svelte/transition';
	import { profile } from '$lib/stores/user-store';
	import { Button } from '$lib/components/ui/button';
	import { goto } from '$app/navigation';
</script>

<main transition:fade={{ duration: 700 }} class="h-full w-full p-5">
	<div
		class="flex h-full w-full items-center justify-center gap-10 rounded-sm bg-gradient-to-br from-orange-600 to-orange-200 p-10 py-5 shadow shadow-black"
	>
		<div class="flex w-full flex-col items-center justify-center gap-2">
			<img
				transition:scale={{ duration: 700 }}
				src={$profile?.profile?.image}
				alt={$profile?.email}
				class="h-48 w-48 rounded-full object-cover"
			/>
			<p class="text-2xl font-bold text-black">Selamat Datang {$profile?.profile.name} 😄😄</p>
			<p class="text-sm font-semibold text-gray-800">
				Ini adalah halaman khusus yang hanya bisa diakses oleh Admin
			</p>
			<p class="text-lg font-semibold text-black">Benefit Admin :</p>
			<div class="flex w-full items-center justify-center gap-2">
				<Button
					onclick={() => goto('/dashboard/admin/category', { noScroll: true })}
					class="bg-orange-600 transition duration-700 hover:bg-orange-400">Category</Button
				>
				<Button
					onclick={() => goto('/dashboard/admin/order', { noScroll: true })}
					class="bg-orange-600 transition duration-700 hover:bg-orange-400">Order</Button
				>
			</div>
		</div>
	</div>
</main>
