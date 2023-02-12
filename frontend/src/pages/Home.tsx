import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("/api/posts", {
      method: "get",
    })
      .then((res) => {
        if (res.ok) return res.json();
        return Promise.reject(res.json());
      })
      .then((res) => {
        setPosts(res);
      })
      .catch(async (err) => {
        const error = await err;
        toast.error(error.message);
      });
  }, []);

  return (
    <section>
      <h2>There are {posts.length} posts:</h2>
      <ul>
        {posts.map((post: any) => (
          <li key={post._id}>{post.text}</li>
        ))}
      </ul>
    </section>
  );
}
