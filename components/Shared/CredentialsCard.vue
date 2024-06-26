<script lang="ts" setup>
interface CredentialProps {
  type: "login" | "register" | "forgot"
  loading?: boolean
}

const props = withDefaults(defineProps<CredentialProps>(), {
  loading: false,
})
const emits = defineEmits(["login", "register", "forgot"])
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

const { enter } = useMagicKeys()

watch(enter, () => {
  if (props.type === "login") {
    emits("login")
  } else if (props.type === "register") {
    emits("register")
  } else {
    emits("forgot")
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
      <Card class="w-[95%]">
        <template #header>
          <img
            src="/img/icons/apple-splash-1136-640.jpg"
            alt="logo"
            loading="lazy"
            width="500"
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
              <InputGroup
                v-if="props.type === 'login' || props.type === 'register'"
              >
                <InputGroupAddon>
                  <Icon name="ph:password-duotone" />
                </InputGroupAddon>
                <Password
                  v-model="password"
                  :disabled="loading"
                  :feedback="props.type === 'register'"
                  :autocomplete="
                    props.type === 'register'
                      ? 'new-password'
                      : 'current-password'
                  "
                  placeholder="Password"
                  toggle-mask
                />
              </InputGroup>

              <!-- CONFIRM PASSWORD -->
              <InputGroup v-if="props.type === 'register'">
                <InputGroupAddon>
                  <Icon name="ph:password-duotone" />
                </InputGroupAddon>
                <Password
                  v-model="confirmPassword"
                  :disabled="loading"
                  :feedback="false"
                  placeholder="Confirm Password"
                  toggle-mask
                />
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

          <div v-else-if="props.type === 'register'">
            <div class="flex justify-center">
              <Button
                :disabled="loading"
                type="submit"
                label="Register"
                @click="emits('register')"
              />
            </div>
          </div>

          <div v-else>
            <div class="flex justify-center">
              <Button
                :disabled="loading"
                type="submit"
                label="Send Reset Email"
                @click="emits('forgot')"
              />
            </div>
          </div>
          <small
            v-if="props.type === 'login'"
            class="flex justify-end mt-5 -mb-3 -mr-2"
          >
            Forgot Password?&nbsp;
            <a
              class="cursor-pointer underline text-blue-500 hover:text-blue-700"
              @click="router.push('/auth/forgot')"
              >Reset here</a
            >
          </small>
          <small
            v-else
            class="flex justify-end mt-5 -mb-3 -mr-2"
          >
            Already have an account?&nbsp;
            <a
              class="cursor-pointer underline text-blue-500 hover:text-blue-700"
              @click="router.push('/auth/login')"
              >Login here</a
            >
          </small>
        </template>
      </Card>
    </div>
  </div>
</template>
