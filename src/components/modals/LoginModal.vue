<script lang="ts" setup>
import { Notyf } from "notyf";
import useVuelidate from "@vuelidate/core";
import { useAuth } from "@/composables/useAuth";
import { useUserSession } from "@/store/useUserSession";
import { email, minLength, required } from "@vuelidate/validators";

const rules = {
  email: {
    required,
    email,
  },
  password: {
    required,
    minLength: minLength(7),
  },
};

const notyf = new Notyf();
const { login } = useAuth();
const userSession = useUserSession();

const entering = ref(false);
const credentials = ref({
  email: "",
  password: "",
});

const v$ = useVuelidate(rules, credentials);

async function handleLogin() {
  const formValid = await v$.value.$validate();

  if (!formValid) return;

  try {
    entering.value = true;

    const { email, password } = credentials.value;
    await login(email, password);
    userSession.setUser({
      isActive: true,
    });
    notyf.success({
      message: "Login successfully",
      duration: 5000,
    });
    credentials.value = {
      email: "",
      password: "",
    };
  } catch (error: any) {
    notyf.error({
      message: error.message,
      duration: 5000,
    });
  } finally {
    entering.value = false;
  }
}
</script>

<template>
  <div>
    <AlertDialog>
      <AlertDialogTrigger as-child>
        <Button><i class="fa-solid fa-user"></i></Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Login</AlertDialogTitle>
        </AlertDialogHeader>
        <div>
          <div>
            <label>Email</label>
            <Input v-model="credentials.email" type="text" />
            <ValidateLabel :v$="v$.email" />
          </div>
          <div>
            <label>Password</label>
            <Input v-model="credentials.password" type="password" />
            <ValidateLabel :v$="v$.password" />
          </div>
          <div class="flex gap-4 justify-end mt-12">
            <AlertDialogCancel
              class="font-bold transition duration-500 bg-red-500 text-white hover:bg-red-600 hover:text-white"
              >Cancel</AlertDialogCancel
            >
            <Button
              class="font-bold transition duration-500 text-white hover:text-white"
              @click="handleLogin"
            >
              {{ entering ? "Loading..." : "Login" }}
            </Button>
          </div>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  </div>
</template>
