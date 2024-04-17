<script lang="ts" setup>
import {
  doc,
  addDoc,
  getDoc,
  collection,
  setDoc,
  updateDoc,
} from "firebase/firestore"
import type { GroceryShareCode, GroceryShareUser } from "~/schema/schema"

definePageMeta({
  middleware: ["auth"],
})

const toast = useToast()
const copied = ref(false)

const user = useCurrentUser()

const joinCode = ref("")
const { userCode } = useUserCode()
const { approvalList, userApproved, userIsCreator, userList } =
  useGetApprovalList(userCode)

const db = useFirestore()
const codeCol = collection(db, "codes")
const codeColRef = useCollection<GroceryShareCode>(codeCol)

const copyCode = () => {
  window.navigator.clipboard.writeText(userCode.value)
  setInterval(() => {
    copied.value = false
  }, 3500)
  copied.value = true
}

const createCode = async () => {
  if (userCode.value !== "") {
    toast.add({
      severity: "error",
      summary: "You already have a code",
      detail: "You can only have one code at a time",
      life: 3500,
    })
    return
  }

  const newCode = await addDoc(codeCol, {
    users: [user.value!.uid],
  })

  updateDoc(doc(db, "users", user.value!.uid), {
    code: newCode.id,
    creator: true,
  } as GroceryShareUser)
}

const joinGroup = async () => {
  if (joinCode.value !== "") {
    // Check if code exists
    const codeDoc = doc(db, "codes", joinCode.value)
    const codeSnap = await getDoc(codeDoc)

    if (codeSnap.exists()) {
      // Add user to code's users array
      await updateDoc(doc(db, "codes", joinCode.value), {
        toBeApproved: [
          ...(codeColRef.value.find((c) => c.id === joinCode.value)!
            .toBeApproved ?? []),
          {
            id: user.value!.uid,
            email: user.value!.email,
            username: user.value!.displayName,
          },
        ],
      } as GroceryShareCode)

      // Set user's code
      await updateDoc(doc(db, "users", user.value!.uid), {
        code: joinCode.value,
        creator: false,
      } as GroceryShareUser)
    } else {
      // If code does not exist
      toast.add({
        severity: "error",
        summary: "Code does not exist",
        detail: "Please enter a valid code",
        life: 3500,
      })
      return
    }

    // If code exists, join group
    toast.add({
      severity: "success",
      summary: "Successfully applied to join group",
      detail: "Waiting for approval from list creator!",
      life: 3500,
    })
  } else {
    // If no code is entered
    toast.add({
      severity: "error",
      summary: "Please enter a code",
      detail: "You need a code to join a group",
      life: 3500,
    })
  }

  joinCode.value = ""
}

const approveUser = (toBeApproved: GroceryShareCode["toBeApproved"][0]) => {
  const codeDoc = doc(db, "codes", userCode.value)
  setDoc(codeDoc, {
    users: [
      ...codeColRef.value.find((c) => c.id === userCode.value)!.users,
      toBeApproved.id,
    ],
    toBeApproved: codeColRef.value
      .find((c) => c.id === userCode.value)!
      .toBeApproved.filter((user) => user.id !== toBeApproved.id),
  } as GroceryShareCode)
}

const removeUser = (user: GroceryShareUser) => {
  const codeDoc = doc(db, "codes", userCode.value)
  updateDoc(codeDoc, {
    users: codeColRef.value
      .find((c) => c.id === userCode.value)!
      .users.filter((u) => u !== user.id),
  } as GroceryShareCode)

  const userDoc = doc(db, "users", user.id)
  updateDoc(userDoc, {
    code: "",
    creator: false,
  } as GroceryShareUser)
}
</script>

<template>
  <div>
    <div class="my-3">
      <h1 class="my-1">Code</h1>
      <div v-if="userCode === ''">
        <Button @click="createCode"> Create New Code </Button>
        <hr />
        <Button @click="joinGroup"> Join Group </Button>
        <InputText
          v-model="joinCode"
          placeholder="Enter Code"
        />
      </div>
      <div v-else>
        <Button @click="copyCode">
          {{ copied ? "Copied!" : "Copy Code" }}
        </Button>
        <InputText
          :value="userCode"
          readonly
        />
      </div>
    </div>
    <hr />
    <div class="flex justify-center">
      <div
        v-if="userIsCreator"
        class="w-[50%]"
      >
        <LazyAccountApprovalList
          :approvalList
          @approve="approveUser"
        />
      </div>
      <div
        v-if="userApproved"
        class="w-[50%]"
      >
        <LazyAccountUserList
          :userList
          @remove-user="removeUser"
        />
      </div>
    </div>
    <div v-if="!userApproved && userCode !== ''">
      <h2>Awaiting Approval...</h2>
    </div>
  </div>
</template>
