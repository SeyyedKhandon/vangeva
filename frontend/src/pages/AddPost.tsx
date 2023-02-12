import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function AddPost() {
  const [loading, setLoading] = useState(false);
  const [token] = useState(() => localStorage.getItem("token"));
  const [post, setPost] = useState({ text: "" });

  const submitHandler = (e: any) => {
    e.preventDefault();
    setLoading(true);

    fetch("/api/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Bearer ${token}`,
      },
      body: new URLSearchParams(post),
    })
      .then((res) => {
        if (res.ok) return res.json();
        return Promise.reject(res.json());
      })
      .then((res) => {
        toast(`Post submitted! you can see it in home page!`);
      })
      .catch(async (err) => {
        const error = await err;
        toast.error(error.message);
      })
      .finally(() => setLoading(false));
  };

  if (loading) return <article aria-busy="true"></article>;

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
