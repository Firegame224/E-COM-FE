<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import { convertDate } from '$lib/helpers/date';
	import CommentsDelete from './comments-delete.svelte';

	export let comment: any[];
</script>

<div class="w-full gap-2 flex flex-col">
	{#if comment.length > 0}
		{#each comment as com}
			<Card.Root class="w-full bg-white relative">
				<Card.Content class="flex w-full gap-3">
					<div class="flex w-[10%] items-center justify-start md:w-[5%]">
						<img
							src={com.user.profile.image ||
								'https://i.pinimg.com/736x/09/7d/3c/097d3cf1d036e549d1caa10ad9268dfe.jpg'}
							alt={com.user.email}
							class="h-10 w-10 rounded-full object-cover md:h-14 md:w-14"
						/>
					</div>
					<div class="flex w-[85%] flex-col items-start">
						<div class="flex w-full gap-2">
							<p class="text-[12px] text-gray-500">
								@{com.user.profile.name ? com.user.profile.name : com.user.email}
							</p>
							<p class="text-[12px] text-gray-500">
								{convertDate({ date: com.create_at })}
							</p>
						</div>
						<div class="w-full max-w-full break-words md:max-w-[95%]">
							<p class="text-[12px] md:text-[15px]">
								{com.komentar}
							</p>
						</div>
					</div>
					<div class="w-[5%] flex items-center justify-end">
						<CommentsDelete commentId={com.id} userId={com.user_id} productId={com.product_id}/>
					</div>
				</Card.Content>
			</Card.Root>
		{/each}
	{/if}
</div>
