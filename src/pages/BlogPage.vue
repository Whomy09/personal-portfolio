<script setup lang="ts">
import { useUserSession } from "@/store/useUserSession";
import { Post } from "@/types/post";
import { storeToRefs } from "pinia";

const posts: Post[] = [
  {
    id: "1",
    title: "Understanding JavaScript Closures",
    createdAt: new Date("2024-01-15T10:30:00Z").toISOString(),
    description:
      "A deep dive into the concept of closures in JavaScript, how they work, and practical examples.",
    categories: ["JavaScript", "Programming", "Web Development"],
  },
  {
    id: "2",
    title: "Vue 3 Composition API Basics",
    createdAt: new Date("2024-02-10T14:45:00Z").toISOString(),
    description:
      "An introduction to the Composition API in Vue 3, including setup and common use cases.",
    categories: ["Vue.js", "Frontend", "JavaScript"],
  },
  {
    id: "3",
    title: "Getting Started with TypeScript",
    createdAt: new Date("2024-03-05T09:00:00Z").toISOString(),
    description:
      "A beginner-friendly guide to TypeScript, covering types, interfaces, and basic syntax.",
    categories: ["TypeScript", "Programming", "Web Development"],
  },
  {
    id: "4",
    title: "Building RESTful APIs with Node.js and Express",
    createdAt: new Date("2024-04-20T11:15:00Z").toISOString(),
    description:
      "Learn how to build robust and scalable RESTful APIs using Node.js and Express framework.",
    categories: ["Node.js", "Backend", "API"],
  },
  {
    id: "5",
    title: "Introduction to Firebase Authentication",
    createdAt: new Date("2024-05-25T16:00:00Z").toISOString(),
    description:
      "An overview of Firebase Authentication, including setup and implementation in web applications.",
    categories: ["Firebase", "Authentication", "Web Development"],
  },
];

const userSession = useUserSession();

const { user } = storeToRefs(userSession);
</script>

<template>
  <div>
    <nav class="flex justify-between">
      <router-link :to="{ name: 'home' }" class="font-bold text-[18px]">
        &lt;Jesus /&gt;
      </router-link>

      <LoginModal v-if="!user.isActive" />
      <PostCreateEditModal v-else />
    </nav>
    <div class="flex flex-col gap-4 my-4">
      <PostCard v-for="post in posts" :key="post.id" :post />
    </div>
  </div>
</template>
