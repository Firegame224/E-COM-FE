<script lang="ts">
	import type { Profile } from '$lib/types/user-types';
	import * as DropdownMenu from '../ui/dropdown-menu';
	import { Button } from '../ui/button';
	import { LogOut, ShoppingCart, Store, User } from '@lucide/svelte';
	import { goto } from '$app/navigation';
	import { authApi } from '$lib/providers/auth-api';
	import OrderNotif from '../order/order-notif.svelte';

	export let profile: Profile;
	
</script>

{#if profile}
	<main class="flex h-full w-full items-center justify-end gap-3">
        <OrderNotif profile={profile}/>
		<DropdownMenu.Root>
			<DropdownMenu.Trigger>
				<Button class="h-12 w-12 cursor-pointer rounded-full p-0">
					<img
						src={profile.profile.image || 'profile'}
						alt={profile.email}
						class="h-full w-full rounded-full object-cover"
					/>
				</Button>
			</DropdownMenu.Trigger>
			<DropdownMenu.Content class="mr-10">
				<DropdownMenu.Group>
					<DropdownMenu.Label class="rounded-t-sm bg-orange-600">
						<p class="font-semibold text-white text-center">Akun Saya</p>
					</DropdownMenu.Label>
					<DropdownMenu.Separator />
					<DropdownMenu.Item class="p-0">
						<Button
							onclick={() => goto('/dashboard')}
							class="hover:bg-light-200 flex w-full cursor-pointer items-center justify-start border-none bg-transparent py-2 text-orange-600 shadow-none"
						>
							<User class="h-5 w-5 text-orange-600" />
							<p class="text-sm font-semibold">Profile</p>
						</Button>
					</DropdownMenu.Item>
					<DropdownMenu.Item class="p-0">
						<Button
							onclick={() => goto('/dashboard/store')}
							class="hover:bg-light-200 flex w-full cursor-pointer items-center justify-start border-none bg-transparent py-2 text-orange-600 shadow-none"
						>
							<Store class="h-5 w-5 text-orange-600" />
							<p class="text-sm font-semibold">Store</p>
						</Button>
					</DropdownMenu.Item>
					<DropdownMenu.Item class="p-0">
						<Button
							onclick={() => goto('/dashboard/order')}
							class="hover:bg-light-200 flex w-full cursor-pointer items-center justify-start border-none bg-transparent py-2 text-orange-600 shadow-none"
						>
							<ShoppingCart class="h-5 w-5 text-orange-600" />
							<p class="text-sm font-semibold">Order</p>
						</Button>
					</DropdownMenu.Item>
					<DropdownMenu.Separator />
					<DropdownMenu.Item class="p-0">
						<Button
							onclick={() => authApi.logOut()}
							class="hover:bg-light-200 flex w-full cursor-pointer items-center justify-start border-none bg-transparent py-2 text-orange-600 shadow-none"
						>
							<LogOut class="h-5 w-5 text-orange-600" />
							<p class="text-sm font-semibold">Logout</p>
						</Button>
					</DropdownMenu.Item>
				</DropdownMenu.Group>
			</DropdownMenu.Content>
		</DropdownMenu.Root>
	</main>
{:else}
	<div class="h-12 w-12 animate-pulse cursor-pointer rounded-full bg-gray-500 p-0">
		<div class="h-full w-full rounded-full bg-gray-500 object-cover"></div>
	</div>
{/if}
