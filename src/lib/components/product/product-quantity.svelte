<script lang="ts">
	import { Minus, Plus } from '@lucide/svelte';
	import { Button } from '../ui/button';

    export let quantity : number;
    export let stok : number ;
    const plus = () => {
        quantity ++
    }

    const minus = () => {
        quantity --
    }
</script>

<div class="flex w-[150px] justify-between border border-gray-500">
	<Button
    disabled={quantity <= 1 || stok <= 0}
    onclick={minus}
    class="group rounded-none border border-r-gray-500 bg-transparent hover:bg-transparent">
		<Minus class="h-4 w-4 text-gray-500 group-hover:text-orange-600" />
	</Button>
	<div class="flex w-full items-center justify-center text-orange-600">
		<p>{quantity}</p>
	</div>
	<Button
    disabled={quantity >= 5 || stok <= 0 || quantity === stok} 
    onclick={plus}
    class="group rounded-none border border-l-gray-500 bg-transparent hover:bg-transparent">
		<Plus class="h-4 w-4 text-gray-500 group-hover:text-orange-600" />
	</Button>
</div>
