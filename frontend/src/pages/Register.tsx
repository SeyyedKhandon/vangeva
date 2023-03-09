import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Loading from "../components/Loading";
import { AuthenticatedUser, User } from "../types";

function Register() {
  const navigate = useNavigate();
  const [info, setInfo] = useState({
    name: "",
    email: "",
    password: "",
    secondPassword: "",
  });
  const registerMutation = useMutation({
    mutationFn: (info: User) =>
      axios.post<AuthenticatedUser>("/api/users/register", info),
    onSuccess: ({ data }) => {
      localStorage.setItem("token", data.token);
      toast(`${data.name} Registered!`);
      navigate("/profile");
    },
    onError: (error: AxiosError) =>
      toast.error(
        (error.response?.data as { message: string })?.message! || error.message
      ),
  });

  const onChangeHandler = (e: any) => {
    setInfo((i) => ({ ...i, [e.target.name]: e.target.value }));
  };

  const submitHandler = (e: any) => {
    e.preventDefault();
    if (info.password != info.secondPassword)
      return toast("Password's do not match!");

    registerMutation.mutate(info);
  };

  if (registerMutation.isLoading) return <Loading />;

  return (
    <form method="post" onSubmit={submitHandler}>
      <label htmlFor="name">
        Name:
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
