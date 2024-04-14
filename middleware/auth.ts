export default defineNuxtRouteMiddleware(async (to, _) => {
  const user = await getCurrentUser()

  if (!user) {
    return navigateTo({
      path: '/',
      query: {
        redirect: to.fullPath,
      },
    })
  }
})
