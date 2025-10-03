// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as MeAPI from '../me';
import * as BandsAPI from '../bands/bands';
import * as CommunitiesAPI from '../communities/communities';
import * as CommentsAPI from './comments';
import {
  Comment,
  CommentCreateParams,
  CommentDeleteParams,
  CommentListParams,
  CommentListResponse,
  Comments,
} from './comments';
import * as LikesAPI from './likes';
import { LikeListParams, Likes } from './likes';
import * as SongsAPI from '../songs/songs';
import * as FollowersAPI from '../users/followers';
import { APIPromise } from '../../core/api-promise';
import { buildHeaders } from '../../internal/headers';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class Posts extends APIResource {
  comments: CommentsAPI.Comments = new CommentsAPI.Comments(this._client);
  likes: LikesAPI.Likes = new LikesAPI.Likes(this._client);

  /**
   * Returns a single post
   */
  retrieve(postID: string, options?: RequestOptions): APIPromise<Invite> {
    return this._client.get(path`/posts/${postID}`, options);
  }

  /**
   * Updates a post
   */
  update(postID: string, options?: RequestOptions): APIPromise<void> {
    return this._client.patch(path`/posts/${postID}`, {
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }

  /**
   * Get a list of posts
   */
  list(query: PostListParams | null | undefined = {}, options?: RequestOptions): APIPromise<PostList> {
    return this._client.get('/posts', { query, ...options });
  }

  /**
   * Deletes a post
   */
  delete(postID: string, options?: RequestOptions): APIPromise<void> {
    return this._client.delete(path`/posts/${postID}`, {
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }
}

export interface Invite {
  message: string;

  id?: string;

  band?: Invite.Band;

  community?: Invite.Community;

  createdOn?: string;

  email?: string;

  isUserRequest?: boolean;

  sender?: UserSummary;

  song?: SongSummary;

  text?: string;

  type?:
    | 'RequestToBand'
    | 'RequestToSong'
    | 'RequestToCommunity'
    | 'InviteToBand'
    | 'InviteToSong'
    | 'InviteToCommunity'
    | 'ExternalInviteToBand'
    | 'ExternalInviteToSong'
    | 'ExternalInviteToBandLab';

  user?: UserSummary;
}

export namespace Invite {
  export interface Band {
    id?: string;

    counters?: BandsAPI.BandCounters;

    name?: string;

    picture?: MeAPI.Picture;

    username?: string;
  }

  export interface Community {
    id?: string;

    about?: string;

    counters?: CommunitiesAPI.CommunityCounters;

    createdOn?: string;

    name?: string;

    picture?: MeAPI.Picture;

    type?: CommunitiesAPI.Type;

    username?: string;
  }
}

export interface PostList {
  data?: Array<unknown>;

  paging?: FollowersAPI.Paging;
}

export interface SongSummary {
  id?: string;

  author?: SongsAPI.Author;

  counters?: SongsAPI.SongCounters;

  createdOn?: string;

  description?: string;

  isFork?: boolean;

  isForkable?: boolean;

  isPublic?: boolean;

  name?: string;

  original?: SongsAPI.SongOriginal;

  picture?: MeAPI.Picture;

  slug?: string;
}

export interface UserSummary {
  id?: string;

  counters?: MeAPI.UserCounters;

  isVerified?: boolean;

  name?: string;

  picture?: MeAPI.Picture;

  username?: string;
}

export interface PostListParams {
  after?: string;

  before?: string;

  forkable?: boolean;

  genres?: string;

  limit?: number;

  offset?: number;

  sort?: 'recent' | 'popular' | 'inspiring';

  spotlights?: string;

  tag?: string;

  types?: string;
}

Posts.Comments = Comments;
Posts.Likes = Likes;

export declare namespace Posts {
  export {
    type Invite as Invite,
    type PostList as PostList,
    type SongSummary as SongSummary,
    type UserSummary as UserSummary,
    type PostListParams as PostListParams,
  };

  export {
    Comments as Comments,
    type Comment as Comment,
    type CommentListResponse as CommentListResponse,
    type CommentCreateParams as CommentCreateParams,
    type CommentListParams as CommentListParams,
    type CommentDeleteParams as CommentDeleteParams,
  };

  export { Likes as Likes, type LikeListParams as LikeListParams };
}
