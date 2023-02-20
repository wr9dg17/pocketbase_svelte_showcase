import { error } from '@sveltejs/kit'

export const load = ({ params, locals }) => {
  const getProject = async (projectId) => {
    try {
      return structuredClone(await locals.pb.collection('projects').getOne(projectId))
    } catch (err) {
      console.log('Error: ', err)
      throw error(err.status, err.message)
    }
  }

  return {
    project: getProject(params.projectId)
  }
}