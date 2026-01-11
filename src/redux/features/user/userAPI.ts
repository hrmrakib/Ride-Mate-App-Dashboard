/* eslint-disable @typescript-eslint/no-explicit-any */
import baseAPI from "@/redux/api/api";

const userAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getUserByRole: builder.query<
      any,
      { role: string; search?: string; page?: number; limit?: number }
    >({
      query: ({ role, search, page, limit }) => ({
        url: `/admin/users?role=${role}&page=${page}&limit=${limit}&search=${search}`,
        method: "GET",
      }),
    }),

    deleteUser: builder.mutation<any, { userId: string }>({
      query: ({ userId }) => ({
        url: `/admin/users`,
        method: "DELETE",
        body: { user_id: userId },
      }),
    }),

    pendingUsers: builder.query<
      any,
      { role?: string; page?: number; limit?: number; search?: string }
    >({
      query: ({ role, page, limit, search }) => ({
        url: `/admin/users/pending-users?role=${role}&page=${page}&limit=${limit}&search=${search}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetUserByRoleQuery,
  useDeleteUserMutation,
  usePendingUsersQuery,
} = userAPI;

export default userAPI;
