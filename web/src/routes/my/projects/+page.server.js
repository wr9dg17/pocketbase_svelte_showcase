import { redirect, error } from '@sveltejs/kit'

export const load = ({ locals }) => {
  if (!locals.pb.authStore.isValid) {
    throw redirect(303, '/login')
  }

  const getUserProjects = async (userId) => {
    try {
      return structuredClone(await locals.pb.collection('projects').getFullList(undefined, {
        filder: `user = "${userId}"`
      }))
    } catch (err) {
      console.log('Error: ', err)
      throw error(err.status, err.message)
    }
  }

  return {
    projects: getUserProjects(locals.user.id)
  }
}

export const actions = {
  deleteProject: async ({ request, locals }) => {
    const { id } = Object.fromEntries(await request.formData())

    try {
      await locals.pb.collections('projects').delete(id)
    } catch (err) {
      console.log('Error: ', err)
      throw error(err.status, err.message)
    }

    return { success: true }
  }
}