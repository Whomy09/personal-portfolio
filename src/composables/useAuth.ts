import { auth } from "@/servicies/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

export const useAuth = () => {
  async function login(email: string, password: string) {
    await signInWithEmailAndPassword(auth, email, password);
  }

  return {
    login
  }
};
