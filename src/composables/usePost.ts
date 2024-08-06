import { db } from "@/servicies/firebase";
import { Post } from "@/types/post";
import { addDoc, collection, getDoc, getDocs, doc } from "firebase/firestore";

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

  async function getPostById(id: string) {
    const docRef = doc(db, "posts", id);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists) throw new Error("Post not exist");
    return {
      id,
      ...docSnap.data(),
    } as Post;
  }

  return {
    createPost,
    getAllPost,
    getPostById
  };
};
