<script lang="ts" setup>
defineProps({
  urlImg: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <Card class="cursor-pointer hover:scale-[1.01] transition ease-in-out duration-300">
    <CardHeader class="p-0">
      <img
        :src="urlImg"
        alt="img"
        class="rounded-t-lg border-b border-slate-200"
      />
    </CardHeader>
    <CardContent class="px-4 pt-2">
      <span class="text-[12px] font-bold md:text-[14px]">{{ title }}</span>

      <p class="text-[12px] md:text-[14px]">{{ description }}</p>
    </CardContent>
  </Card>
</template>
