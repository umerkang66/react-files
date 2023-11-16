import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

import { useMutation } from './use-mutation';
import { FinalPost } from '@/components/editor';
import { createFormData } from '@/lib/client-utils';
import { usePaginatedFetch } from './use-paginated-fetch';
import { useFetch } from './use-fetch';
import { CustomDate, IPost } from '@/types';

interface PostForServer extends FinalPost {
  id: string;
  updatedAt: CustomDate;
  createdAt: CustomDate;
}

export function usePaginatedPosts(props: {
  limit: number;
  defaultPosts?: IPost[];
}) {
  const { limit, defaultPosts } = props;
  const [hasMorePosts, setHasMorePosts] = useState(() =>
    defaultPosts ? defaultPosts.length >= limit : true,
  );

  const {
    totalData,
    fetchMoreData,
    updateTotalData,
    dataFetchedPerPage: dataPerPage,
  } = usePaginatedFetch({
    defaultValue: { posts: (defaultPosts ?? []) as IPost[] },
    valueKey: 'posts',
    url: '/api/posts',
    hasMoreData: hasMorePosts,
    lim: limit,
  });

  useEffect(() => {
    if (dataPerPage.posts.length < limit) {
      // we ran out of posts inside of our db
      setHasMorePosts(false);
    }

    if (dataPerPage.posts.length >= limit) {
      setHasMorePosts(true);
    }
  }, [dataPerPage.posts.length, totalData.posts.length, limit]);

  const updateTotalPosts = (fn: (prevPosts: IPost[]) => IPost[]) => {
    updateTotalData(prev => ({ ...prev, posts: fn(prev.posts) }));
  };

  return {
    totalPosts: totalData.posts,
    fetchMorePosts: fetchMoreData,
    hasMorePosts,
    updateTotalPosts,
  };
}

export function usePosts({ defaultPosts = [] as IPost[] }) {
  const { data, updateData, refetch } = useFetch({
    key: 'posts/fetch',
    defaultValue: { posts: defaultPosts },
    fetchOnMount: true,
    url: '/api/posts?page=1&limit=8',
  });

  return {
    posts: data.posts,
    updatePosts: updateData,
    refetchPosts: refetch,
  };
}

export function useCreatePost(props?: { onMutate?: (data: IPost) => void }) {
  const mutation = useMutation({
    defaultValue: null as null | IPost,
    method: 'post',
    url: '/api/posts',
    onMutate: data => {
      props && props.onMutate && props.onMutate(data!);
      toast.success('🚀 Post successfully created');
    },
  });
  const { mutateData: create, mutating: creating, error, data } = mutation;

  const createPost = (post: FinalPost) => {
    // formData
    const form = createFormData({
      ...post,
      tags:
        Object.keys(post).includes('tags') && post.tags
          ? JSON.stringify(post.tags.split(',').map(tag => tag.trim()))
          : null,
    });

    create(form);
  };

  return { createPost, creating, error, data };
}

export function useUpdatePost(props?: { onMutate?: (data: IPost) => void }) {
  const mutation = useMutation({
    defaultValue: null as null | IPost,
    method: 'patch',
    onMutate: data => {
      props && props.onMutate && props.onMutate(data!);
      toast.success('🚀 Post successfully updated');
    },
  });
  const { mutateData: update, mutating: updating, error, data } = mutation;

  const updatePost = (post: FinalPost) => {
    const body = post as PostForServer;

    const form = createFormData({
      ...body,
      tags: body.tags
        ? JSON.stringify(body.tags.split(',').map(tag => tag.trim()))
        : null,
      thumbnail:
        body.thumbnail instanceof File
          ? body.thumbnail
          : JSON.stringify(body.thumbnail),
    });

    update(form, `/api/posts/${body.id}`);
  };

  return { updatePost, updating, error, data };
}

export function useDeletePost(props?: { onMutate?: (id: string) => void }) {
  const mutation = useMutation({
    defaultValue: null as null | { message: string },
    method: 'delete',
  });
  const { mutateData, mutating: deleting, error } = mutation;

  const deletePost = async (id: string) => {
    await mutateData(null, `/api/posts/${id}`);
    props && props.onMutate && props.onMutate(id);
    toast.success('🚀 Post successfully deleted');
  };

  return { deletePost, deleting, error };
}

export function useLikeStatus(postId: string) {
  const { data, updateData, refetch } = useFetch({
    key: `posts/like-status/fetch/${postId}`,
    defaultValue: {
      likes: [] as string[],
      likedByCurrentUser: false,
    },
    fetchOnMount: true,
    url: `/api/posts/like-status?postId=${postId}`,
    dontAddFromCacheBeforeFetching: true,
  });

  return { data, updateLikeStatus: updateData, refetchLikeStatus: refetch };
}

export function useUpdateLike(props?: {
  onMutate?: (data: {
    likes: string[];
    likedByCurrentUser: boolean;
    message: '' | 'User like added' | 'User like removed';
  }) => void;
}) {
  const mutation = useMutation({
    defaultValue: {
      likes: [] as string[],
      likedByCurrentUser: false,
      message: '' as '' | 'User like added' | 'User like removed',
    },
    method: 'post',
    url: '/api/posts/update-like',
    onMutate: data => {
      props && props.onMutate && props.onMutate(data!);
      toast.success('🚀 Post liked');
    },
  });

  const { mutateData, mutating: liking } = mutation;

  const updateLike = (postId: string) => {
    return mutateData({ postId });
  };

  return { updateLike, liking };
}

export function useSearchPosts(query: string) {
  const { data, loading, updateData, refetch } = useFetch({
    key: `posts/search/${query}`,
    defaultValue: { posts: [] as IPost[] },
    fetchOnMount: true,
    url: `/api/posts/search?search=${query}`,
  });

  return {
    posts: data.posts,
    loading,
    updatePosts: updateData,
    refetchPosts: refetch,
  };
}
