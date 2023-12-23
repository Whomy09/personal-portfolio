<script lang="ts" setup>
import { projects } from '@/constants'
</script>

<template>
  <section class="flex flex-col items-center mt-4" id="projects">
    <h2 class="text-[24px] font-bold border-b-2 border-gray-500">Projects</h2>

    <div class="flex flex-col lg:flex-row gap-8 mt-6 md:flex-wrap">
      <ProjectCard
        v-for="project in projects"
        class="w-[321px] flex-1"
        :urlImg="project.urlImg"
        :title="project.title"
        :description="project.description"
      />
    </div>
  </section>
</template>
