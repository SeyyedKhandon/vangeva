import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="flex justify-between p-4 px-8 border-b">
      <ul>
        <li>
          <Link to="/" className="flex gap-2 align-middle">
            <img
              src="../src/assets/logo.png"
              alt="CafeDX Logo"
              className="w-8"
            />
            <strong className="text-2xl">CafeDX</strong>
          </Link>
        </li>
      </ul>
      <nav className="font-semibold text-slate-700">
        <ul className="flex gap-4">
          <li className="hover:text-sky-500">
            <Link to="/login">Login</Link>
          </li>
          <li className="hover:text-sky-500">
            <Link to="/register">Register</Link>
          </li>
          <li className="hover:text-sky-500">
            <Link to="/profile">Profile</Link>
          </li>
          <li className="hover:text-sky-500">
            <Link to="/add-post">Add Post</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
