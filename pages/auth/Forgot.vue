<script lang="ts" setup>
import { sendPasswordResetEmail } from "firebase/auth"

const auth = useFirebaseAuth()
const toast = useToast()

const email = ref("")
const password = ref("")
const loading = ref(false)

const forgot = async () => {
  sendPasswordResetEmail(auth!, email.value)
    .then(() => {
      toast.add({
        severity: "success",
        summary: "Password reset email sent",
        detail: "Please check your email",
        life: 3500,
      })
    })
    .catch((error) => {
      console.error(error)
      toast.add({
        severity: "error",
        summary: FirebaseAuthErrors(error.code),
        life: 3500,
      })
    })
    .finally(() => {
      loading.value = false
    })
}
</script>

<template>
  <div class="flex justify-center p-5">
    <LazySharedCredentialsCard
      v-model:email="email"
      v-model:password="password"
      :loading
      type="forgot"
      @forgot="forgot"
    />
  </div>
</template>
