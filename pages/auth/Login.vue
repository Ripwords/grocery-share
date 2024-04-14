<script lang="ts" setup>
import { getRedirectResult, signInWithEmailAndPassword } from "firebase/auth"

definePageMeta({
  alias: "/",
})

const auth = useFirebaseAuth()
const router = useRouter()
const toast = useToast()

const email = ref("")
const password = ref("")

const login = async () => {
  if (!email.value || !password.value) {
    toast.add({
      severity: "error",
      summary: "Please fill in all fields",
      detail: "Email and password are required",
      life: 3500,
    })
    return
  }

  signInWithEmailAndPassword(auth!, email.value, password.value)
    .then((res) => {
      console.log(res)
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
}

onMounted(() => {
  getRedirectResult(auth!)
    .then((result) => {
      if (result?.user) {
        router.push("/main")
      }
    })
    .catch((error) => {
      console.error(error)
    })
})
</script>

<template>
  <div class="flex justify-center p-5">
    <LazySharedCredentialsCard
      v-model:email="email"
      v-model:password="password"
      type="login"
      @login="login"
    />
  </div>
</template>
