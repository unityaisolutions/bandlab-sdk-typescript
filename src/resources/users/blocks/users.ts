// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../core/resource';
import * as LikesAPI from '../../collections/likes';
import { APIPromise } from '../../../core/api-promise';
import { buildHeaders } from '../../../internal/headers';
import { RequestOptions } from '../../../internal/request-options';
import { path } from '../../../internal/utils/path';

export class Users extends APIResource {
  /**
   * Returns list of users
   */
  list(
    userID: string,
    query: UserListParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<LikesAPI.UserSummaryList> {
    return this._client.get(path`/users/${userID}/blocks/users`, { query, ...options });
  }

  /**
   * Blocks a user
   */
  add(blockedUserID: string, params: UserAddParams, options?: RequestOptions): APIPromise<void> {
    const { userId } = params;
    return this._client.post(path`/users/${userId}/blocks/users/${blockedUserID}`, {
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }

  /**
   * Unblocks a user
   */
  remove(blockedUserID: string, params: UserRemoveParams, options?: RequestOptions): APIPromise<void> {
    const { userId } = params;
    return this._client.delete(path`/users/${userId}/blocks/users/${blockedUserID}`, {
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }
}

export interface UserListParams {
  after?: string;

  before?: string;

  limit?: number;

  offset?: number;
}

export interface UserAddParams {
  userId: string;
}

export interface UserRemoveParams {
  userId: string;
}

export declare namespace Users {
  export {
    type UserListParams as UserListParams,
    type UserAddParams as UserAddParams,
    type UserRemoveParams as UserRemoveParams,
  };
}
