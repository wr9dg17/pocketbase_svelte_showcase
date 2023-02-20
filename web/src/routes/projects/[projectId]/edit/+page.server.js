import { error, redirect, fail } from '@sveltejs/kit';
import { validateFormData } from '$lib/utils';
import { updateProjectSchema } from '$lib/schemas';
import { serialize } from 'object-to-formdata';

export const load = ({ params, locals }) => {
	if (!locals.pb.authStore.isValid) {
		throw error(401, 'Unauthorized');
	}

	const getProject = async (projectId) => {
		try {
			const project = structuredClone(await locals.pb.collection('projects').getOne(projectId));

			if (locals.user.id === project.user) {
				return project;
			} else {
				throw error(403, 'Forbidden');
			}
		} catch (err) {
			console.log('Error: ', err);
			throw error(err.status, err.message);
		}
	};

	return {
		project: getProject(params.projectId)
	};
};

export const actions = {
	updateProject: async ({ request, params, locals }) => {
		const body = await request.formData();
		const thumb = body.get('thumbnail');

		if (thumb.size === 0) body.delete('thumbnail');
		const { formData, errors } = validateFormData(body, updateProjectSchema);
		const { thumbnail, ...rest } = formData;

		if (errors) {
			return fail(400, {
				data: rest,
				errors: errors
			});
		}

		try {
			await locals.pb.collection('projects').update(params.projectId, serialize(formData));
		} catch (err) {
			console.log('Error: ', err);
			throw error(err.status, err.message);
		}

		throw redirect(303, '/my/projects');
	},

	deleteThumbnail: async ({ locals, params }) => {
		try {
			await locals.pb.collection('projects').update(params.projectId, { thumbnail: null });
		} catch (err) {
			console.log('Error: ', err);
			throw error(err.status, err.message);
		}
	}
};
