import { type Ref, modelOptions, prop, index, pre } from '@typegoose/typegoose';
import { DocumentType, getModelForClass } from '@typegoose/typegoose';
import { IUser, type CustomDate } from '@/types';

@modelOptions({ schemaOptions: { _id: false } })
class ThumbnailClass {
  @prop({ required: true, type: () => String, trim: true })
  url: string;

  @prop({ required: true, type: () => String, trim: true })
  public_id: string;
}

@modelOptions({
  schemaOptions: {
    collection: 'posts',
    timestamps: true,
    toJSON: {
      // whenever JSON.stringify() will be called on document, this object will use this configs
      transform(doc, ret) {
        // after converting into plain obj, the object that is returned is "ret", we can modify that ret, it doesn't change the document in mongodb, but rather when it is turned into JSON by express
        ret.id = doc._id;
        delete ret._id;
        delete ret.__v;
      },
    },
  },
})
@pre<PostClass>(new RegExp(/^find/), function (next) {
  this.sort({ createdAt: 'desc' });
  next();
})
class PostClass {
  @prop({ required: true, type: () => String, trim: true })
  title: string;

  @prop({ required: true, type: () => String, trim: true })
  content: string;

  @prop({ required: true, type: () => String, trim: true })
  meta: string;

  @prop({ required: true, type: () => String, trim: true, unique: true })
  slug: string;

  @prop({ type: () => [String], default: [] })
  tags: string[];

  // Here we are not using the 'SubDocumentType' because we don't want all the document props of Thumbnail Document, because we just deleted the '_id' prop
  @prop({ type: () => ThumbnailClass })
  thumbnail: ThumbnailClass;

  @prop({ required: true, ref: () => UserClass })
  author: Ref<UserClass>;

  @prop({ ref: () => UserClass, default: [] })
  likes: Ref<UserClass>[];

  @prop({ type: () => Boolean, default: false })
  likedByCurrentUser: boolean;

  public populateWithCurrentUserProps(this: PostDocument, user: IUser): void {
    // likes are not populated, so we don't have to use 'like.id', we can just use, 'like' or 'like.toString()' both are same.
    this.likedByCurrentUser = !!this.likes.find(
      like => like.toString() === user.id.toString(),
    );
  }
}

enum UserRole {
  user = 'user',
  admin = 'admin',
}
// this will create union out of enum values
export type UserRoleUnion = `${UserRole}`;
// if you want to create union out of enum keys
// type UserRoleKeyUnion = keyof typeof UserRole;

enum AuthProviders {
  // currently we are only using github
  github = 'github',
  google = 'google',
}
export type AuthProvidersUnion = `${AuthProviders}`;

@modelOptions({
  schemaOptions: {
    collection: 'users',
    timestamps: true,
    toJSON: {
      transform(doc, ret, options) {
        ret.id = doc._id; // 'doc._id' is actually an instance of ObjectId, that will be converted to string automatically
        delete ret._id;
        delete ret.__v;
      },
    },
  },
})
@pre<UserClass>(new RegExp(/^find/), function (next) {
  this.sort({ createdAt: 'desc' });
  next();
})
class UserClass {
  @prop({
    required: true,
    trim: true,
    type: () => String,
  })
  name: string;

  @prop({
    required: true,
    trim: true,
    type: () => String,
    unique: true,
  })
  email: string;

  @prop({
    trim: true,
    type: () => String,
    enum: UserRole,
    default: 'user',
  })
  role: UserRoleUnion;

  @prop({
    trim: true,
    type: () => String,
    enum: AuthProviders,
    default: 'github',
  })
  provider: AuthProvidersUnion;

  // this avatar is from github, not cloudinary, so not public_id
  @prop({
    trim: true,
    type: () => String,
  })
  avatar?: string;

  @prop({ type: () => Date })
  createdAt: CustomDate;

  @prop({ type: () => Date })
  updatedAt: CustomDate;
}

// bcs, when deleting the comment, we have to delete all the its replies
// wo we have to find the all replies (by its parent: repliedTo)
@index({ repliedTo: 'asc' })
@modelOptions({
  schemaOptions: {
    collection: 'comments',
    timestamps: true,
    toObject: { virtuals: true },
    toJSON: {
      transform(doc, ret, options) {
        ret.id = doc._id;
        delete ret._id;
        delete ret.__v;
      },
      virtuals: true,
    },
  },
})
@pre<CommentClass>(new RegExp(/^find/), function (next) {
  this.sort({ createdAt: 'desc' });
  next();
})
class CommentClass {
  // the post to which the comments belongs to
  @prop({ default: null, ref: () => PostClass })
  belongsTo: Ref<PostClass> | null;

  @prop({ required: true, ref: () => UserClass })
  owner: Ref<UserClass>;

  @prop({ required: true, type: () => String })
  content: string;

  @prop({
    required: true,
    ref: () => UserClass,
    default: [],
  })
  likes: Ref<UserClass>[];

  // VIRTUAL POPULATE (also for this, we have to call the populate method, and add 'virtuals: true' in toJSON(), and toObject())
  @prop({
    ref: () => CommentClass,
    foreignField: 'repliedTo',
    localField: '_id',
    default: [],
  })
  replies: Ref<CommentClass>[];

  // this comment can be a reply to other comment, to which comment this comment is replied to
  @prop({
    ref: () => CommentClass,
    default: null,
  })
  repliedTo: Ref<CommentClass> | null;

  @prop({ type: () => Boolean, default: true })
  chiefComment: boolean;

  @prop({ type: () => Boolean, default: false })
  ownedByCurrentUser: boolean;

  @prop({ type: () => Boolean, default: false })
  likedByCurrentUser: boolean;

  public populateWithCurrentUserProps(
    this: CommentDocument,
    user: IUser,
  ): void {
    // 'owner' prop is populated, so we have to use the 'owner.id' prop
    const owner = this.owner?.id ? this.owner.id : this.owner.toString();

    this.ownedByCurrentUser = owner === user.id.toString();

    if (user.role === 'admin') {
      // if user is 'admin' allow access to the ownership also to owner, and the admin
      this.ownedByCurrentUser = true;
    }

    // likes are not populated, so we don't have to use 'like.id', we can just use, 'like' or 'like.toString()' both are same.
    this.likedByCurrentUser = !!this.likes.find(
      like => like.toString() === user.id.toString(),
    );
  }
}

export const User = getModelForClass(UserClass);
export type UserDocument = DocumentType<UserClass>;

export const Post = getModelForClass(PostClass);
export type PostDocument = DocumentType<PostClass>;

export const Comment = getModelForClass(CommentClass);
export type CommentDocument = DocumentType<CommentClass>;
