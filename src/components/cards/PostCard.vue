<script lang="ts" setup>
import { Post } from "@/types/post";
import { dateFormat } from "@/helpers";

const props = defineProps<{
  post: Post;
}>();

const router = useRouter();

const containerDescription = ref<HTMLDivElement | null>(null);

onMounted(() => {
  if (containerDescription.value) {
    const container = document.createElement("div");
    container.innerHTML = props.post.description;
    const firstParagrahp = container.querySelector("p");
    if (!firstParagrahp) return;
    const description = firstParagrahp.textContent?.slice(0, 200) + "...";
    const paragrahp = document.createElement("p");
    if (!description) return;
    paragrahp.textContent = description;
    containerDescription.value.innerHTML = paragrahp.outerHTML;
  }
});
</script>

<template>
  <div>
    <Card
      class="hover:cursor-pointer transform transition-transform duration-500 hover:scale-105"
      @click="router.push({ name: 'post-detail', params: { id: post.id } })"
    >
      <CardHeader>
        <CardTitle>{{ post.title }}</CardTitle>
        <span class="text-sm">{{ dateFormat(post.createdAt) }}</span>
        <CardDescription>
          <div ref="containerDescription" class="mt-4"></div>
        </CardDescription>
      </CardHeader>
      <CardFooter class="flex gap-2">
        <Badge v-for="category in post.categories" :key="category">
          {{ category }}
        </Badge>
      </CardFooter>
    </Card>
  </div>
</template>
