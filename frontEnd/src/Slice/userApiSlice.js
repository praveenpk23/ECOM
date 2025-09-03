import { apiSlice } from "./apiSlice";
import { BASE_URL, USER_URL } from "../Constant";
const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUserProfile: builder.query({
      query: () => ({
        url: `${USER_URL}/profile`,
      }),
  providesTags: ['User']
}),
    logoutUser: builder.mutation({
      query: () => ({
        url: `${USER_URL}/logout`,
        method: "POST",
      }),
      // invalidatesTags: ["User"] , 
    }),
    loginUser:builder.mutation({
        query:({email,password})=>({
            url:`${USER_URL}/login`,
            method:"POST",
            body:{email,password}
        })
    }),
    registerUser:builder.mutation({
      query:({name,email,password})=>({
          url:`${USER_URL}/`,
          method:"POST",
          body:{name,email,password}
      })
    }),
    handleUpdateUser:builder.mutation({
      query:({...update})=>({
        url:`${USER_URL}/profile`,
        method:"PUT",
        body:update
      }),
      invalidatesTags: ["User"] 
    })
  }),
});

export { userApiSlice };
export const { useGetUserProfileQuery, useLogoutUserMutation,useLoginUserMutation,useHandleUpdateUserMutation,useRegisterUserMutation } = userApiSlice;
