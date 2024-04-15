export const useAuthWatcher = () => {
  const user = useCurrentUser()
  const route = useRoute()
  const router = useRouter()

  watch(
    user,
    async (currUser, prevUser) => {
      // Redirect login, if logout & current page is protected
      if (
        !currUser &&
        prevUser &&
        (Array.isArray(route.meta.middleware)
          ? route.meta.middleware.includes("auth")
          : route.meta.middleware === "auth")
      ) {
        return router.push("/auth/login")
      }

      // Redirect to page, if user is logged in after rejection
      if (currUser && typeof route.query.redirect === "string") {
        return router.push(route.query.redirect)
      } else if (currUser) {
        return router.push("/main")
      }
    },
    { immediate: true }
  )
}