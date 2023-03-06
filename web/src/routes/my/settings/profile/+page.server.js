import { redirect, error, fail } from '@sveltejs/kit';
import { serialize } from 'object-to-formdata';
import { validateFormData } from '$lib/utils';
import { updateProfileSchema } from '$lib/schemas';

export const load = ({ locals }) => {
	if (!locals.pb.authStore.isValid) {
		throw redirect(303, '/login');
	}
};

export const actions = {
	updateProfile: async ({ locals, request }) => {
		const body = await request.formData();
		const userAvatar = body.get('avatar');

		if (userAvatar.size === 0) body.delete('avatar');

		const { formData, errors } = validateFormData(body, updateProfileSchema);
		const { avatar, ...rest } = formData;

		if (errors) {
			return fail(400, {
				data: formData,
				errors
			});
		}

		try {
			const { name, avatar } = await locals.pb.collection('users').update(locals?.user?.id, serialize(formData));
			locals.user.name = name;
			locals.user.avatar = avatar;
		} catch (err) {
			console.log('Error: ', err);
			throw error(500, 'Somethong went wrong updating your profile');
		}

		return { success: true };
	}
};
