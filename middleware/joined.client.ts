import { doc, getDoc } from "firebase/firestore"
import type { GroceryShareCode } from "~/schema/schema"

export default defineNuxtRouteMiddleware(async () => {
  const db = useFirestore()
  const user = await getCurrentUser()
  const userDoc = doc(db, 'users', user.uid)
  const userSnap = await getDoc(userDoc)
  const userData = userSnap.data()

  const codeDoc = userData?.code ? doc(db, 'codes', userData?.code) : null
  const codeSnap = codeDoc ? await getDoc(codeDoc) : null
  const codeData = codeSnap ? codeSnap.data() : null

  const userApproved = !codeData?.toBeApproved?.find((obj: GroceryShareCode['toBeApproved'][0]) => obj.id === user.uid)

  const nuxtApp = useNuxtApp();
  const getToast: typeof useToast = () => nuxtApp.vueApp.config.globalProperties.$toast
  const toast = getToast()

  if (userData) {
    if ((userData.code && !userApproved) || !userData.code) {
      toast.removeAllGroups()
      toast.add({
        severity: 'info',
        summary: 'Attention!',
        detail: 'Please create or join a group to start using Grocery Share',
        life: 10000
      })
      return navigateTo({
        path: '/account/profile',
      })
    }
  } else {
    return navigateTo({
      path: '/',
      query: {
        redirect: window.location.pathname,
      },
    })
  }
})