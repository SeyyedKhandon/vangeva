import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import Loading from "../components/Loading";
import { Post } from "../types";

export default function AddPost() {
  const [token] = useState(() => localStorage.getItem("token"));
  const [post, setPost] = useState({ title: "", text: "" });
  const postMutation = useMutation({
    mutationFn: (post: { title: string; text: string }) =>
      axios.post<Post>("/api/posts", post, {
        headers: { Authorization: `Bearer ${token}` },
      }),
    onSuccess: () => toast(`Post submitted! you can see it in home page!`),
    onError: (error: AxiosError) =>
      toast.error(
        (error.response?.data as { message: string })?.message! || error.message
      ),
  });

  const submitHandler = (e: any) => {
    e.preventDefault();
    postMutation.mutate(post);
  };

  if (postMutation.isLoading) return <Loading />;

  return (
    <form method="post" onSubmit={submitHandler}>
      <label htmlFor="text">
        Enter your text here:
        <input
          value={post.title}
          onChange={(e) => setPost((p) => ({ ...p, title: e.target.value }))}
          name="text"
          placeholder="Enter your text"
          required
        />
      </label>
      <label htmlFor="text">
        Enter your text here:
        <textarea
          value={post.text}
          onChange={(e) => setPost((p) => ({ ...p, text: e.target.value }))}
          name="text"
          placeholder="Enter your text"
          required
        />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
}
