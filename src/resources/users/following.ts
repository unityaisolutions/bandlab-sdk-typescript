// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as PostsAPI from '../posts/posts';
import * as FollowersAPI from './followers';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class Following extends APIResource {
  /**
   * Returns user following
   */
  list(
    userID: string,
    query: FollowingListParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<FollowersAPI.UserList> {
    return this._client.get(path`/users/${userID}/following`, { query, ...options });
  }

  /**
   * Returns a list of posts
   */
  listPosts(
    userID: string,
    query: FollowingListPostsParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<PostsAPI.PostList> {
    return this._client.get(path`/users/${userID}/following/posts`, { query, ...options });
  }
}

export interface FollowingListParams {
  after?: string;

  before?: string;

  limit?: number;

  offset?: number;
}

export interface FollowingListPostsParams {
  after?: string;

  before?: string;

  limit?: number;

  offset?: number;
}

export declare namespace Following {
  export {
    type FollowingListParams as FollowingListParams,
    type FollowingListPostsParams as FollowingListPostsParams,
  };
}
