<script>
	import { enhance } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
	import { Icon, Trash } from 'svelte-hero-icons';
	import { Input, Textarea } from '$lib/components';
	import { getImageURL } from '$lib/utils';

	export let data;
	export let form;
	let loading = false;

	const submitUpdateProject = () => {
		loading = true;
		return async ({ result, update }) => {
			switch (result.type) {
				case 'success':
					await invalidateAll();
					break;
				default:
					await update();
			}
			loading = false;
		};
	};
</script>

<div class="flex flex-col w-full h-full">
	<h2 class="mt-2 text-center text-3xl font-bold tracking-tight text-base-content">Edit {data.project.name}</h2>
	<p class="text-center mt-1 mb-4">You can edit any field you want</p>
	<form
		action="?/updateProject"
		method="post"
		class="flex flex-col space-y-2 w-full items-center"
		enctype="multipart/form-data"
		use:enhance={submitUpdateProject}
	>
		<Input id="name" label="Project name" value={form?.data?.name ?? data.project.name} errors={form?.errors?.name} />
		<Input
			id="tagline"
			label="Project tagline"
			value={form?.data?.tagline ?? data.project.tagline}
			errors={form?.errors?.tagline}
		/>
		<Input id="url" label="Project URL" value={form?.data?.url ?? data.project.url} errors={form?.errors?.url} />
		<Textarea
			id="description"
			label="Project description"
			value={form?.data?.description ?? data.project.description}
			errors={form?.errors?.description}
		/>
		<div class="form-control w-full max-w-lg">
			<label for="thumbnail" class="label font-medium pb-1">
				<span class="label-text">Thumbnail</span>
			</label>
			{#if data.project.thumbnail}
				<label for="thumbnail" class="avatar w-20 cursor-pointer mb-2">
					<label for="thumbnail" class="absolute -top-1.5 -right-1.5">
						<button class="btn btn-error btn-sm btn-circle" formaction="?/deleteThumbnail">
							<Icon src={Trash} class="w-5 h-5 text-white" />
						</button>
					</label>
					<div class="w-20 rounded">
						<img
							alt={data.project.name}
							src={getImageURL(data.project.collectionId, data.project.id, data.project.thumbnail, '80x80')}
						/>
					</div>
				</label>
			{/if}
			<input type="file" name="thumbnail" id="thumbnail" class="file-input file-input-bordered w-full" />
		</div>
		<div class="w-full max-w-lg pt-3">
			<button class="btn btn-primary w-full">Update project</button>
		</div>
	</form>
</div>
