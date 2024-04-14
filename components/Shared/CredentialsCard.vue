<script lang="ts" setup>
const props = defineProps<{
  type: "login" | "register"
}>()
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
</script>

<template>
  <div v-focustrap>
    <Card class="w-[450px]">
      <template #header>
        <img
          src="/images/icons/apple-splash-1136-640.jpg"
          alt="logo"
          loading="lazy"
        />
      </template>
      <template #title> Grocery Share </template>
      <template #content>
        <div class="flex flex-col">
          <!-- EMAIL -->
          <InputGroup>
            <InputGroupAddon>
              <Icon name="ph:envelope-duotone" />
            </InputGroupAddon>
            <InputText
              v-model="email"
              placeholder="Email"
              type="email"
              aria-describedby="email"
            />
          </InputGroup>

          <!-- PASSWORD -->
          <InputGroup>
            <InputGroupAddon>
              <Icon name="ph:password-duotone" />
            </InputGroupAddon>
            <InputText
              v-model="password"
              placeholder="Password"
              :type="showPassword ? 'text' : 'password'"
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
        </div>
      </template>
      <template #footer>
        <div
          v-if="props.type === 'login'"
          class="flex justify-center gap-4"
        >
          <Button
            type="submit"
            label="Login"
            @click="emits('login')"
          />
          <Button
            type="button"
            label="Register"
            @click="router.push('/auth/register')"
          />
        </div>

        <div v-else>
          <div class="flex justify-center">
            <Button
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
</template>
