import { Link, Outlet } from "react-router-dom";
import { useAuth } from "../Context/authContext";

const Navbar = () => {
  const { loggedIn, logout } = useAuth();

  return (
    <>
      <div className="main w-full h-20 z-20 overflow-hidden sticky flex items-center justify-center border-b-2 p-3 shadow-md sm:h-20 sm:items-center sm:justify-between bg-dark">
        {/*first div */}
        <div className="absolute top-0 sm:relative flex justify-between items-center p-3 w-full sm:w-fit sm:p-0">
          {/*menu */}
          <Link
            onClick={() => {
              function toggleMultiple(el, ...classes) {
                classes.forEach((cls) => el.classList.toggle(cls));
              }
              toggleMultiple(document.querySelector(".main"), "h-[45%]");
              toggleMultiple(
                document.querySelector(".nav-btns"),
                "hidden",
                "flex",
                "flex-col",
                "gap-2"
              );
            }}
            className="rounded-[50%] bg-amber-400 px-2 py-2 sm:hidden"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </Link>

          {/*title */}
          <a href="/" className="text-xl font-bold text-light">
            Literarian
          </a>

          {/*profile */}
          <Link className="rounded-[50%] bg-amber-400 px-2 py-2 sm:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
              />
            </svg>
          </Link>
        </div>

        {/*second div */}
        <div className="nav-btns w-full hidden absolute bottom-0  p-2 sm:relative sm:flex sm:flex-row sm:justify-end sm:items-center sm:gap-6 sm:w-full sm:max-w-[80%]">
          {/*Search Link */}
          <Link className="w-full bg-amber-400 p-2 sm:w-auto sm:rounded-[50%] sm:bg-amber-400 sm:px-2 sm:py-2 md:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
              />
            </svg>
          </Link>

          {/*Search bar */}
          <input
            type="search"
            name="search"
            id="search"
            placeholder="Search..."
            className=" hidden md:flex md:flex-1 md:outline-none md:rounded-2xl md:p-2 md:px-4 md:border text-light md:border-dark-light md:focus:ring-2 md:focus:ring-light"
          />

          {/*notification Link */}
          <Link className="w-full bg-amber-400 p-2 sm:rounded-[50%] sm:bg-amber-400 sm:px-2 sm:py-2 sm:w-auto">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"
              />
            </svg>
          </Link>

          {/*write Link */}
          <Link className="w-full  p-2 sm:bg-dark-light sm:text-white sm:px-4 sm:py-2 sm:rounded-xl sm:hover:bg-bright sm:hover:text-dark sm:transition-all sm:w-auto">
            write
          </Link>

          {/*login Link and Logout Link */}
          {loggedIn ? (
            <button
              onClick={logout}
              className="w-full p-2  sm:bg-dark-light sm:text-white sm:px-4 sm:py-2 sm:rounded-xl sm:hover:bg-bright sm:hover:text-dark sm:transition-all sm:w-auto"
            >Log out</button>
          ) : (
            <Link
              to="/signin"
              className="w-full p-2  sm:bg-dark-light sm:text-white sm:px-4 sm:py-2 sm:rounded-xl sm:hover:bg-bright sm:hover:text-dark sm:transition-all sm:w-auto"
            >
              Sign In
            </Link>
          )}
        </div>
      </div>
      <Outlet />
    </>
  );
};

export default Navbar;
