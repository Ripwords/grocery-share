import { doc } from "firebase/firestore"
import type { GroceryShareUser } from "~/schema/schema"

export const useUserCode = () => {
  const user = useCurrentUser()
  const db = useFirestore()
  const userDoc = ref(doc(db, 'users', user.value!.uid))
  const userDocRef = useDocument<GroceryShareUser>(userDoc.value)
  const userCode = computed<string>(() => {
    return userDocRef.value?.code || ''
  })

  return {
    userCode
  }
}