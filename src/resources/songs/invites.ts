// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as UsersInvitesAPI from '../users/invites';
import { APIPromise } from '../../core/api-promise';
import { buildHeaders } from '../../internal/headers';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class Invites extends APIResource {
  /**
   * Returns a list of invites
   */
  listInvites(
    songID: string,
    query: InviteListInvitesParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<UsersInvitesAPI.InviteList> {
    return this._client.get(path`/song/${songID}/invites`, { query, ...options });
  }

  /**
   * Send invites
   */
  sendInvites(songID: string, body: InviteSendInvitesParams, options?: RequestOptions): APIPromise<void> {
    return this._client.post(path`/song/${songID}/invites`, {
      body,
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }
}

export interface InviteListInvitesParams {
  after?: string;

  before?: string;

  limit?: number;

  offset?: number;
}

export interface InviteSendInvitesParams {
  emails?: Array<string>;

  message?: string;

  userIds?: Array<string>;
}

export declare namespace Invites {
  export {
    type InviteListInvitesParams as InviteListInvitesParams,
    type InviteSendInvitesParams as InviteSendInvitesParams,
  };
}
