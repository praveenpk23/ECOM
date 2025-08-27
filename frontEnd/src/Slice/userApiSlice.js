import { apiSlice } from "./apiSlice";
import { BASE_URL, USER_URL } from "../Constant";
const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUserProfile: builder.query({
      query: () => ({
        url: `${USER_URL}/profile`,
      }),
      providesTags: ["User"], // tag the cached data
    }),
    logoutUser: builder.mutation({
      query: () => ({
        url: `${USER_URL}/logout`,
        method: "POST",
      }),
    }),
    loginUser:builder.mutation({
        query:({email,password})=>({
            url:`${USER_URL}/login`,
            method:"POST",
            body:{email,password}
        })
    })
  }),
});

export { userApiSlice };
export const { useGetUserProfileQuery, useLogoutUserMutation,useLoginUserMutation } = userApiSlice;
