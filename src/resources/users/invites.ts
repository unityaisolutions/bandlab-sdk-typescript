// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as FollowersAPI from './followers';
import { APIPromise } from '../../core/api-promise';
import { buildHeaders } from '../../internal/headers';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class Invites extends APIResource {
  /**
   * Returns a list of invites
   */
  list(
    userID: string,
    query: InviteListParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<InviteList> {
    return this._client.get(path`/users/${userID}/invites`, { query, ...options });
  }

  /**
   * Send invites
   */
  send(userID: string, body: InviteSendParams, options?: RequestOptions): APIPromise<void> {
    return this._client.post(path`/users/${userID}/invites`, {
      body,
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }
}

export interface InviteList {
  data?: Array<unknown>;

  paging?: FollowersAPI.Paging;
}

export interface InviteListParams {
  after?: string;

  before?: string;

  limit?: number;

  offset?: number;
}

export interface InviteSendParams {
  emails?: Array<string>;

  message?: string;

  userIds?: Array<string>;
}

export declare namespace Invites {
  export {
    type InviteList as InviteList,
    type InviteListParams as InviteListParams,
    type InviteSendParams as InviteSendParams,
  };
}
