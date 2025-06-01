<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';

	import { profile } from '$lib/stores/user-store';
	import { Package, Settings, ShoppingCart, Store, Tags, User } from '@lucide/svelte';
	import { Button } from '../ui/button';

	$: path = $page.url.pathname;
</script>

<nav
	class="hidden min-h-screen w-full flex-col gap-5 border-r border-black bg-gray-300 p-4 md:flex"
>
	<div class="flex w-full items-center justify-start gap-2">
		{#if $profile}
			<img
				src={$profile?.profile.image}
				alt={$profile?.id}
				class="h-15 w-15 rounded-full object-cover"
			/>
			<p class="text-[18px] font-semibold text-black">{$profile?.profile.name}</p>
		{/if}
	</div>
	<div class="flex h-full w-full flex-col gap-3">
		{#if $profile?.role === 'ADMIN'}
			<Button
				class={`${path === '/dashboard/admin' ? 'bg-orange-600 text-white' : 'bg-transparent text-orange-600'} flex w-full cursor-pointer items-center justify-start transition duration-500 hover:bg-orange-300`}
				onclick={() => goto(`/dashboard/admin`, { noScroll: true })}
			>
				<Settings class="h-5 w-5" />
				Admin
			</Button>
		{/if}
		<!-- Admin menu -->
		{#if path.startsWith('/dashboard/admin')}
			<div class="flex w-full flex-col items-end justify-center pl-5">
				<Button
					class={`${path.startsWith('/dashboard/admin/category') ? 'bg-orange-600 text-white' : 'bg-transparent text-orange-600'} flex w-full cursor-pointer items-center justify-start transition duration-500 hover:bg-orange-300`}
					onclick={() => goto(`/dashboard/admin/category`, { noScroll: true })}
				>
					<Tags class="h-5 w-5" />
					Category
				</Button>
				<Button
					class={`${path.startsWith('/dashboard/admin/order') ? 'bg-orange-600 text-white' : 'bg-transparent text-orange-600'} flex w-full cursor-pointer items-center justify-start transition duration-500 hover:bg-orange-300`}
					onclick={() => goto(`/dashboard/admin/order`, { noScroll: true })}
				>
					<ShoppingCart class="h-5 w-5" />
					Order
				</Button>
			</div>
		{/if}
		<Button
			class={`${path === '/dashboard' ? 'bg-orange-600 text-white' : 'bg-transparent text-orange-600'} flex w-full cursor-pointer items-center justify-start transition duration-500 hover:bg-orange-300`}
			onclick={() => goto('/dashboard', { noScroll: true })}
		>
			<User class="h-5 w-5" />
			Profile
		</Button>
		<Button
			class={`${path.startsWith('/dashboard/store') ? 'bg-orange-600 text-white' : 'bg-transparent text-orange-600'} flex w-full cursor-pointer items-center justify-start transition duration-500 hover:bg-orange-300`}
			onclick={() => goto(`/dashboard/store`, { noScroll: true })}
		>
			<Store class="h-5 w-5" />
			Store
		</Button>
		<Button
			class={`${path.startsWith('/dashboard/product') ? 'bg-orange-600 text-white' : 'bg-transparent text-orange-600'} flex w-full cursor-pointer items-center justify-start transition duration-500 hover:bg-orange-300`}
			onclick={() => goto(`/dashboard/product`, { noScroll: true })}
		>
			<Package class="h-5 w-5" />
			Product
		</Button>
		<Button
			class={`${path.startsWith('/dashboard/order') ? 'bg-orange-600 text-white' : 'bg-transparent text-orange-600'} flex w-full cursor-pointer items-center justify-start transition duration-500 hover:bg-orange-300`}
			onclick={() => goto(`/dashboard/order`, { noScroll: true })}
		>
			<ShoppingCart class="h-5 w-5" />
			Order
		</Button>
	</div>
</nav>
