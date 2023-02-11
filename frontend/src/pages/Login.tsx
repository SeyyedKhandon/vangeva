import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Login() {
  const email = useRef(null as any);
  const password = useRef(null as any);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const submitHandler = (e: any) => {
    e.preventDefault();
    setLoading(true);

    const info = {
      email: email.current.value,
      password: password.current.value,
    };

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
        toast(error.message);
      })
      .finally(() => setLoading(false));
  };

  if (loading) return <article aria-busy="true"></article>;

  return (
    <form method="post" onSubmit={submitHandler}>
      <label htmlFor="email">
        Email:
        <input
          ref={email}
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
          ref={password}
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
