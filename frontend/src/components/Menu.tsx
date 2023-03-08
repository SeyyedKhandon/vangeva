import { useRef } from "react";
import {
  HiOutlineArrowRightOnRectangle,
  HiOutlineBars3,
  HiXMark,
} from "react-icons/hi2";
import { Link, useNavigate } from "react-router-dom";

const isLoggedIn = () => localStorage.getItem("token");
const logout = () => localStorage.setItem("token", "");
const protectedRoutes = [
  { text: "Profile", path: "/profile", additionalClasses: "" },
  { text: "Add Post", path: "/add-post", additionalClasses: "" },
];
const publicRoutes = [{ text: "Home", path: "/", additionalClasses: "" }];
const authRoutes = [
  {
    text: "Login",
    path: "/login",
    additionalClasses: "",
  },
  {
    text: "Register",
    path: "/register",
    additionalClasses: "",
  },
];
const menuItems = () =>
  isLoggedIn()
    ? [...publicRoutes, ...protectedRoutes]
    : [...publicRoutes, ...authRoutes];

const menuToggler = (navElement: React.MutableRefObject<null>) => {
  if (!navElement.current) return;
  const nav = navElement.current as HTMLElement;
  nav.classList.toggle("w-screen");
  nav.classList.toggle("w-0");
};

export const LogOutBtn = ({
  classNames = "",
  onLogOut,
}: {
  classNames?: string;
  onLogOut: VoidFunction;
}) => {
  const navigate = useNavigate();

  return (
    <HiOutlineArrowRightOnRectangle
      title="Log Out"
      className={`${
        isLoggedIn() ? "md:flex flex" : "hidden"
      }   text-red-500 text-3xl cursor-pointer hover:text-red-400 ${classNames}`}
      onClick={() => {
        logout();
        onLogOut();
        navigate("/login");
      }}
    />
  );
};
export const MenuItems = ({
  classNames,
  onToggle,
}: {
  classNames: string;
  onToggle: VoidFunction;
}) => (
  <ul className={classNames} onClick={onToggle}>
    {menuItems().map((menu) => (
      <li key={menu.text} className="text-gray-900 hover:bg-slate-200">
        <Link
          className={
            "cursor-pointer text-xl w-full p-4 block " + menu.additionalClasses
          }
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
        classNames="hidden md:flex ml-auto"
        onToggle={() => menuToggler(mobileMenu)}
      />
      <LogOutBtn classNames="hidden" onLogOut={() => menuToggler(mobileMenu)} />
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
        <LogOutBtn
          classNames="cursor-pointer w-full block"
          onLogOut={() => menuToggler(mobileMenu)}
        />
      </div>
    </>
  );
};
