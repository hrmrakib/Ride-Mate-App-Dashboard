import baseAPI from "@/redux/api/api";

const transectionAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getTransactions: builder.query({
      query: ({ page, limit, search }) => ({
        url: `/admin/transactions?page=${page}&limit=${limit}&search=${search}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetTransactionsQuery } = transectionAPI;
export default transectionAPI;
