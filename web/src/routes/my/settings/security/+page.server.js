import { error, redirect, fail } from '@sveltejs/kit';
import { validateFormData } from '$lib/utils';
import { updatePasswordSchema } from '$lib/schemas';

export const load = ({ locals }) => {
	if (!locals.pb.authStore.isValid) {
		throw redirect(303, '/login');
	}
};

export const actions = {
	updatePassword: async ({ request, locals }) => {
		const { formData, errors } = validateFormData(await request.formData(), updatePasswordSchema);

		if (errors) {
			return fail(400, {
				errors
			});
		}

		try {
			await locals.pb.collection('users').update(locals.user.id, formData);
			locals.pb.authStore.clear();
		} catch (err) {
			console.log('Error: ', err);
			throw error(err.status, err.message);
		}

		throw redirect(303, '/login');
	}
};
