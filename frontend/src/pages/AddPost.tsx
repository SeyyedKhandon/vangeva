import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Loading from "../components/Loading";
import { Post } from "../types";

export default function AddPost() {
  const [token] = useState(() => localStorage.getItem("token"));
  const [post, setPost] = useState({ text: "" });
  const postMutation = useMutation({
    mutationFn: (post: { text: string }) =>
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
        <textarea
          value={post.text}
          onChange={(e) => setPost({ text: e.target.value })}
          name="text"
          placeholder="Enter your text"
          required
        />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
}
