import { collection } from "firebase/firestore"
import type { GroceryListItem } from "~/schema/schema"

export const useGetGroceryList = (code: Ref<string>) => {
  const db = useFirestore()
  const listCol = computed(() => collection(db, 'codes', code.value, 'list'))
  const listColRef = useCollection<GroceryListItem>(() =>
    code.value ? listCol.value : null
  )
  const groceryList = computed<typeof listColRef.value>(() => listColRef.value ?? [])

  return {
    groceryList: groceryList
  }
}