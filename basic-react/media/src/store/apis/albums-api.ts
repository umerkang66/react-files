import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { faker } from '@faker-js/faker';

import { Album, User } from '../types';

const albumsApi = createApi({
  // what should be the key of "current state" in the big store obj
  reducerPath: 'albums',
  // This is gonna give us the pre-configured version of fetch
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3005',
    async fetchFn(...args) {
      // DON'T necessary, returns custom fetch func
      return fetch(...args);
    },
  }),
  // add types for tag, for "providesTags", prop "type" has to match with it
  tagTypes: ['Album', 'UsersAlbum'],
  endpoints(builder) {
    return {
      fetchAlbums: builder.query<Album[], User>({
        // this query is for some params for request
        query(user) {
          return { url: '/albums', params: { userId: user.id }, method: 'GET' };
        },
        // provide a tag, so when we untag this query,
        // all of these tags will goes to single query,
        // if we call the hook again, second query is created,
        // thus the second query tags will be according to their
        // relative result or error
        providesTags(result, error, user) {
          // third argument is what we have passed in the argument of query
          // This "type" has to match the type of "tagTypes"
          const albumTags = result
            ? result.map(({ id }) => ({ type: 'Album' as const, id }))
            : [];
          return [...albumTags, { type: 'UsersAlbum' as const, id: user.id }];
        },
      }),

      createAlbum: builder.mutation<Album, User>({
        // this query is for some params for request
        query(user) {
          return {
            url: '/albums',
            method: 'POST',
            body: { title: faker.commerce.productName(), userId: user.id },
          };
        },
        // explanation above
        invalidatesTags(result, error, user) {
          return [{ type: 'UsersAlbum', id: user.id }];
        },
      }),

      removeAlbum: builder.mutation<Album, Album>({
        // this query is for some params for request
        query(album) {
          return { url: `/albums/${album.id}`, method: 'DELETE' };
        },
        // explanation above
        invalidatesTags(result, error, album) {
          return [{ type: 'Album', id: album.id }];
        },
      }),
    };
  },
});

export const {
  useFetchAlbumsQuery,
  useCreateAlbumMutation,
  useRemoveAlbumMutation,
} = albumsApi;

export { albumsApi };
