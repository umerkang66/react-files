import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';

import { usersReducer } from './slices/users-slice';
import { albumsApi } from './apis/albums-api';
import { photosApi } from './apis/photos-api';

const store = configureStore({
  reducer: {
    users: usersReducer,
    // "albumsApi" will look up the key in store, if it is same as the "reducerPath"
    // if they are not the same, this would not work
    [albumsApi.reducerPath]: albumsApi.reducer,
    [photosApi.reducerPath]: photosApi.reducer,
  },
  middleware(getDefaultMiddleware) {
    return getDefaultMiddleware()
      .concat(albumsApi.middleware)
      .concat(photosApi.middleware);
  },
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export * from './types';
export * from './thunks/users';
export {
  useFetchAlbumsQuery,
  useCreateAlbumMutation,
  useRemoveAlbumMutation,
} from './apis/albums-api';
export {
  useFetchPhotosQuery,
  useCreatePhotoMutation,
  useRemovePhotoMutation,
} from './apis/photos-api';

export { store };
