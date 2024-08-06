import { defineStore } from "pinia";
import { useStorage } from "@vueuse/core";

export const useUserSession = defineStore("user-session", () => {
  const user = useStorage("user-personal-portfolio", {
    isActive: false,
  });

  function setUser(newUser: { isActive: boolean }) {
    user.value = newUser;
  }

  return {
    user,
    setUser
  };
});
