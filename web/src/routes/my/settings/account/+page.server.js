import { error } from '@sveltejs/kit'

export const actions = {
  updateEmail: async ({ locals, request }) => {
    const body = Object.fromEntries(await request.formData())

    try {
      await locals.pb.collection('users').requestEmailChange(body.email)
    } catch (err) {
      throw error(err.status, err.message)
    }

    return { success: true }
  },

  updateUsername: async ({ request, locals }) => {
    const body = Object.fromEntries(await request.formData())

    try {
      await locals.pb.collection('users').getFirstListItem(`username = "${body.username}"`)
    } catch (err) {
      if (err.status === 404) {
        try {
          const { username } = await locals.pb.collection('users').update(locals.user.id, { username: body.username })
          locals.user.username = username
          return { success: true }
        } catch (err) {
          console.log('Error: ', err)
          throw error(err.status, err.message)
        }
      }
      console.log('Error: ', err)
      throw error(err.status, err.message)
    }

    return { success: true }
  }
}