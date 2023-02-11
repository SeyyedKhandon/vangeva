import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Register() {
  const name = useRef(null as any);
  const email = useRef(null as any);
  const password = useRef(null as any);
  const secondPassword = useRef(null as any);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const submitHandler = (e: any) => {
    e.preventDefault();
    if (password.current.value != secondPassword.current.value)
      return toast("Password's do not match!");

    const info = {
      name: name.current.value,
      email: email.current.value,
      password: password.current.value,
    };

    setLoading(true);
    fetch("/api/users/register", {
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
        toast(`${res.name} Registered!`);
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
      <label htmlFor="name">
        Email:
        <input
          ref={name}
          type="text"
          id="name"
          name="name"
          placeholder="Enter your name"
          required
        />
      </label>
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
      <label htmlFor="secondPassword">
        Retype Password:
        <input
          ref={secondPassword}
          type="password"
          id="secondPassword"
          name="secondPassword"
          placeholder="Retype your password"
          required
        />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
}

export default Register;
