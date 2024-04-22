import { collection } from "firebase/firestore"
import type { GroceryItemType } from "~/schema/schema"

export const useGetGroceryTypes = (code: Ref<string>) => {
  const db = useFirestore()
  const typesCol = computed(() => collection(db, 'codes', code.value, 'types'))
  const typesColRef = useCollection<GroceryItemType>(() =>
    code.value ? typesCol.value : null
  )

  return {
    groceryTypes: typesColRef
  }
}