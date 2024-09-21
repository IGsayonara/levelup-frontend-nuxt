<template>
  <div id="app">
    <form @submit.prevent="login(username, password)">
      <input v-model="username" placeholder="Username" />
      <input v-model="password" placeholder="Password" type="password" />
      <button type="submit">Log In</button>
    </form>
    <div>{{user}}</div>
 </div>
</template>

<script setup>

import {useAuthStore} from "~/stores/auth.store";

const router = useRouter();
const authStore = useAuthStore();
const {login} = authStore
const {user} = storeToRefs(authStore);

const username = ref('')
const password = ref('')
const unwatch = watch(() => !!user.value, () => {
  if(!!user.value){
    router.push('/')
  }
})
onUnmounted(()=> {
  unwatch()
})


</script>

<style scoped>
/* Add your styles here */
</style>
