<script>
	import { enhance } from '$app/forms';
	import { Input, Textarea } from '$lib/components';
	
	export let form;
</script>

<div class="flex flex-col w-full h-full">
	<h2 class="mt-2 text-center text-3xl font-bold tracking-tight text-base-content">Tell us more about this project</h2>
	<p class="text-center mt-1 mb-4">We'll need the name, tagline, link and description</p>
	<form
		action="?/createProject"
		method="post"
		class="flex flex-col space-y-2 w-full items-center"
		enctype="multipart/form-data"
		use:enhance
	>
		<Input id="name" label="Project name" value={form?.data?.name ?? '' } errors={form?.errors?.name} />
		<Input id="tagline" label="Project tagline" value={form?.data?.tagline ?? ''} errors={form?.errors?.tagline} />
		<Input id="url" label="Project URL" value={form?.data?.tagline ?? ''} errors={form?.errors?.tagline} />
		<Textarea id="description" label="Project description" value={form?.data?.description ?? ''} errors={form?.errors?.description} />
		<Input id="thumbnail" type="file" label="Thumbnail" errors={form?.errors?.thumbnail} />
		<div class="w-full max-w-lg pt-3">
			<button class="btn btn-primary w-full">Create project</button>
		</div>
	</form>
</div>
