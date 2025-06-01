<script>
	import { Instagram, PhoneCall } from "@lucide/svelte";
	import { page } from '$app/stores';

	$: path = $page.url.pathname;
</script>
{#if path.startsWith('/dashboard')}{:else}
<footer
	data-sveltekit-reload
	class="mt-10 flex h-32 w-full flex-col gap-2 bg-orange-600 p-10 md:h-28 md:flex-row"
>
	<div class="flex h-full w-full flex-col gap-2">
		<div class="flex items-center gap-2">
			<PhoneCall class="w-5 h-5 text-white"/>
            <p class="text-sm text-white">
				Hubungi <a href="https://wa.me/08895762974">0889-5762-974</a>
			</p>
		</div>
        <div class="flex items-center gap-2">
			<Instagram class="w-5 h-5 text-white"/>
            <p class="text-sm text-white">
				Instagram :<a href="https://www.instagram.com/kyyntseph?igsh=MTI5NDN1MDF5bXNtYg==">kyyntseph</a>
			</p>
		</div>
	</div>
</footer>
{/if}
