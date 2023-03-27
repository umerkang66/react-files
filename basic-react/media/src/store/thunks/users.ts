import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { faker } from '@faker-js/faker';
import { User } from '../types';

const baseUrl = 'http://localhost:3005/users';

export const fetchUsers = createAsyncThunk<User[]>('users/fetch', async () => {
  const { data } = await axios.get<User[]>(baseUrl);

  // whatever we returned from here, is going to be returned from fulfilled action payload
  return data;
});

export const addUser = createAsyncThunk<User>('users/add', async () => {
  const { data } = await axios.post<User>(baseUrl, {
    name: faker.name.fullName(),
  });

  // whatever we returned from here, is going to be returned from fulfilled action payload
  return data;
});

// first type argument is returnedType, and second is argType, both are same "id"
export const deleteUser = createAsyncThunk<number, number>(
  'users/delete',
  async id => {
    await axios.delete(`${baseUrl}/${id}`);

    return id;
  }
);
