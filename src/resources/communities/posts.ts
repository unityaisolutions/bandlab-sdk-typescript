// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as Shared from '../shared';
import * as BandsAPI from '../bands/bands';
import * as PostsAPI from '../collections/posts';
import * as CommentsAPI from '../posts/comments';
import * as PostsPostsAPI from '../posts/posts';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class Posts extends APIResource {
  /**
   * Create a text post
   *
   * @example
   * ```ts
   * const post = await client.communities.posts.create(
   *   'communityId',
   * );
   * ```
   */
  create(communityID: string, body: PostCreateParams, options?: RequestOptions): APIPromise<PostsAPI.Post> {
    return this._client.post(path`/community/${communityID}/posts`, { body, ...options });
  }

  /**
   * Returns a list of posts
   *
   * @example
   * ```ts
   * const postList = await client.communities.posts.list(
   *   '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   * );
   * ```
   */
  list(
    communityID: string,
    query: PostListParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<PostsPostsAPI.PostList> {
    return this._client.get(path`/community/${communityID}/posts`, { query, ...options });
  }
}

export interface PostCreateParams {
  id?: string;

  caption?: string;

  clientId?: PostsAPI.ClientID;

  comments?: Array<CommentsAPI.Comment>;

  counters?: Shared.PostCounters;

  createdOn?: string;

  creator?: BandsAPI.Creator;

  image?: Shared.ImageSample;

  message?: string;

  revision?: Shared.RevisionSummary;

  type?: 'Revision' | 'Image' | 'Video' | 'Text';

  video?: Shared.VideoSample;
}

export interface PostListParams {
  after?: string;

  before?: string;

  limit?: number;

  offset?: number;
}

export declare namespace Posts {
  export { type PostCreateParams as PostCreateParams, type PostListParams as PostListParams };
}
