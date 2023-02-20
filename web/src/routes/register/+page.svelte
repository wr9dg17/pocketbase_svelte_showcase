<script>
	import { Input } from '$lib/components';

	export let form;
</script>

<div class="flex flex-col items-center h-full w-full">
	<h2 class="mt-2 text-center text-3xl font-bold tracking-tight text-base-content">Register for an account</h2>
	<p class="text-center mt-1 mb-4">
		Or <a href="/login" class="text-primary font-medium hover:cursor-pointer hover:underline">sign in</a> if you already
		have an account.
	</p>
	<form action="?/register" method="post" class="flex flex-col items-center space-y-2 w-full max-w-md">
		<Input id="name" label="Name" value={form?.data?.name ?? ''} errors={form?.errors?.name} />
		<Input id="email" type="email" label="Email" value={form?.data?.email ?? ''} errors={form?.errors?.email} />
		<Input id="password" type="password" label="Password" errors={form?.errors?.password} />
		<Input id="passwordConfirm" type="password" label="Confirm Password" errors={form?.errors?.passwordConfirm} />
		<div class="w-full max-w-md pt-2">
			<button type="submit" class="btn btn-primary w-full">Register</button>
		</div>
	</form>
</div>
