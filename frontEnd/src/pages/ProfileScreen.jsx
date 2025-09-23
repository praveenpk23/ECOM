import React, { useEffect, useState } from "react";
import {
  useGetUserProfileQuery,
  useHandleUpdateUserMutation,
} from "../Slice/userApiSlice";
import { useNavigate, useLocation, Link } from "react-router-dom";
import toast from "react-hot-toast";

const ProfileScreen = () => {
  const { data, isLoading, error, refetch } = useGetUserProfileQuery();
  const [updateUserProfile, { isLoading: isUpdateLoading }] =
    useHandleUpdateUserMutation();
  const navigate = useNavigate();
  const location = useLocation();
  const redirect = new URLSearchParams(location.search).get("redirect") || "/";
  console.log(redirect);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    shippingDetails: {
      address: "",
      phoneNumber: "",
      city: "",
      state: "",
      country: "",
      pincode: "",
      landmark: "",
    },
  });

  useEffect(() => {
    if (!isLoading && !data) {
      navigate("/login");
    } else if (data) {
      setFormData({
        name: data.name || "",
        email: data.email || "",
        shippingDetails: {
          address: data.shippingDetails?.address || "",
          phoneNumber: data.shippingDetails?.phoneNumber || "",
          city: data.shippingDetails?.city || "",
          state: data.shippingDetails?.state || "",
          country: data.shippingDetails?.country || "",
          pincode: data.shippingDetails?.pincode || "",
          landmark: data.shippingDetails?.landmark || "",
        },
      });
    }
  }, [data, isLoading, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name in formData.shippingDetails) {
      setFormData({
        ...formData,
        shippingDetails: { ...formData.shippingDetails, [name]: value },
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation: all fields except landmark required
    // const missingFields = [
    //   'name',
    //   ...Object.keys(formData.shippingDetails).filter(f => f !== 'landmark')
    // ].filter(field => {
    //   if (field === 'name') return !formData.name.trim();
    //   return !formData.shippingDetails[field].trim();
    // });

    if (
      (name =
        "" ||
        Object.keys(formData.shippingDetails)
          .filter((f) => f !== "landmark")
          .some((field) => !formData.shippingDetails[field]))
    ) {
      toast.error(`Please fill all required fields`);
      return;
    }

    try {
      await updateUserProfile(formData).unwrap();
      refetch();
      toast.success("Profile updated successfully!");
      navigate(`/${redirect}`);
    } catch (err) {
      console.error(err);
      toast.error("Failed to update profile");
    }
  };

  if (isLoading) return <p className="text-center mt-10">Loading...</p>;
  if (error)
    return (
      <p className="text-center mt-10 text-red-500">Error loading profile</p>
    );

  return (
    <div className=" my-10 max-w-2xl mx-auto p-6 rounded-lg shadow-lg bg-base-100 dark:bg-gray-900 transition-colors duration-300">
      {/* <Toaster position="top-right" /> */}
      <h1 className="text-3xl font-bold mb-6 text-center text-base-content dark:text-white">
        Profile
      </h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name */}
        <div className=" form-control w-full">
          <label className="label">
            <span className="label-text text-white font-semibold">Name *</span>
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your name"
            className="input input-bordered w-full bg-base-100 dark:bg-gray-800 text-base-content dark:text-white"
            required
          />
        </div>

        {/* Email */}
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text text-white font-semibold">Email</span>
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            disabled
            className="input input-bordered w-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 cursor-not-allowed"
          />
        </div>

        {/* Shipping Details */}
        <h2 className="text-2xl font-semibold mt-4 mb-2 text-base-content dark:text-white">
          Shipping Details
        </h2>

        {Object.keys(formData.shippingDetails).map((field) => (
          <div className="form-control w-full" key={field}>
            <label className="label">
              <span className="label-text text-white font-semibold">
                {field.charAt(0).toUpperCase() + field.slice(1)}
                {field !== "landmark" ? " *" : " (optional)"}
              </span>
            </label>
            <input
              type={field === "pincode" ? "number" : "text"}
              name={field}
              value={formData.shippingDetails[field]}
              onChange={handleChange}
              placeholder={`Enter ${field}`}
              className="input input-bordered w-full bg-base-100 dark:bg-gray-800 text-base-content dark:text-white"
              required={field !== "landmark"}
            />
          </div>
        ))}

        {/* Submit Button */}
        <button
          type="submit"
          className="btn btn-primary w-full py-3 mt-4 text-lg font-semibold hover:btn-secondary transition-all"
          disabled={isUpdateLoading}
        >
          {isUpdateLoading ? "Updating..." : "Update Profile"}
        </button>
      </form>
    </div>
  );
};

export default ProfileScreen;
