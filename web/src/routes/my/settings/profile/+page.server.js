import { error } from '@sveltejs/kit'

export const actions = {
  updateProfile: async ({ locals, request }) => {
    const formData = await request.formData()
    const userAvatar = formData.get('avatar')

    if (userAvatar.size === 0) formData.delete('avatar')

    try {
      const { name, avatar } = await locals.pb.collection('users').update(locals?.user?.id, formData)
      locals.user.name = name
      locals.user.avatar = avatar
    } catch (err) {
      console.log('Error: ', err)
      throw error(500, 'Somethong went wrong updating your profile')
    }

    return { success: true }
  }
}