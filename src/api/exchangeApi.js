import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const exchangeApi = createApi({
  reducerPath: 'exchangeApi',
  baseQuery: fetchBaseQuery({ baseUrl: `https://v6.exchangerate-api.com/v6/${import.meta.env.VITE_Exchange_API_KEY}` }),

  endpoints: (builder) => ({
    getLatestRates: builder.query({
      query: (baseCurrency) => `/latest/${baseCurrency}`,
    }),
  }),
});

export const { useGetLatestRatesQuery } = exchangeApi;

export default exchangeApi;