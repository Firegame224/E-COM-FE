<script lang="ts">
	import { page } from '$app/state';
	import Profile from '$lib/components/dashboard/prof-form.svelte';
	let {stores : store} = page.data;
</script>

<div class="w-full flex flex-col p-5 h-full">
	<Profile Stores={store}/>
</div>
