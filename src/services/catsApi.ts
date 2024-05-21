import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Cat } from 'types';

const apiUrl = import.meta.env?.['VITE_CATS_API_URL'] || '/';
const baseUrl = `${apiUrl}/images/search`;

export const catsApi = createApi({
  reducerPath: 'catsApi',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getRandomCat: builder.query<Cat[], void>({
      query: () => ({
        url: '',
      }),
    }),
    getCats: builder.query<Cat[], number>({
      query: (limit) => ({
        url: '',
        params: {
          // Only 10 max is available
          limit: `${limit}`,
        },
      }),
    }),
  }),
});

export const { useGetRandomCatQuery, useGetCatsQuery } = catsApi;
