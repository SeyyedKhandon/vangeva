import { useRef } from "react";
import { HiOutlineBars3, HiXMark } from "react-icons/hi2";
import { Link } from "react-router-dom";

const menuItems = [
  { text: "Home", path: "/" },
  { text: "Login", path: "/login" },
  { text: "Register", path: "/register" },
  { text: "Profile", path: "/profile" },
  { text: "Add Post", path: "/add-post" },
];

const menuToggler = (navElement: React.MutableRefObject<null>) => {
  if (!navElement.current) return;
  const nav = navElement.current as HTMLElement;
  nav.classList.toggle("w-screen");
  nav.classList.toggle("w-0");
};

export const MenuItems = ({
  classNames,
  onToggle,
}: {
  classNames: string;
  onToggle: VoidFunction;
}) => (
  <ul className={classNames} onClick={onToggle}>
    {menuItems.map((menu) => (
      <li key={menu.text}>
        <Link
          className="text-gray-900 hover:bg-slate-200 cursor-pointer text-xl w-full p-4 block"
          to={menu.path}
        >
          {menu.text}
        </Link>
      </li>
    ))}
  </ul>
);

export const Menu = () => {
  const mobileMenu = useRef(null);

  return (
    <>
      <HiOutlineBars3
        className="text-gray-500 text-3xl cursor-pointer md:hidden hover:text-gray-400"
        onClick={() => menuToggler(mobileMenu)}
      />
      <MenuItems
        classNames="hidden md:flex"
        onToggle={() => menuToggler(mobileMenu)}
      />

      <div
        ref={mobileMenu}
        className="transition-all flex flex-col md:hidden fixed w-0 h-screen z-10 left-0 top-0 overflow-hidden bg-slate-100"
      >
        <HiXMark
          onClick={() => menuToggler(mobileMenu)}
          className="text-gray-900 hover:text-gray-700 text-3xl cursor-pointer inline-block m-4 self-end"
        />
        <MenuItems
          classNames="text-center mt-20"
          onToggle={() => menuToggler(mobileMenu)}
        />
      </div>
    </>
  );
};
