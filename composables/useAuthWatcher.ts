import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore"

export const useAuthWatcher = async () => {
  const route = useRoute()
  const router = useRouter()

  const db = useFirestore()
  const currUser = useCurrentUser()

  watchOnce(currUser, async () => {
    const userDoc = doc(db, "users", currUser.value!.uid)
    const userSnap = await getDoc(userDoc)

    const userExist = userSnap.exists()

    if (!userExist) {
      await setDoc(doc(db, "users", currUser.value!.uid), {
        code: "",
        email: currUser.value!.email,
        username: currUser.value!.displayName,
      })
    } else {
      await updateDoc(userDoc, {
        email: currUser.value!.email,
        username: currUser.value!.displayName,
      })
    }
  })

  watch(
    currUser,
    async (currUser, prevUser) => {
      // Redirect to login, if logout & current page is protected
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
        return router.push("/home/grocery-list")
      }
    },
    { immediate: true }
  )
}