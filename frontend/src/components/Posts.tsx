import { useMutation, useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";
import Loading from "../components/Loading";
import PostPreview from "./PostPreview";
import { Post } from "../types";

export default function Posts({
  url,
  isProtected = false,
}: {
  url: string;
  isProtected: boolean;
}) {
  const authHeader = {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  };
  const { data, isError, isLoading, error } = useQuery<Post[], Error>({
    queryKey: [url],
    queryFn: () =>
      axios
        .get(url, {
          headers: isProtected ? authHeader : {},
        })
        .then((res) => res.data),
  });
  const { mutate: deletePost } = useMutation({
    mutationFn: (id: string) =>
      axios.delete(`/api/posts/${id}`, {
        headers: authHeader,
      }),
    onSuccess: ({ data }) => {
      toast(`${data.title} has been removed!`);
    },
    onError: (error: AxiosError) =>
      toast.error(
        (error.response?.data as { message: string })?.message! || error.message
      ),
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
        <PostPreview
          key={post._id}
          post={post}
          isProtected={isProtected}
          deletePost={() => deletePost(post._id)}
        />
      ))}
    </section>
  );
}
