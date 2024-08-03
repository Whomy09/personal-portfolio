<template>
  <div>
    <nav class="flex justify-between">
      <router-link :to="{ name: 'home' }" class="font-bold text-[18px]">
        &lt;Jesus /&gt;
      </router-link>
      <div class="flex gap-4">
        <Button>Reload posts</Button>
        <Button>New post</Button>
      </div>
    </nav>
  </div>
</template>
