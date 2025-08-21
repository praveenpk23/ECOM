import React from "react";
import {Link} from 'react-router-dom'
import { useSelector } from "react-redux";
const Header = () => {
  const cartCount = useSelector((state)=>state.cart.cartItem.length)
  console.log(useSelector((state)=>state.cart.cartItem))
  return (
    <div className="navbar bg-base-100 shadow-sm relative z-50">
      <div className="flex-1">
        <Link className="btn btn-ghost text-xl">ECOM</Link>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link to='/cart'>Cart({cartCount})</Link>
          </li>
          <li className="relative">
            <details>
              <summary>praveen</summary>
              <ul
                className="bg-base-100 rounded-t-none p-2 absolute right-0 mt-2 shadow-lg z-[9999]"
              >
                <li><a>Light</a></li>
                <li><a>Profile</a></li>
                <li><a>Logout</a></li>
              </ul>
            </details>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
