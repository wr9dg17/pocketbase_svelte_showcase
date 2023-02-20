<script>
	import { enhance } from '$app/forms';
	import { getImageURL } from '$lib/utils';
	import { Modal } from '$lib/components';

	export let project;
	let isModalOpen;

	$: isModalOpen = false;
</script>

<div class="w-full flex items-center justify-between">
	<div class="avatar">
		<div class="w-20 rounded">
			<img
				alt={project?.name}
				src={project?.thumbnail
					? getImageURL(project.collectionId, project.id, project.thumbnail, '80x80')
					: `https://via.placeholder.com/80/4506CB/FFFFFF/?text=${project.name}`}
			/>
		</div>
	</div>
	<div class="flex flex-col w-full ml-4 h-full justify-center">
		<a href="/projects/{project.id}" class="font-semibold text-lg">{project.name}</a>
		<p>{project.tagline}</p>
	</div>
	<div class="flex items-center justify-end w-full">
		<a href="/projects/{project.id}/edit" class="btn btn-outline">Edit project</a>
		<Modal name={project.id} title="Delete {project.name}" open={isModalOpen}>
			<span slot="trigger" class="btn btn-error ml-2">Delete</span>
			<p class="text-base text-center">Are you sure you want to delete this project?</p>
			<div slot="actions" class="flex space-x-2">
				<label for={project.id} class="btn btn-outline">Cancel</label>
				<form action="?/deleteProject" method="post" use:enhance>
					<input type="hidden" name="id" value={project.id} />
          <button class="btn btn-error">Delete</button>
				</form>
			</div>
		</Modal>
	</div>
</div>
