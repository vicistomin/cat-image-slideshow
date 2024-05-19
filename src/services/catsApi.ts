import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Cat } from 'types';

const baseUrl = import.meta.env?.['VITE_CATS_API_URL'] || '/';

export const catsApi = createApi({
  reducerPath: 'catsApi',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getRandomCat: builder.query<Cat[], void>({
      query: () => `images/search`,
    }),
    getCats: builder.query<Cat[], number>({
      query: (
        // Only 10 max is available
        limit
      ) => `images/search?limit=${limit}`,
    }),
  }),
});

export const { useGetRandomCatQuery, useGetCatsQuery } = catsApi;
