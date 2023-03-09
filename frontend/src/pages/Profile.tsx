import Posts from "@/components/Posts";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Loading from "../components/Loading";
import useLocalStorage from "../hooks/useLocalStorage";
import { Profile as IProfile } from "../types";

export default function Profile() {
  const navigate = useNavigate();
  const { data, isError, error, isLoading } = useQuery<IProfile, Error>({
    queryKey: ["/api/users/profile"],
    queryFn: () =>
      axios
        .get("/api/users/profile", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((res) => res.data),
  });

  if (isLoading) return <Loading />;
  if (isError) {
    toast.error(error.message);
    navigate("/login");
    return null;
  }
  const posts = (id: string) => <Posts url={`/api/posts/${id}`} isProtected />;

  return (
    <section>
      <h2>Profile - Welcome {data.name}</h2>
      <ul>
        <li>Name: {data.name}</li>
        <li>Email: {data.email}</li>
      </ul>
      {data._id ? posts(data._id) : null}
    </section>
  );
}
