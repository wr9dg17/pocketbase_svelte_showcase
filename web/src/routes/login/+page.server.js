import { error, redirect, fail } from '@sveltejs/kit';
import { validateFormData } from '$lib/utils';
import { loginUserSchema } from '$lib/schemas';

export const actions = {
	login: async ({ locals, request }) => {
		const { formData, errors } = validateFormData(await request.formData(), loginUserSchema);

		if (errors) {
			return fail(400, {
				data: formData,
				errors
			});
		}

		try {
			await locals.pb.collection('users').authWithPassword(formData.email, formData.password);
		} catch (err) {
			console.log('Error: ', err);
			throw error(500, 'Somethong went wrong logging in');
		}

		throw redirect(303, '/');
	}
};
