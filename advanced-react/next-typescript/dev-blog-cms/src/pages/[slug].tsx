import {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
  type NextPage,
} from 'next';
import parse from 'html-react-parser';
import Image from 'next/image';
import dateFormat from 'dateformat';

import { DefaultLayout } from '@/components/layout/default-layout';
import { getPost, getPosts } from '@/lib/server-utils-for-client';
import { IAuthorInfo, IPost } from '@/types';
import { Comments } from '@/components/common/comments';
import { LikeHeart } from '@/components/common/like-heart';
import { useLikeStatus, useUpdateLike } from '@/hooks/post-hooks';
import { AuthorInfoProfile } from '@/components/common/author-info-profile';
import { Share } from '@/components/common/share';
import { Post } from '@/models';
import Link from 'next/link';

const host = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : 'http://localhost:3000/';

type Props = InferGetStaticPropsType<typeof getStaticProps>;

const PostPage: NextPage<Props> = ({ post, relatedPosts }) => {
  const { data, updateLikeStatus, refetchLikeStatus } = useLikeStatus(
    post ? post.id : '',
  );

  const { updateLike, liking } = useUpdateLike({
    onMutate: ({ likes, likedByCurrentUser }) => {
      updateLikeStatus(() => ({ likes, likedByCurrentUser }));
      refetchLikeStatus();
    },
  });

  if (!post) return null;

  const { title, thumbnail, tags, meta, content, createdAt, id } = post;

  return (
    <DefaultLayout title={title} desc={meta}>
      <div className="px-3 pb-20 lg:px-0">
        <h1 className="py-10 text-6xl font-semibold text-primary-dark dark:text-primary">
          {title}
        </h1>

        {thumbnail && thumbnail.url && (
          <div className="relative aspect-video py-2">
            <Image src={thumbnail.url} alt={title} layout="fill" />
          </div>
        )}

        <div className="flex items-center justify-between py-2 text-secondary-dark dark:text-secondary-light">
          <div>
            {tags.map((t, i) => (
              <span key={t + i}>#{t}</span>
            ))}
          </div>
          <span>{dateFormat(createdAt, 'd-mmm-yyyy')}</span>
        </div>

        <div className="sticky top-0 z-50 bg-primary py-5 transition dark:bg-primary-dark">
          <Share url={host + post.slug} />
        </div>

        <div className="prose prose-lg mx-auto max-w-full dark:prose-invert">
          {parse(content)}
        </div>

        <div className="py-10">
          <LikeHeart
            label={`${data.likes.length} likes`}
            liked={data.likedByCurrentUser}
            busy={liking}
            onClick={() => updateLike(id)}
          />
        </div>

        <div className="pt-5">
          <AuthorInfoProfile profile={post.author as IAuthorInfo} />
        </div>

        <div className="pt-5">
          <h3 className="mb-4 bg-secondary-dark p-2 text-xl font-semibold text-primary">
            Related Posts
          </h3>

          <div className="flex flex-col space-y-4">
            {relatedPosts.map(post => (
              <Link
                className="font-semibold text-primary-dark hover:underline dark:text-primary"
                key={post.id}
                href={'/' + post.slug}
              >
                {post.title}
              </Link>
            ))}
          </div>
        </div>

        <div className="py-10">
          <Comments postId={id} />
        </div>
      </div>
    </DefaultLayout>
  );
};

export const getStaticProps: GetStaticProps<
  {
    post: IPost | null;
    relatedPosts: { id: string; title: string; slug: string }[];
  },
  { slug: string }
> = async context => {
  const slug = context.params!.slug;
  const post = await getPost(slug);

  if (!post) {
    return { props: { post, relatedPosts: [] }, notFound: !post };
  }

  const relatedPostsRaw = await Post.find({
    tags: { $in: post!.tags },
    _id: { $ne: post!.id },
  });
  const relatedPosts = JSON.parse(
    JSON.stringify(relatedPostsRaw.map(post => post.toJSON())),
  );

  return { props: { post, relatedPosts }, notFound: !post };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const slugs = (
    await getPosts({ page: 1, limit: Number.MAX_SAFE_INTEGER }, 'slug')
  ).map(post => post.slug);

  const paths = slugs.map(slug => ({ params: { slug } }));

  return {
    paths,
    fallback: true, // 'blocking' is the same as true, but block the page, until data arrives
  };
};

export default PostPage;
