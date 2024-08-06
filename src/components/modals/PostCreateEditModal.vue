<script lang="ts" setup>
import { Notyf } from "notyf";
import { Post } from "@/types/post";
import useVuelidate from "@vuelidate/core";
import { usePost } from "@/composables/usePost";
import { helpers, required } from "@vuelidate/validators";

const categories = ["JavaScript", "TypeScript", "Node.js"];

const rules = {
  title: {
    required,
  },
  description: {
    required,
  },
  categories: {
    minLength: helpers.withMessage(
      "You must choose at least 1 category",
      (categories: string[]) => categories.length > 0
    ),
  },
};

const notyf = new Notyf();

const category = ref("");
const isLoading = ref(false);
const post = ref<Post>({
  title: "",
  categories: [],
  description: "",
  createdAt: new Date().toISOString(),
});

const { createPost } = usePost();
const v$ = useVuelidate(rules, post);

function addCategory() {
  if (!category.value) return;
  post.value.categories.push(category.value);
  category.value = "";
}

async function onSubmit() {
  const formValid = await v$.value.$validate();

  if (!formValid) return;

  try {
    isLoading.value = true;

    await createPost(post.value);

    post.value = {
      title: "",
      categories: [],
      description: "",
      createdAt: new Date().toISOString(),
    };

    v$.value.$reset();
    notyf.success("Post created successfully");
  } catch (error: any) {
    notyf.error({
      message: error.message,
      duration: 5000,
    });
  } finally {
    isLoading.value = false;
  }
}
</script>

<template>
  <div>
    <AlertDialog>
      <AlertDialogTrigger as-child>
        <Button>New post</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Create Post</AlertDialogTitle>
        </AlertDialogHeader>
        <div>
          <div class="flex flex-col gap-4">
            <div>
              <label>Title</label>
              <Input type="text" v-model="post.title" />
              <ValidateLabel :v$="v$.title" />
            </div>
            <div>
              <label>Description</label>
              <QuillEditor
                v-model:content="post.description"
                theme="snow"
                toolbar="minimal"
                content-type="html"
              />
              <ValidateLabel :v$="v$.description" />
            </div>
            <div>
              <div class="flex items-end gap-4">
                <div class="w-[70%]">
                  <lable>Categories</lable>
                  <Select v-model="category">
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Categories</SelectLabel>
                        <SelectItem
                          v-for="category in categories"
                          :value="category"
                        >
                          {{ category }}
                        </SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                <Button
                  class="flex gap-2 font-bold w-[30%]"
                  @click="addCategory"
                >
                  <i class="fa-solid fa-plus"></i>
                  Category
                </Button>
              </div>
              <ValidateLabel :v$="v$.categories" />
              <div class="flex gap-2 mt-4">
                <Badge v-for="category in post.categories">
                  {{ category }}
                </Badge>
              </div>
            </div>

            <div class="flex justify-end gap-4 mt-16">
              <AlertDialogCancel
                class="font-bold transition duration-500 bg-red-500 text-white hover:bg-red-600 hover:text-white"
                >Cancel</AlertDialogCancel
              >
              <Button
                class="font-bold transition duration-500 bg-green-500 text-white hover:bg-green-600 hover:text-white"
                @click="onSubmit"
              >
                {{ isLoading ? "Loading..." : "Create" }}
              </Button>
            </div>
          </div>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  </div>
</template>
