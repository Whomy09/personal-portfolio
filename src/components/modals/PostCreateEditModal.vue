<script lang="ts" setup>
import { Post } from "@/types/post";
import useVuelidate from "@vuelidate/core";
import { helpers, required } from "@vuelidate/validators";
import { Notyf } from "notyf";

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

    notyf.success("Post created successfully");
  } catch (error: any) {
    notyf.error(error.message);
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
                Create
              </Button>
            </div>
          </div>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  </div>
</template>
