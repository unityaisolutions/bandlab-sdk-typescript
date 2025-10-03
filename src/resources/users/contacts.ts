// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as LikesAPI from '../collections/likes';
import * as FollowersAPI from './followers';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class Contacts extends APIResource {
  /**
   * Returns list of bands
   */
  listBands(
    userID: string,
    query: ContactListBandsParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<ContactListBandsResponse> {
    return this._client.get(path`/users/${userID}/contacts/bands`, { query, ...options });
  }

  /**
   * Returns list of users
   */
  listUsers(
    userID: string,
    query: ContactListUsersParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<LikesAPI.UserSummaryList> {
    return this._client.get(path`/users/${userID}/contacts/users`, { query, ...options });
  }
}

/**
 * Successful operation
 */
export interface ContactListBandsResponse {
  data?: Array<unknown>;

  paging?: FollowersAPI.Paging;
}

export interface ContactListBandsParams {
  after?: string;

  before?: string;

  limit?: number;

  offset?: number;
}

export interface ContactListUsersParams {
  after?: string;

  before?: string;

  limit?: number;

  offset?: number;
}

export declare namespace Contacts {
  export {
    type ContactListBandsResponse as ContactListBandsResponse,
    type ContactListBandsParams as ContactListBandsParams,
    type ContactListUsersParams as ContactListUsersParams,
  };
}
