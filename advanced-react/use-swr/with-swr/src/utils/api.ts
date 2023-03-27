import { IComment, IPost } from '@libs/types';
import { axiosInstance as axios } from '.';

export async function postsFetcher() {
  const url = '/posts?_sort=createdAt&_order=desc';
  const { data } = await axios.get(url);
  return data as IPost[];
}

export async function postFetcher(postId: string) {
  const url = `/posts/${postId}`;
  const { data } = await axios.get(url);
  return data as IPost;
}

export async function commentsFetcher(postId: string) {
  const url = `/posts/${postId}/comments?_sort=createdAt&_order=desc`;
  const { data } = await axios.get(url);
  return data as IComment[];
}

export async function createPostMutation(input: {
  content: string;
  timestamps: number;
}) {
  const { data } = await axios.post('/posts', {
    content: input.content,
    createdAt: input.timestamps,
  });
  return data as IPost;
}

export async function createCommentMutation(input: {
  postId: string;
  content: string;
  timestamps: number;
}) {
  const { data } = await axios.post(`/posts/${input.postId}/comments`, {
    content: input.content,
    createdAt: input.timestamps,
  });
  return data as IComment;
}

export async function commonFetcher(url: string) {
  return axios.get(url).then(res => res.data);
}
