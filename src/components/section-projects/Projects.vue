<script lang="ts" setup>
import { projects } from '@/constants'
</script>

<template>
  <section class="flex flex-col items-center mt-4" id="projects">
    <h2 class="text-[24px] font-bold">Projects</h2>


    <div class="flex flex-col lg:flex-row gap-8">
      <ProjectCard
        v-for="project in projects"
        class="mt-4 w-[321px]"
        :urlImg="project.urlImg"
        :title="project.title"
        :description="project.description"
      />
    </div>
  </section>
</template>
