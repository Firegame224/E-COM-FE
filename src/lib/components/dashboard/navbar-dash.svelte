<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';

	import { profile } from '$lib/stores/user-store';
	import { Button } from '../ui/button'; 

		
	$: path = $page.url.pathname;
</script>

<nav class="w-full h-full flex-col p-4 gap-5 border-black border-r hidden md:flex ">
	<div class="w-full flex items-center gap-2 justify-start">
		{#if $profile}
			<img
				src={$profile?.profile.image}
				alt={$profile?.id}
				class="w-15 h-15 object-cover rounded-full"
			/>
			<p class="text-black font-semibold text-[18px]">{$profile?.profile.name}</p>
		{/if}
	</div>
	<div class="h-full w-full flex flex-col gap-3">
			<Button
				class={`${ path === "/dashboard" ? 'bg-gradient-to-br from-orange-600 to-orange-200 text-white' : 'bg-transparent text-orange-600'} hover:bg-orange-300 w-full flex justify-start items-center transition duration-500 cursor-pointer`}
				onclick={() => goto("/dashboard")}
			>
				Profile
			</Button>
			<Button
				class={`${path.startsWith("/dashboard/store") ? 'bg-gradient-to-br from-orange-600 to-orange-200 text-white' : 'bg-transparent text-orange-600'} hover:bg-orange-300 w-full flex justify-start items-center transition duration-500 cursor-pointer`}
				onclick={() => goto(`/dashboard/store`)}
				>
				Store
			</Button>
			<Button
				class={`${path.startsWith("/dashboard/product") ? 'bg-gradient-to-br from-orange-600 to-orange-200 text-white' : 'bg-transparent text-orange-600'} hover:bg-orange-300 w-full flex justify-start items-center transition duration-500 cursor-pointer`}
				onclick={() => goto(`/dashboard/product`)}
				>
				Product
			</Button>
	</div>
</nav>
