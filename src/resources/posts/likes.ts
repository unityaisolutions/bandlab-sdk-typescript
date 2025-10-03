// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as LikesAPI from '../collections/likes';
import { APIPromise } from '../../core/api-promise';
import { buildHeaders } from '../../internal/headers';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class Likes extends APIResource {
  /**
   * Add a like
   */
  create(postID: string, options?: RequestOptions): APIPromise<void> {
    return this._client.post(path`/posts/${postID}/likes`, {
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }

  /**
   * Returns list of users
   */
  list(
    postID: string,
    query: LikeListParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<LikesAPI.UserSummaryList> {
    return this._client.get(path`/posts/${postID}/likes`, { query, ...options });
  }

  /**
   * Removes a like
   */
  delete(postID: string, options?: RequestOptions): APIPromise<void> {
    return this._client.delete(path`/posts/${postID}/likes`, {
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }
}

export interface LikeListParams {
  after?: string;

  before?: string;

  limit?: number;

  offset?: number;
}

export declare namespace Likes {
  export { type LikeListParams as LikeListParams };
}
