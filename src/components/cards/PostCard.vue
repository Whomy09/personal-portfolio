<script lang="ts" setup>
import { Post } from "@/types/post";
import { dateFormat } from "@/helpers";

defineProps<{
  post: Post;
}>();
</script>

<template>
  <div>
    <Card
      class="hover:cursor-pointer transform transition-transform duration-500 hover:scale-105"
    >
      <CardHeader>
        <CardTitle>{{ post.title }}</CardTitle>
        <span class="text-sm">{{ dateFormat(post.createdAt) }}</span>
        <CardDescription>{{ post.description }}</CardDescription>
      </CardHeader>
      <CardFooter class="flex gap-2">
        <Badge v-for="category in post.categories" :key="category">
          {{ category }}
        </Badge>
      </CardFooter>
    </Card>
  </div>
</template>
