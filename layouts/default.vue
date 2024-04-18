<script lang="ts" setup>
import { signOut } from "firebase/auth"

const auth = useFirebaseAuth()
const user = useCurrentUser()
const router = useRouter()

const sidebar = ref(false)
const changeRoute = async (route: string) => {
  await router.push(route)
  sidebar.value = false
}

const menuItems = ref([
  {
    label: "Home",
    items: [
      {
        label: "Grocery List",
        icon: "pi pi-fw pi-list",
        command: async () => {
          await changeRoute("/home/grocery-list")
        },
      },
      {
        label: "Grocery Manager",
        icon: "pi pi-fw pi-pen-to-square",
        command: async () => {
          await changeRoute("/home/grocery-manager")
        },
      },
    ],
  },
  {
    label: "Account",
    items: [
      {
        label: "Profile",
        icon: "pi pi-fw pi-user",
        command: async () => {
          await changeRoute("/account/profile")
        },
      },
      {
        label: "Sign Out",
        icon: "pi pi-fw pi-sign-out",
        command: () => {
          sidebar.value = false
          signOut(auth!)
        },
      },
    ],
  },
])
</script>

<template>
  <div>
    <Toolbar v-if="user">
      <template #start>
        <Avatar
          image="/img/icon.png"
          size="large"
          shape="circle"
          @click="router.push('/home/grocery-list')"
        />
      </template>
      <template #center>
        <h1 class="mr-2 bold">Grocery Share</h1>
      </template>
      <template #end>
        <!-- Logged In -->
        <LazySidebar v-model:visible="sidebar">
          <template #container>
            <Toolbar>
              <template #center>
                <h1 class="mr-2 bold">Grocery Share</h1>
                <Avatar
                  image="/img/icon.png"
                  size="large"
                  shape="circle"
                  @click="router.push('/home/grocery-list')"
                />
              </template>
            </Toolbar>
            <Menu :model="menuItems" />
          </template>
        </LazySidebar>

        <Button @click="sidebar = !sidebar">
          <Icon name="ph:list-bold" />
        </Button>
      </template>
    </Toolbar>
    <Toolbar v-else>
      <template #center>
        <h1 class="mr-2 bold">Grocery Share</h1>
        <Avatar
          image="/img/icon.png"
          size="large"
          shape="circle"
          @click="changeRoute('/home/grocery-list')"
        />
      </template>
    </Toolbar>
    <slot />
  </div>
</template>
