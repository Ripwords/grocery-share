import { collection } from "firebase/firestore"
import type { GroceryShareCode, GroceryShareUser } from "~/schema/schema"

export const useGetApprovalList = (code: ComputedRef<string>) => {
  const user = useCurrentUser()
  const db = useFirestore()

  const codeCol = collection(db, 'codes')
  const codeColRef = useCollection<GroceryShareCode>(codeCol)

  const usersCol = collection(db, 'users')
  const usersColRef = useCollection<GroceryShareUser>(usersCol)

  const userApproved = computed<boolean>(() => {
    return codeColRef.value
      .find((doc) => doc.id === code.value)?.users
      .includes(user.value!.uid) ?? false
  })

  const userIsCreator = computed<boolean>(() => {
    return userApproved.value && (usersColRef.value.find((doc) => doc.id === user.value!.uid)?.creator ?? false)
  })

  const approvalList = computed<GroceryShareCode["toBeApproved"]>(() => {
    if (!userApproved.value) return []
    return codeColRef.value.find((doc) => doc.id === code.value)?.toBeApproved || []
  })

  const userList = computed<GroceryShareUser[]>(() => {
    const usersInCode = codeColRef.value.find((doc) => doc.id === code.value)?.users || []
    return usersColRef.value.filter((doc) => usersInCode.includes(doc.id))
  })

  return {
    approvalList,
    userApproved,
    userIsCreator,
    userList
  }
}