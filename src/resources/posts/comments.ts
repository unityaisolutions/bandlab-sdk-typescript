// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as BandsAPI from '../bands/bands';
import * as FollowersAPI from '../users/followers';
import { APIPromise } from '../../core/api-promise';
import { buildHeaders } from '../../internal/headers';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class Comments extends APIResource {
  /**
   * Creates a comment
   */
  create(postID: string, body: CommentCreateParams, options?: RequestOptions): APIPromise<Comment> {
    return this._client.post(path`/posts/${postID}/comments`, { body, ...options });
  }

  /**
   * Returns list of comments
   */
  list(
    postID: string,
    query: CommentListParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<CommentListResponse> {
    return this._client.get(path`/posts/${postID}/comments`, { query, ...options });
  }

  /**
   * Deletes a comment
   */
  delete(commentID: number, params: CommentDeleteParams, options?: RequestOptions): APIPromise<void> {
    const { postId } = params;
    return this._client.delete(path`/posts/${postId}/comments/${commentID}`, {
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }
}

export interface Comment {
  id?: number;

  content?: string;

  createdOn?: string;

  creator?: BandsAPI.Creator;

  timestamp?: number;
}

/**
 * Successful operation
 */
export interface CommentListResponse {
  data?: Array<unknown>;

  paging?: FollowersAPI.Paging;
}

export interface CommentCreateParams {
  id?: number;

  content?: string;

  createdOn?: string;

  creator?: BandsAPI.Creator;

  timestamp?: number;
}

export interface CommentListParams {
  after?: string;

  before?: string;

  limit?: number;

  offset?: number;
}

export interface CommentDeleteParams {
  postId: string;
}

export declare namespace Comments {
  export {
    type Comment as Comment,
    type CommentListResponse as CommentListResponse,
    type CommentCreateParams as CommentCreateParams,
    type CommentListParams as CommentListParams,
    type CommentDeleteParams as CommentDeleteParams,
  };
}
