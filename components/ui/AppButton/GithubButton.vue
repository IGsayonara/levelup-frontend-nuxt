<template>
  <AppButton
    primary-color="var(--strong)"
    class="github-button"
    secondary-color="var(--body);"
    @click="redirectToGithub"
  >
    View on Github
  </AppButton>
</template>

<script setup lang="ts">
import AppButton from '~/components/ui/AppButton/index.vue'

declare type Props = {
  repositoryLink: string
}

const props = defineProps<Props>()

const redirectToGithub = () => {
  window.open(
    props.repositoryLink || 'https://github.com/IGsayonara/levelup-frontend',
    '_blank',
  )
}
</script>

<style scoped></style>
