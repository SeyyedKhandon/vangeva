import { Link } from "react-router-dom";
import { Menu } from "./Menu";

export default function Header() {
  return (
    <header className="flex flex-wrap justify-between items-center bg-gray-100 text-gray-900 px-4 py-2">
      <Link to="/" className="flex gap-2 items-center">
        <img
          className="h-8 sm:h-10 rounded-full shadow-lg"
          src="../src/assets/crown.png"
          alt="Logo"
        />
        <span className="sm:text-xl font-mono font-bold">Cafedx</span>
      </Link>
      <Menu />
    </header>
  );
}
