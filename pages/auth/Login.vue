<script lang="ts" setup>
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth"

definePageMeta({
  alias: "/",
})

const auth = useFirebaseAuth()
const router = useRouter()
const toast = useToast()

const loading = ref(true)
const email = ref("")
const password = ref("")

const login = async () => {
  loading.value = true
  if (!email.value || !password.value) {
    toast.add({
      severity: "error",
      summary: "Please fill in all fields",
      detail: "Email and password are required",
      life: 3500,
    })
    loading.value = false
    return
  }

  signInWithEmailAndPassword(auth!, email.value, password.value)
    .then(() => {
      router.push("/home/grocery-list")
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

const loginWithGoogle = async () => {
  const provider = new GoogleAuthProvider()
  try {
    signInWithPopup(auth!, provider)
      .then(() => {
        router.push("/home/grocery-list")
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
  } catch (e) {
    console.log(e)
  }
}

onMounted(() => {
  loading.value = true
  if (auth?.currentUser) {
    router.push("/home/grocery-list")
  }

  loading.value = false
})
</script>

<template>
  <div class="flex justify-center p-5">
    <LazySharedCredentialsCard
      v-model:email="email"
      v-model:password="password"
      :loading
      type="login"
      @login="login"
    >
      <Button
        class="bg-white"
        @click="loginWithGoogle"
        ><Icon name="logos:google-icon"
      /></Button>
    </LazySharedCredentialsCard>
  </div>
</template>
