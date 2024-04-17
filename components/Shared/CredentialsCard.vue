<script lang="ts" setup>
interface CredentialProps {
  type: "login" | "register"
  loading?: boolean
}

const props = withDefaults(defineProps<CredentialProps>(), {
  loading: false,
})
const emits = defineEmits(["login", "register"])
const router = useRouter()

const email = defineModel<string>("email", {
  required: true,
})
const password = defineModel<string>("password", {
  required: true,
})
const confirmPassword = defineModel<string>("confirmPassword")
if (props.type === "register" && confirmPassword.value === undefined) {
  throw new Error("confirmPassword is required for register")
}

const showPassword = ref(false)

const { enter } = useMagicKeys()

watch(enter, () => {
  if (props.type === "login") {
    emits("login")
  } else {
    emits("register")
  }
})
</script>

<template>
  <div>
    <ProgressBar
      mode="indeterminate"
      class="fixed top-0 left-0 w-full h-2 bg-blue-500 z-50"
      :class="{ 'opacity-0': !props.loading }"
    />
    <div v-focustrap>
      <Card class="w-[450px]">
        <template #header>
          <img
            src="/img/icons/apple-splash-1136-640.jpg"
            alt="logo"
            loading="lazy"
          />
        </template>
        <template #title> Grocery Share </template>
        <template #content>
          <div class="flex flex-col">
            <form>
              <!-- EMAIL -->
              <InputGroup>
                <InputGroupAddon>
                  <Icon name="ph:envelope-duotone" />
                </InputGroupAddon>
                <InputText
                  v-model="email"
                  :disabled="loading"
                  placeholder="Email"
                  type="email"
                  aria-describedby="email"
                  autocomplete="email"
                />
              </InputGroup>

              <!-- PASSWORD -->
              <InputGroup>
                <InputGroupAddon>
                  <Icon name="ph:password-duotone" />
                </InputGroupAddon>
                <InputText
                  v-model="password"
                  :disabled="loading"
                  placeholder="Password"
                  :type="showPassword ? 'text' : 'password'"
                  :autocomplete="
                    props.type === 'login' ? 'current-password' : 'new-password'
                  "
                />
                <InputGroupAddon>
                  <Icon
                    :name="showPassword ? 'ph:eye-slash-fill' : 'ph:eye-fill'"
                    @click="showPassword = !showPassword"
                  />
                </InputGroupAddon>
              </InputGroup>

              <!-- CONFIRM PASSWORD -->
              <InputGroup v-if="props.type === 'register'">
                <InputGroupAddon>
                  <Icon name="ph:password-duotone" />
                </InputGroupAddon>
                <InputText
                  v-model="confirmPassword"
                  :disabled="loading"
                  placeholder="Confirm Password"
                  :type="showPassword ? 'text' : 'password'"
                />
                <InputGroupAddon>
                  <Icon
                    :name="showPassword ? 'ph:eye-slash-fill' : 'ph:eye-fill'"
                    @click="showPassword = !showPassword"
                  />
                </InputGroupAddon>
              </InputGroup>
            </form>
          </div>
        </template>
        <template #footer>
          <div
            v-if="props.type === 'login'"
            class="flex justify-center gap-4"
          >
            <Button
              :disabled="loading"
              type="submit"
              label="Login"
              @click="emits('login')"
            />
            <Button
              :disabled="loading"
              type="button"
              label="Register"
              @click="router.push('/auth/register')"
            />
            <slot />
          </div>

          <div v-else>
            <div class="flex justify-center">
              <Button
                :disabled="loading"
                type="submit"
                label="Register"
                @click="emits('register')"
              />
            </div>
            <small class="flex justify-end mt-5 -mb-3 -mr-2">
              Already have an account?&nbsp;
              <a
                class="cursor-pointer underline text-blue-500 hover:text-blue-700"
                @click="router.push('/auth/login')"
                >Login here</a
              >
            </small>
          </div>
        </template>
      </Card>
    </div>
  </div>
</template>
