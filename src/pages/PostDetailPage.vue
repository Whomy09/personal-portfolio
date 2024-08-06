<script lang="ts" setup>
import { Notyf } from "notyf";
import { Post } from "@/types/post";
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { dateFormat } from "@/helpers";
import { usePost } from "@/composables/usePost";

const route = useRoute();
const notyf = new Notyf();
const { getPostById } = usePost();

const postId = route.params.id as string;

const isLoading = ref(false);
const postContentContainer = ref<HTMLDivElement | null>(null);
const post = ref<Post>({
  id: "",
  title: "",
  createdAt: "",
  categories: [],
  description: "",
});

async function handleGetPost() {
  try {
    isLoading.value = true;
    post.value = await getPostById(postId);
  } catch (error: any) {
    notyf.error({
      message: error.message,
      duration: 5000,
    });
  } finally {
    isLoading.value = false;
  }
}

onMounted(async () => {
  await handleGetPost();

  if (postContentContainer.value) {
    postContentContainer.value.innerHTML = post.value.description;
  }
});
</script>

<template>
  <div>
    <nav class="flex justify-between">
      <router-link :to="{ name: 'home' }" class="font-bold text-[18px]">
        &lt;Jesus /&gt;
      </router-link>

      <ul class="flex gap-4 font-bold">
        <router-link :to="{ name: 'home' }" class="navbar-item"
          >Home</router-link
        >
        <router-link :to="{ name: 'blog' }" class="navbar-item"
          >Blog</router-link
        >
      </ul>
    </nav>
    <div v-if="isLoading" class="flex flex-col gap-4 mt-8">
      <Skeleton class="h-[50px] rounded-sm" />
      <div class="flex flex-col gap-2">
        <Skeleton v-for="(_, index) in 20" :key="index" class="rounded-sm h-[20px]" />
      </div>
    </div>
    <template v-else>
      <section class="mt-8">
        <header class="flex justify-between">
          <h1 class="font-bold text-2xl">{{ post.title }}</h1>
          <span>{{ dateFormat(post.createdAt) }}</span>
        </header>
      </section>
      <div ref="postContentContainer" class="mt-4 post-content-container"></div>
    </template>
  </div>
</template>
