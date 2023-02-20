import { error, redirect, fail } from '@sveltejs/kit';
import { createProjectSchema } from '$lib/schemas';
import { validateFormData } from '$lib/utils';
import { serialize } from 'object-to-formdata';

export const load = ({ locals }) => {
	if (!locals.pb.authStore.isValid) {
		throw redirect(303, '/login');
	}
};

export const actions = {
	createProject: async ({ request, locals }) => {
		const body = await request.formData();
		body.append('user', locals.user.id);

		console.log(body);

		const thumb = body.get('thumbnail');
		if (thumb.size === 0) body.delete('thumbnail');
		body.append('user', locals.user.id);

		const { formData, errors } = validateFormData(body, createProjectSchema);
		const { thumbnail, ...rest } = formData;

		if (errors) {
			return fail(400, {
				data: rest,
				errors: errors
			});
		}

		try {
			await locals.pb.collection('projects').create(serialize(formData));
		} catch (err) {
			console.log('Error: ', err);
			throw error(err.status, err.message);
		}

		throw redirect(303, '/my/projects');
	}
};
