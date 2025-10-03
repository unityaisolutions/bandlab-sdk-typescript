// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import { buildHeaders } from '../../internal/headers';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class Followers extends APIResource {
  /**
   * Returns user followers
   */
  list(
    userID: string,
    query: FollowerListParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<UserList> {
    return this._client.get(path`/users/${userID}/followers`, { query, ...options });
  }

  /**
   * Adds current user to the list of followers
   */
  add(userID: string, options?: RequestOptions): APIPromise<void> {
    return this._client.post(path`/users/${userID}/followers`, {
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }

  /**
   * Removes current user from the list of followers
   */
  remove(userID: string, options?: RequestOptions): APIPromise<void> {
    return this._client.delete(path`/users/${userID}/followers`, {
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }
}

export interface Paging {
  cursors?: Paging.Cursors;

  itemsCount?: number;

  limit?: number;

  offset?: number;
}

export namespace Paging {
  export interface Cursors {
    after?: string;

    before?: string;
  }
}

export interface UserList {
  data?: Array<unknown>;

  paging?: Paging;
}

export interface FollowerListParams {
  after?: string;

  before?: string;

  limit?: number;

  offset?: number;
}

export declare namespace Followers {
  export { type Paging as Paging, type UserList as UserList, type FollowerListParams as FollowerListParams };
}
