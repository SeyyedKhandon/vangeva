import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";
import Loading from "../components/Loading";
import { Post } from "../types";

export default function Home() {
  const { data, isError, isLoading, error } = useQuery<Post[], Error>({
    queryKey: ["/api/posts"],
    queryFn: () => axios.get("/api/posts").then((res) => res.data),
  });

  if (isLoading) return <Loading/>
  if (isError) {
    toast.error(error.message);
    return <div>Please Refresh the page</div>;
  }

  return (
    <section>
      <h2>There are {data.length} posts:</h2>
      <ul>
        {data.map((post: any) => (
          <li key={post._id}>{post.text}</li>
        ))}
      </ul>
    </section>
  );
}
