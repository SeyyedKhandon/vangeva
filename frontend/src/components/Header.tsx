import { Link } from "react-router-dom";

export default function Header() {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">
            <strong>MERN Blog</strong>
          </Link>
        </li>
      </ul>
      <ul>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/register">Register</Link>
        </li>
        <li>
          <Link to="/profile">Profile</Link>
        </li>
        <li>
          <Link to="/add-post">Add Post</Link>
        </li>
      </ul>
    </nav>
  );
}
