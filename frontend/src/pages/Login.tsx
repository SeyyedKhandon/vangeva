import { useMutation, useQuery } from "@tanstack/react-query";
import axios, { AxiosResponse } from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Loading from "../components/Loading";
import { useAuthContext } from "../store/auth";
import { AuthenticatedUser, User } from "../types";

function Login() {
  const navigate = useNavigate();
  const { login } = useAuthContext();
  const [info, setInfo] = useState<Pick<User, "email" | "password">>({
    email: "",
    password: "",
  });
  const {
    mutate: submitLoginInfo,
    isLoading,
    isError,
    error,
  } = useMutation<
    AxiosResponse<AuthenticatedUser, any>,
    Error,
    Pick<User, "email" | "password">
  >({
    mutationFn: (info) => axios.post("/api/users/login", info),
    onSuccess: ({ data }) => {
      login(data.token);
      toast(`${data.name} Logged in!`);
      navigate("/profile");
    },
  });

  const onChangeHandler = (e: any) => {
    setInfo((i) => ({ ...i, [e.target.name]: e.target.value }));
  };

  const submitHandler = (e: any) => {
    e.preventDefault();
    submitLoginInfo(info);
  };

  if (isLoading) return <Loading />;
  if (isError) toast.error(error.message);

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
