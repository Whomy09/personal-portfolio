import { db } from "@/servicies/firebase";
import { Post } from "@/types/post";
import { addDoc, collection, getDocs } from "firebase/firestore";

export const usePost = () => {
  const postsRef = collection(db, "posts");

  async function createPost(post: Post) {
    const doc = await addDoc(postsRef, post);
    return {
      id: doc.id,
      ...post,
    };
  }

  async function getAllPost() {
    const { docs } = await getDocs(postsRef);
    return docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Post[];
  }

  return {
    createPost,
    getAllPost,
  };
};
