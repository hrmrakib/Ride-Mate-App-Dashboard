/* eslint-disable @typescript-eslint/no-explicit-any */
import baseAPI from "@/redux/api/api";

const userAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getProfile: builder.query({
      query: () => ({
        url: `/profile`,
        method: "GET",
      }),
    }),

    updateProfile: builder.mutation({
      query: (body) => ({
        url: "/profile/edit",
        method: "PATCH",
        body,
      }),
    }),

    updatePassword: builder.mutation({
      query: (body) => ({
        url: "/profile/change-password",
        method: "POST",
        body,
      }),
    }),

    updateContext: builder.mutation({
      query: (body) => ({
        url: "/admin/context-pages/modify",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const {
  useGetProfileQuery,
  useUpdateProfileMutation,
  useUpdatePasswordMutation,
  useUpdateContextMutation,
} = userAPI;

export default userAPI;
