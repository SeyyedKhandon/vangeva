import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [info, setInfo] = useState({ email: "", password: "" });

  const onChangeHandler = (e: any) => {
    setInfo((i) => ({ ...i, [e.target.name]: e.target.value }));
  };

  const submitHandler = (e: any) => {
    e.preventDefault();
    setLoading(true);

    fetch("/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams(info),
    })
      .then((res) => {
        if (res.ok) return res.json();
        return Promise.reject(res.json());
      })
      .then((res) => {
        toast(`${res.name} Logged in!`);
        localStorage.setItem("token", res.token);
        navigate("/profile");
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
      <label htmlFor="email">
        Email:
        <input
          value={info.email}
          onChange={onChangeHandler}
          type="email"
          id="email"
          name="email"
          placeholder="Enter your email"
          required
        />
      </label>
      <label htmlFor="password">
        Password:
        <input
          value={info.password}
          onChange={onChangeHandler}
          type="password"
          id="password"
          name="password"
          placeholder="Enter your password"
          required
        />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
}

export default Login;
