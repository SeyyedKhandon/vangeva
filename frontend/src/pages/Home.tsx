import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";
import Loading from "../components/Loading";
import PostPreview from "../components/PostPreview";
import { Post } from "../types";

export default function Home() {
  const { data, isError, isLoading, error } = useQuery<Post[], Error>({
    queryKey: ["/api/posts"],
    queryFn: () => axios.get("/api/posts").then((res) => res.data),
  });

  if (isLoading) return <Loading />;
  if (isError) {
    toast.error(error.message);
    return <div>Please Refresh the page</div>;
  }

  return (
    <section className="mx-4">
      <h2>There are {data.length} posts:</h2>

      {data.map((post: any) => (
        <PostPreview key={post._id} post={post} />
      ))}
    </section>
  );
}
