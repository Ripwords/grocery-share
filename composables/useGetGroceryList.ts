import { doc } from "firebase/firestore"
import type { GroceryList, GroceryShareCode } from "~/schema/schema"

export const useGetGroceryList = (code: Ref<string>) => {
  const db = useFirestore()
  const listDoc = computed(() => doc(db, 'codes', code.value))
  const listDocRef = useDocument<GroceryShareCode>(() =>
    code.value ? listDoc.value : null
  )

  const groceryList = computed<GroceryList>(() => listDocRef.value?.list ?? [])

  return {
    groceryList: groceryList
  }
}