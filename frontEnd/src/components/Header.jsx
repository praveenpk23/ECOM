import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";
import { updateTheme } from "../Slice/themeSlice";
import { useSelector, useDispatch } from "react-redux";
import {
  useGetUserProfileQuery,
  useLogoutUserMutation,
} from "../Slice/userApiSlice";
import { userApiSlice } from "../Slice/userApiSlice";
import { useHandleUpdateUserMutation } from "../Slice/userApiSlice";
import { useGetCartQuery } from "../Slice/cartApiSlice";
import axios from "axios";
const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useSelector((state) => state.theme.value);
  const cartCountLocal = useSelector((state) => state.cart.cartItem.length);
  const { data: CartData, error, isError, refetch } = useGetCartQuery();
  const { data, refetch: reFetchUser } = useGetUserProfileQuery();
  console.log(data);
  // const user = useSelector((state) => state.user.value);
  const [cartCount, setCartCount] = useState(0);
  const [logoutUser] = useLogoutUserMutation();
  const changeTheme = () => {
    if (theme === "dark") {
      dispatch(updateTheme("light"));
    } else {
      dispatch(updateTheme("dark"));
    }
  };
  useEffect(() => {
    if (CartData) {
      setCartCount(CartData.items.length);
    } else {
      setCartCount(cartCountLocal);
    }
  }, [CartData, cartCountLocal]);
  // const theme = useSelector((state)=>state.theme)

  useEffect(() => {
    // document.documentElement.setAttribute('data-theme', localStorage.getItem("theme") || "light");
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const handleLogout = async () => {
    await logoutUser(); // call your API logout

    // Completely clear all RTK Query cache
    dispatch(userApiSlice.util.resetApiState());
    localStorage.removeItem("cart");
    console.log(data);
    // Redirect to login page
    navigate("/login");
  };

  const [handleUpdateUser, { isLoading }] = useHandleUpdateUserMutation();

  const handleUpdateUserInfo = async () => {
    try {
      const res = await handleUpdateUser({ name: "Pk" }).unwrap();
    } catch (err) {
      console.error("Update failed", err);
    }
  };

  // useEffect(() => {
  //     if (data ) {
  //       setCartCount(CartData.items.length);
  //     }else{
  //       const cartCount = useSelector((state) => state.cart.cartItem.length);
  //       setCartCount(cartCount);
  //     }
  //   }, [CartData]);
  return (
    <div className="navbar bg-base-100  shadow-sm relative z-50">
      <div className="flex-1">
        <Link className="btn btn-ghost text-xl">ECOM</Link>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link to="/cart">Cart {cartCount || cartCountLocal}</Link>
            {/* <Link to="/cart">Cart ({cartCount})</Link> */}
          </li>
          <li className="relative">
            <details>
              <summary>{data?.name || "User"}</summary>
              <ul className="bg-base-100 rounded-t-none p-2 absolute right-0 mt-2 shadow-lg z-[9999]">
                <li onClick={changeTheme}>
                  <a>{theme === "light" ? "Dark" : "Light"}</a>
                </li>
                {data && (
                  <li onClick={() => handleUpdateUserInfo(data._id)}>
                    <Link to="/profile">Profile</Link>
                  </li>
                )}
                {data ? (
                  <li onClick={handleLogout}>
                    <a>Logout</a>
                  </li>
                ) : (
                  <li
                    onClick={() => {
                      navigate("/login");
                    }}
                  >
                    <a>Login</a>
                  </li>
                )}
              </ul>
            </details>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
