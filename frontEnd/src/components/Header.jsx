import React, { useEffect } from "react";
import { Link } from "react-router-dom";
// import { useSelector } from "react-redux";
import { updateTheme } from "../Slice/themeSlice";
import { useSelector, useDispatch } from "react-redux";
const Header = () => {
  const dispatch = useDispatch();
  const cartCount = useSelector((state) => state.cart.cartItem.length);
  const theme = useSelector((state) => state.theme.value);
  console.log(useSelector((state) => state.cart.cartItem));
  console.log(useSelector((state) => state));

  const changeTheme = () => {
    if (theme === "dark") {
      dispatch(updateTheme("light"));
    } else {
      dispatch(updateTheme("dark"));
    }
  };

  // const theme = useSelector((state)=>state.theme)

  useEffect(() => {
    // document.documentElement.setAttribute('data-theme', localStorage.getItem("theme") || "light");
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme",theme)
  }, [theme]);

  return (
    <div className="navbar bg-base-100  shadow-sm relative z-50">
      <div className="flex-1">
        <Link className="btn btn-ghost text-xl">ECOM</Link>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link to="/cart">Cart {cartCount}</Link>
          </li>
          <li className="relative">
            <details>
              <summary>praveen</summary>
              <ul className="bg-base-100 rounded-t-none p-2 absolute right-0 mt-2 shadow-lg z-[9999]">
                <li onClick={changeTheme}>
                  <a>{theme === "light" ? "Dark" : "Light"}</a>
                </li>
                <li>
                  <a>Profile</a>
                </li>
                <li>
                  <a>Logout</a>
                </li>
              </ul>
            </details>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
