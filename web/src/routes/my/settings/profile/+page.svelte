<script>
	import { enhance, applyAction } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
	import { Icon, Pencil } from 'svelte-hero-icons';
	import { getImageURL } from '$lib/utils';
	import { Input } from '$lib/components';

	export let data;
	let loading;
	$: loading = false;

	const showPreview = (e) => {
		const files = e.target.files;

		if (files.length > 0) {
			const src = URL.createObjectURL(files[0]);
			const preview = document.getElementById('avatar-preview');
			preview.src = src;
		}
	};

	const submitUpdateProfile = () => {
		loading = true;
		return async ({ result }) => {
			switch (result) {
				case 'success':
					await invalidateAll();
					break;
				default:
					await applyAction(result);
			}
			loading = false;
		};
	};
</script>

<div class="flex flex-col w-full h-full">
	<h3 class="text-3xl font-medium my-3">Update profile</h3>

	<form
		action="?/updateProfile"
		method="post"
		enctype="multipart/form-data"
		class="flex flex-col space-y-2 w-full"
		use:enhance={submitUpdateProfile}
	>
		<div class="form-control w-full max-w-md">
			<label for="avatar" class="label font-medium pb-1">
				<span class="label-text">Profile picture</span>
			</label>
			<label for="avatar" class="avatar w-32 rounded-full cursor-pointer">
				<label for="avatar" class="absolute -bottom-0.5 -right-0.5 cursor-pointer">
					<span class="btn btn-circle btn-sm btn-secondary">
						<Icon src={Pencil} class="w-4 h-4" />
					</span>
				</label>
				<div class="w-32 rounded-full">
					<img
						alt="User avatar"
						id="avatar-preview"
						src={data.user?.avatar
							? getImageURL(data.user?.collectionId, data.user?.id, data.user?.avatar)
							: `https://ui-avatars.com/api/?name=${data.user?.name}`}
					/>
				</div>
			</label>
			<input type="file" name="avatar" id="avatar" accept="image/*" hidden on:change={showPreview} disabled={loading} />
		</div>
		<Input id="name" label="Name" value={data?.user?.name} disabled={loading} />
		<div class="w-full max-w-lg pt-2">
			<button class="btn btn-primary w-full max-w-lg" disabled={loading}> Update profile </button>
		</div>
	</form>
</div>
