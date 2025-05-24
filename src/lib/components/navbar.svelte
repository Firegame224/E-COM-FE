<script>
	import Session from "./session.svelte";
</script>

<nav data-sveltekit-reload class="w-full p-5 bg-gradient-to-br from-orange-600 to-orange-300 flex">
    <div class="w-1/2 flex items-center justify-start">
        <a class="text-white font-semibold text-[20px]" href="/">Kyy-Commerce</a>
    </div>
    <div class="w-1/2 items-end flex justify-end">
        <Session/>
    </div>
</nav>