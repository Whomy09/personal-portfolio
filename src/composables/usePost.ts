import { db } from "@/servicies/firebase";
import { Post } from "@/types/post";
import { addDoc, collection } from "firebase/firestore";

export const usePost = () => {
  const postsRef = collection(db, "posts");

  async function createPost(post: Post) {
    await addDoc(postsRef, post)
  }

  return {
    createPost,
  };
};
