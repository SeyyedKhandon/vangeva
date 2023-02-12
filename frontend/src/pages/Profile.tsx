import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Profile() {
  const navigate = useNavigate();
  const [state, setState] = useState(
    () =>
      ({
        name: "",
        email: "",
        token: localStorage.getItem("token"),
      } as any)
  );

  useEffect(() => {
    fetch("/api/users/profile", {
      method: "get",
      headers: {
        Authorization: `Bearer ${state.token}`,
      },
    })
      .then((res) => {
        if (res.ok) return res.json();
        return Promise.reject(res.json());
      })
      .then((res) => {
        setState({
          state,
          ...res,
        });
      })
      .catch(async (err) => {
        const error = await err;
        toast.error(error.message);
        navigate("/login");
      });
  }, []);

  return (
    <section>
      <h2>Profile - Welcome {state.name}</h2>
      <ul>
        <li>Name: {state.name}</li>
        <li>Email: {state.email}</li>
      </ul>
    </section>
  );
}
