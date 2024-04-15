<script lang="ts" setup>
import { signOut } from "firebase/auth"

definePageMeta({
  middleware: ["auth"],
})

const auth = useFirebaseAuth()

const logout = async () => {
  await signOut(auth!)
}
</script>

<template>
  <div><Button @click="logout">Logout</Button></div>
</template>
