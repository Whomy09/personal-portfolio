import App from "./App.vue";
import { createApp } from "vue";
import { router } from "@/router";
import { QuillEditor } from '@vueup/vue-quill'

import "@/assets/index.css";
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import 'notyf/notyf.min.css';

createApp(App)
  .use(router)
  .component("QuillEditor", QuillEditor)
  .mount("#app");
