import mongoose from 'mongoose';
import type { AuthProvidersUnion, UserRoleUnion } from '@/models';

export type CustomDate = string | number | Date;

export interface IUser {
  // this is for frontend
  id: string | mongoose.Types.ObjectId;
  name: string;
  email: string;
  role: UserRoleUnion;
  avatar?: string;
  provider?: AuthProvidersUnion;
  createdAt: CustomDate;
  updatedAt: CustomDate;
}

export interface IImage {
  url: string;
  public_id: string;
}

export interface IAuthorInfo {
  id: string;
  name: string;
  avatar?: string;
}

export interface IPost {
  // this is for frontend
  id: string;
  title: string;
  content: string;
  meta: string;
  slug: string;
  tags: string[];
  thumbnail?: IImage;
  author: string | IAuthorInfo;
  createdAt: CustomDate;
  updatedAt: CustomDate;
}

export interface ICustomError {
  message: string;
  field?: string;
}

type ICommentUser = Pick<IUser, 'name' | 'role' | 'avatar' | 'id' | 'email'>;

export interface IComment {
  id: string;
  likedByCurrentUser: boolean;
  ownedByCurrentUser: boolean;
  belongsTo: string | null | { title: string; slug: string };
  owner: ICommentUser;
  content: string;
  likes: string[]; // technically an ObjectId strings array
  repliedTo: string | null;
  chiefComment: boolean;
  replies: IComment[];
  createdAt: CustomDate;
  updatedAt: CustomDate;
  new?: boolean;
}

export type All = '*';
