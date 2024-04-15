<script lang="ts" setup>
import { createUserWithEmailAndPassword } from "firebase/auth"

const auth = useFirebaseAuth()
const user = useCurrentUser()
const router = useRouter()
const toast = useToast()

const loading = ref(false)
const email = ref("")
const password = ref("")
const confirmPassword = ref("")

const register = async () => {
  loading.value = true
  if (!email.value || !password.value || !confirmPassword.value) {
    toast.add({
      severity: "error",
      summary: "Please fill in all fields",
      detail: "Email and password are required",
      life: 3500,
    })
    loading.value = false
    return
  } else if (password.value !== confirmPassword.value) {
    toast.add({
      severity: "error",
      summary: "Passwords do not match",
      life: 3500,
    })
    loading.value = false
    return
  }

  createUserWithEmailAndPassword(auth!, email.value, password.value)
    .then(() => {
      router.push("/main")
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

// If user exists, redirect to main page
// prevent user from accessing the register page
onMounted(() => {
  if (user.value) {
    router.push("/auth/main")
  }
})
</script>

<template>
  <div class="flex justify-center p-5">
    <LazySharedCredentialsCard
      v-model:email="email"
      v-model:password="password"
      v-model:confirmPassword="confirmPassword"
      :loading
      type="register"
      @register="register"
    />
  </div>
</template>
