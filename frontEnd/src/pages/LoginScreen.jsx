// LoginScreen.jsx
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();

  // get redirect param from url
  const redirect = new URLSearchParams(location.search).get("redirect") || "/";

const submitHandler = async (e) => {
  e.preventDefault(); // prevent default form submit
  setError(null);     // reset error state

  try {
    // 1️⃣ Send login request to backend
    const { data } = await axios.post(
      "http://localhost:5000/api/users/login",
      { email, password },
      { withCredentials: true } // important to send and receive cookies
    );

    // 2️⃣ Check redirect query param
    // ?redirect=cart → navigate to /cart, otherwise /
    if (redirect === "cart") {
      navigate("/cart");
    } else {
      navigate("/");
    }
  } catch (err) {
    // 3️⃣ Handle errors
    console.error("Login failed:", err.response || err);
    setError(
      err.response?.data?.message || "Invalid email or password"
    );
  }
};



  // auto-redirect if already logged in (based on cookie session)
useEffect(() => {
  const checkAuth = async () => {
    try {
      await axios.get("http://localhost:5000/api/users/profile", { withCredentials: true });
      if (redirect === "cart") {
        navigate("/cart");
      } else {
        navigate("/");
      }
    } catch (err) {
      // not logged in → stay
    }
  };
  checkAuth();
}, [navigate, redirect]);

return (
    <div className="flex justify-center items-center h-screen bg-base-200">
      <div className="card w-96 shadow-2xl bg-base-100">
        <form onSubmit={submitHandler} className="card-body">
          <h2 className="text-2xl font-bold text-center">Login</h2>

          {/* Error message */}
          {/* Replace error state dynamically */}
          {/* <p className="text-error">Invalid credentials</p> */}

          {/* Email field */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className="input input-bordered"
              required
            />
          </div>

          {/* Password field */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              className="input input-bordered"
              required
            />
          </div>

          {/* Submit button */}
          <div className="form-control mt-4">
            <button type="submit" className="btn btn-primary w-full">
              Login
            </button>
          </div>

          {/* Optional actions */}
          <label className="label justify-center">
            <a href="#" className="label-text-alt link link-hover">
              Forgot password?
            </a>
          </label>
        </form>
      </div>
    </div>
  );
};

export default LoginScreen;
