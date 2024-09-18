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
const username = ref('')
const password = ref('')

const authStore = useAuthStore();
const {login} = authStore
const {user} = storeToRefs(authStore);

</script>

<style scoped>
/* Add your styles here */
</style>
