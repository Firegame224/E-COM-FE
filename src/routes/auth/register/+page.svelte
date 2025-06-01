<script>
	// @ts-nocheck

	import toast from 'svelte-french-toast';
	import { authApi } from '$lib/providers/auth-api';
	let onChecked = false;
	let email = '';
	let password = '';

	const url = `${import.meta.env.VITE_BASE_URL}/auth/register`;
	const handleSubmit = async (event) => {
		await authApi.register(event, { email, password });
	};
</script>

<main class="flex h-screen p-10">
	<img
		src="https://assets.website-files.com/6231812313e8661d7da3a4e7/636e5602017c83966043d55f_Storyly-Blog-Cover_Online-Shopping-Personalization.webp"
		alt="yaya"
		class="h-full w-1/2 rounded-l-md object-cover shadow"
	/>
	<form
		onSubmit={handleSubmit}
		class="flex h-full w-full flex-col items-center gap-5 rounded-r-md bg-white p-14 shadow md:w-[50%]"
	>
		<div class="w-full">
			<p class="text-2xl font-bold text-orange-600">Register</p>
			<p class="text-gray-500">Daftarkan akun anda untuk akses lebih lanjut</p>
		</div>
		<hr class="my-5 w-full" />
		<div class="flex w-full flex-col gap-5">
			<div class="flex h-[75px] w-full flex-col gap-1">
				<label for="email" class="text-[15px] font-semibold">Email</label>
				<input
					bind:value={email}
					type="email"
					class="email h-full w-full rounded border p-3"
					placeholder="Masukan Email Anda"
					required
				/>
			</div>
			<div class="gap-` flex h-[75px] w-full flex-col">
				<label for="password" class="text-[15px] font-semibold">Password</label>
				<input
					bind:value={password}
					type={onChecked ? 'text' : 'password'}
					class="password h-full w-full rounded border p-3"
					placeholder="Masukan Password Anda"
					required
				/>
			</div>
			<div class="flex w-full items-center justify-start gap-2">
				<input bind:checked={onChecked} name="pw" type="checkbox" class="h-4 w-4 cursor-pointer" />
				<label for="pw">Tampilkan Kata Sandi</label>
			</div>
		</div>
		<div class="flex h-full w-full flex-col items-center justify-end gap-2">
			<button
				type="submit"
				class="h-12 w-full cursor-pointer rounded-md bg-gradient-to-br from-orange-600 to-orange-300"
			>
				Register
			</button>
			<div class="flex w-full items-center justify-center text-center">
				<p>Sudah Punya Akun?<a href="/auth/login" class="hover:underline">Login</a></p>
			</div>
		</div>
	</form>
</main>
