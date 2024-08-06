<script setup lang="ts">
import { usePost } from "@/composables/usePost";
import { useUserSession } from "@/store/useUserSession";
import { Post } from "@/types/post";
import { storeToRefs } from "pinia";

const posts = ref<Post[]>([]);

const { getAllPost } = usePost();
const userSession = useUserSession();

const { user } = storeToRefs(userSession);

function addNewPost(post: Post) {
  posts.value.push(post);
}

onMounted(async () => {
  posts.value = await getAllPost();
});
</script>

<template>
  <div>
    <nav class="flex justify-between">
      <router-link :to="{ name: 'home' }" class="font-bold text-[18px]">
        &lt;Jesus /&gt;
      </router-link>

      <LoginModal v-if="!user.isActive" />
      <PostCreateEditModal v-else @update="addNewPost" />
    </nav>
    <div class="flex flex-col gap-4 my-4">
      <template v-if="!posts.length">
        <Skeleton
          v-for="(_, index) in 10"
          :key="index"
          class="h-[200px] rounded-md"
        />
      </template>
      <template v-else>
        <PostCard v-for="post in posts" :key="post.id" :post />
      </template>
    </div>
  </div>
</template>
