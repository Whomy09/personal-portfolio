<script setup lang="ts">
defineProps<{
  v$: Record<string, any> | undefined
}>()
</script>

<template>
  <div v-if="v$">
    <span v-for="error in v$.$errors" :key="error.$uid" class="text-red-500 text-sm">
      {{ error.$message }}
    </span>
  </div>
</template>
