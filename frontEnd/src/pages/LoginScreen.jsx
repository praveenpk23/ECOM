import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useLoginUserMutation, useGetUserProfileQuery } from "../Slice/userApiSlice";
import { setUser, clearUser } from "../Slice/userSlice";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const redirect = new URLSearchParams(location.search).get("redirect") || "/";

  // Login mutation
  const [loginUser, { isLoading }] = useLoginUserMutation();

  // Auto-fetch user profile
  const { data: profileData, refetch: refetchProfile } = useGetUserProfileQuery();

  // Submit handler
  const submitHandler = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      // Login
      await loginUser({ email, password }).unwrap();

      // Refetch profile after login
      const { data } = await refetchProfile();
      if (data) {
        dispatch(setUser(data));
        if(redirect){
          navigate('/cart')
        }else{
          navigate('/')
        }
      }
    } catch (err) {
      console.error("Login failed:", err);
      setError(err?.data?.message || "Login failed");
    }
  };

  // Auto redirect if already logged in
  useEffect(() => {
    if (profileData) {
      dispatch(setUser(profileData));
      navigate('/cart');
    } else {
      dispatch(clearUser());
    }
  }, [profileData,redirect, dispatch, redirect]);

  return (
    <div className="flex justify-center items-center h-screen bg-base-200">
      <div className="card w-96 shadow-2xl bg-base-100">
        <form onSubmit={submitHandler} className="card-body">
          <h2 className="text-2xl font-bold text-center">Login</h2>

          {error && <p className="text-error">{error}</p>}

          <div className="form-control">
            <label className="label"><span className="label-text">Email</span></label>
            <input
              type="email"
              placeholder="Enter your email"
              className="input input-bordered"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-control">
            <label className="label"><span className="label-text">Password</span></label>
            <input
              type="password"
              placeholder="Enter your password"
              className="input input-bordered"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="form-control mt-4">
            <button type="submit" className="btn btn-primary w-full" disabled={isLoading}>
              {isLoading ? "Logging in..." : "Login"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginScreen;
