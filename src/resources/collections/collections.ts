// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as MeAPI from '../me';
import * as BandsAPI from '../bands/bands';
import * as LikesAPI from './likes';
import { LikeListParams, Likes, UserSummaryList } from './likes';
import * as PostsAPI from './posts';
import {
  ClientID,
  Post,
  PostAddParams,
  PostRemoveParams,
  PostRetrieveParams,
  PostUpdatePositionParams,
  Posts,
  Status,
} from './posts';
import { APIPromise } from '../../core/api-promise';
import { buildHeaders } from '../../internal/headers';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class Collections extends APIResource {
  posts: PostsAPI.Posts = new PostsAPI.Posts(this._client);
  likes: LikesAPI.Likes = new LikesAPI.Likes(this._client);

  /**
   * Create a new collection
   *
   * @example
   * ```ts
   * const collection = await client.collections.create({
   *   name: 'name',
   * });
   * ```
   */
  create(body: CollectionCreateParams, options?: RequestOptions): APIPromise<Collection> {
    return this._client.post('/collections', { body, ...options });
  }

  /**
   * Returns a single collection
   *
   * @example
   * ```ts
   * const collection = await client.collections.retrieve(
   *   '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   * );
   * ```
   */
  retrieve(collectionID: string, options?: RequestOptions): APIPromise<Collection> {
    return this._client.get(path`/collections/${collectionID}`, options);
  }

  /**
   * Updates a collection
   *
   * @example
   * ```ts
   * const collection = await client.collections.update(
   *   '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   *   { name: 'name' },
   * );
   * ```
   */
  update(
    collectionID: string,
    body: CollectionUpdateParams,
    options?: RequestOptions,
  ): APIPromise<Collection> {
    return this._client.patch(path`/collections/${collectionID}`, { body, ...options });
  }

  /**
   * Deletes a collection
   *
   * @example
   * ```ts
   * await client.collections.delete(
   *   '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   * );
   * ```
   */
  delete(collectionID: string, options?: RequestOptions): APIPromise<void> {
    return this._client.delete(path`/collections/${collectionID}`, {
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }
}

export interface Collection {
  name: string;

  id?: string;

  counters?: CollectionCounters;

  createdOn?: string;

  creator?: BandsAPI.Creator;

  description?: string;

  isPublic?: boolean;

  lastUpdatedOn?: string;

  picture?: MeAPI.Picture;

  posts?: Array<PostsAPI.Post>;

  type?: 'Playlist' | 'Album';
}

export interface CollectionCounters {
  items?: number;

  likes?: number;
}

export interface CollectionCreateParams {
  name: string;

  id?: string;

  counters?: CollectionCounters;

  createdOn?: string;

  creator?: BandsAPI.Creator;

  description?: string;

  isPublic?: boolean;

  lastUpdatedOn?: string;

  picture?: MeAPI.Picture;

  posts?: Array<PostsAPI.Post>;

  type?: 'Playlist' | 'Album';
}

export interface CollectionUpdateParams {
  name: string;

  id?: string;

  counters?: CollectionCounters;

  createdOn?: string;

  creator?: BandsAPI.Creator;

  description?: string;

  isPublic?: boolean;

  lastUpdatedOn?: string;

  picture?: MeAPI.Picture;

  posts?: Array<PostsAPI.Post>;

  type?: 'Playlist' | 'Album';
}

Collections.Posts = Posts;
Collections.Likes = Likes;

export declare namespace Collections {
  export {
    type Collection as Collection,
    type CollectionCounters as CollectionCounters,
    type CollectionCreateParams as CollectionCreateParams,
    type CollectionUpdateParams as CollectionUpdateParams,
  };

  export {
    Posts as Posts,
    type ClientID as ClientID,
    type Post as Post,
    type Status as Status,
    type PostRetrieveParams as PostRetrieveParams,
    type PostAddParams as PostAddParams,
    type PostRemoveParams as PostRemoveParams,
    type PostUpdatePositionParams as PostUpdatePositionParams,
  };

  export { Likes as Likes, type UserSummaryList as UserSummaryList, type LikeListParams as LikeListParams };
}
