<script lang="ts">
	import { authSession } from '$lib/helpers/auth-check';
	import { profile } from '$lib/stores/user-store';
	import { LogIn } from '@lucide/svelte';
	import { onMount } from 'svelte';
	import ButtonDash from './dashboard/button-dash.svelte';
	import { orderApi } from '$lib/providers/order-api';
	import type { orderType } from '$lib/types/order-types';

	onMount(async () => {
		const user = await authSession();

		profile.set(user)
		
	});
</script>

<div class="flex w-full items-center justify-end gap-2 pr-5">
	{#if !$profile}
		<button
			class="flex w-[110px] rounded border border-white bg-transparent p-2 transition duration-700 hover:opacity-60"
		>
			<a href="/auth/register" class="flex w-full items-center justify-center gap-3">
				<LogIn class="h-5 w-5" />
				Register
			</a>
		</button>
		<button
			class="flex w-[110px] gap-3 rounded border border-orange-600 bg-white p-2 transition duration-700 hover:opacity-60"
		>
			<a href="/auth/login" class="flex w-full items-center justify-center gap-3">
				<LogIn class="h-5 w-5" />
				Login
			</a>
		</button>
	{:else}
		<ButtonDash profile={$profile}/>
	{/if}
</div>
 