import { useRef, useState } from "react";

function Login() {
  const email = useRef(null as any);
  const password = useRef(null as any);
  const [user, setUser] = useState(null as any);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null as any);

  const submitHandler = (e: any) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setUser(null);

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
      .then((res) => setUser(res))
      .catch(async (err) => {
        setError(await err);
      })
      .finally(() => setLoading(false));
  };

  if (loading) return <article aria-busy="true"></article>;

  return (
    <main className="container">
      <div>{user && JSON.stringify(user, null, 2)}</div>
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
      {error && <div>Error {JSON.stringify(error, null, 2)}</div>}
    </main>
  );
}

export default Login;
