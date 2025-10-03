// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as Shared from '../shared';
import * as BandsAPI from '../bands/bands';
import * as CommentsAPI from '../posts/comments';
import { APIPromise } from '../../core/api-promise';
import { buildHeaders } from '../../internal/headers';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class Posts extends APIResource {
  /**
   * Returns a single post
   *
   * @example
   * ```ts
   * const post = await client.collections.posts.retrieve(
   *   '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   *   { collectionId: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e' },
   * );
   * ```
   */
  retrieve(postID: string, params: PostRetrieveParams, options?: RequestOptions): APIPromise<Post> {
    const { collectionId } = params;
    return this._client.get(path`/collections/${collectionId}/posts/${postID}`, options);
  }

  /**
   * Add post to a collection
   *
   * @example
   * ```ts
   * const post = await client.collections.posts.add(
   *   '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   *   { collectionId: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e' },
   * );
   * ```
   */
  add(postID: string, params: PostAddParams, options?: RequestOptions): APIPromise<Post> {
    const { collectionId } = params;
    return this._client.post(path`/collections/${collectionId}/posts/${postID}`, options);
  }

  /**
   * Removes a post
   *
   * @example
   * ```ts
   * await client.collections.posts.remove(
   *   '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   *   { collectionId: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e' },
   * );
   * ```
   */
  remove(postID: string, params: PostRemoveParams, options?: RequestOptions): APIPromise<void> {
    const { collectionId } = params;
    return this._client.delete(path`/collections/${collectionId}/posts/${postID}`, {
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }

  /**
   * Updates position of post
   *
   * @example
   * ```ts
   * await client.collections.posts.updatePosition(
   *   '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   *   { collectionId: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e' },
   * );
   * ```
   */
  updatePosition(
    postID: string,
    params: PostUpdatePositionParams,
    options?: RequestOptions,
  ): APIPromise<void> {
    const { collectionId, ...body } = params;
    return this._client.patch(path`/collections/${collectionId}/posts/${postID}`, {
      body,
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }
}

export type ClientID = 'Angular' | 'iOS' | 'Android' | 'Assistant';

export interface Post {
  id?: string;

  caption?: string;

  clientId?: ClientID;

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

export type Status = 'Empty' | 'NotReady' | 'Processing' | 'Ready' | 'Corrupted';

export interface PostRetrieveParams {
  collectionId: string;
}

export interface PostAddParams {
  collectionId: string;
}

export interface PostRemoveParams {
  collectionId: string;
}

export interface PostUpdatePositionParams {
  /**
   * Path param:
   */
  collectionId: string;

  /**
   * Body param:
   */
  order?: number;
}

export declare namespace Posts {
  export {
    type ClientID as ClientID,
    type Post as Post,
    type Status as Status,
    type PostRetrieveParams as PostRetrieveParams,
    type PostAddParams as PostAddParams,
    type PostRemoveParams as PostRemoveParams,
    type PostUpdatePositionParams as PostUpdatePositionParams,
  };
}
