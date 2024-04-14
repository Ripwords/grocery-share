<script lang="ts" setup>
const email = ref('')
const password = ref('')

const login = async () => {}
</script>

<template>
  <div>
    <Card class="w-[450px]">
      <template #header>
        <h1>Grocery Share</h1>
        <img
          src="/images/icons/apple-splash-1136-640.jpg"
          alt=""
          srcset=""
        />
      </template>
      <template #title>
        Login
      </template>
      <template #content>
        <div class="flex flex-col">
          <InputGroup>
            <InputGroupAddon>
              <Icon name="ph:envelope-duotone" />
            </InputGroupAddon>
            <InputText
              :value="email"
              placeholder="email"
            />
          </InputGroup>
          <InputGroup>
            <InputGroupAddon>
              <Icon name="ph:password-duotone" />
            </InputGroupAddon>
            <InputText
              :value="password"
              placeholder="password"
            />
          </InputGroup>
        </div>
      </template>
      <template #footer>
        <Button @click="login">
          Login
        </Button>
      </template>
    </Card>
  </div>
</template>
