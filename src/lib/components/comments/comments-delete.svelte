<script lang="ts">
	import { Trash2 } from '@lucide/svelte';
	import { Button } from '../ui/button';
	import { profile } from '$lib/stores/user-store';
	import { onMount } from 'svelte';
	import { authSession } from '$lib/helpers/auth-check';
	import Confirm from '../modals/confirm.dialog.svelte';
	import { commentApi } from '$lib/providers/comment-api';
	import { goto } from '$app/navigation';

	export let userId: string;
	export let commentId: string;
	export let productId: string;

	let isOpen = false;
	let isLoading = false;

	const deleteComment = async () => {
		try {
			await commentApi.deleteCommentById({ commentId });
			goto(`/product/${productId}`, {invalidateAll : true , noScroll : true})
		} catch (error) {
			console.log(error);
			return;
		} finally {
			isLoading = false;
			isOpen = false;
		}
	};
	onMount(async () => {
		const user = await authSession();

		profile.set(user);
	});
</script>

<Confirm bind:isOpen bind:isLoading onConfirm={deleteComment} />
{#if ($profile && $profile?.id === userId) || $profile?.role === 'ADMIN'}
	<Button
		type="button"
		onclick={() => (isOpen = true)}
		class="group bg-[#fc0b03] text-xs text-white hover:bg-red-300"
		size={'icon'}
	>
		<Trash2 className="w-4 h-4 group-hover:fill-red-300" />
	</Button>
{/if}
