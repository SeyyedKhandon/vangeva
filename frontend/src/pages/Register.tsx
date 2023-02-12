import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Register() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [info, setInfo] = useState({
    name: "",
    email: "",
    password: "",
    secondPassword: "",
  });

  const onChangeHandler = (e: any) => {
    setInfo((i) => ({ ...i, [e.target.name]: e.target.value }));
  };

  const submitHandler = (e: any) => {
    e.preventDefault();
    if (info.password != info.secondPassword)
      return toast("Password's do not match!");

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
        toast.error(error.message);
      })
      .finally(() => setLoading(false));
  };

  if (loading) return <article aria-busy="true"></article>;

  return (
    <form method="post" onSubmit={submitHandler}>
      <label htmlFor="name">
        Email:
        <input
          value={info.name}
          onChange={onChangeHandler}
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
      <label htmlFor="secondPassword">
        Retype Password:
        <input
          value={info.secondPassword}
          onChange={onChangeHandler}
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
