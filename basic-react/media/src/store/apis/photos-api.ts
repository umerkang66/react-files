import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { faker } from '@faker-js/faker';

import { Album, Photo } from '../types';

const photosApi = createApi({
  reducerPath: 'photos',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3005',
  }),
  tagTypes: ['Photo', 'AlbumsPhoto'],
  endpoints(builder) {
    return {
      fetchPhotos: builder.query<Photo[], Album>({
        query(album) {
          return {
            url: '/photos',
            params: { albumId: album.id },
            method: 'GET',
          };
        },
        providesTags(result, error, album) {
          // new query is created every time, this hook is being called
          // create tag for every photo
          // which tag is deleted from query, that whole query will rerun
          const photoTags = result
            ? result.map(photo => ({ type: 'Photo' as const, id: photo.id }))
            : [];

          // and for every album
          return [...photoTags, { type: 'AlbumsPhoto', id: album.id }];
        },
      }),

      createPhoto: builder.mutation<Photo, Album>({
        query(album) {
          return {
            url: '/photos',
            method: 'POST',
            body: {
              albumId: album.id,
              url: faker.image.abstract(150, 150, true),
            },
          };
        },
        invalidatesTags(result, error, album) {
          return [{ type: 'AlbumsPhoto', id: album.id }];
        },
      }),

      removePhoto: builder.mutation<Photo, Photo>({
        query(photo) {
          return { method: 'DELETE', url: `/photos/${photo.id}` };
        },
        invalidatesTags(result, error, photo) {
          return [{ type: 'Photo', id: photo.id }];
        },
      }),
    };
  },
});

export const {
  useFetchPhotosQuery,
  useCreatePhotoMutation,
  useRemovePhotoMutation,
} = photosApi;

export { photosApi };
