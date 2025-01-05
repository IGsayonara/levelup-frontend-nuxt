<template>
  <div class="skill-card">
    <h4 class="skill-card__title">
      {{ skill.title }}
    </h4>
  </div>
</template>

<script setup lang="ts">
import type { Skill } from '~/types/skill'

defineOptions({
  name: 'SkillCard',
})

interface Props {
  skill: Skill
}

defineProps<Props>()
</script>

<style scoped lang="scss">
.skill-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 7rem;
  padding: 2em 1.5em;
  border: 1px solid var(--border);
  border-radius: 4rem;
  background-color: var(--body);;
  transition: all 0.3s ease-in;
  cursor: pointer;

  &__title {
    width: 100%;
    font-weight: 500;
    transition: all 0.3s ease-in;
  }

  &:hover {
    border-color: var(--highlight);
    filter: drop-shadow(1px 1px 6px var(--highlight));
  }
  &:hover & {
    &__title {
      //color: var(--highlight);
    }
  }
}
</style>
