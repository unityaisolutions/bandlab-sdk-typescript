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
   *
   * @example
   * ```ts
   * const inviteList = await client.communities.invites.list(
   *   '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   * );
   * ```
   */
  list(
    communityID: string,
    query: InviteListParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<UsersInvitesAPI.InviteList> {
    return this._client.get(path`/community/${communityID}/invites`, { query, ...options });
  }

  /**
   * Send invites
   *
   * @example
   * ```ts
   * await client.communities.invites.send('communityId');
   * ```
   */
  send(communityID: string, body: InviteSendParams, options?: RequestOptions): APIPromise<void> {
    return this._client.post(path`/community/${communityID}/invites`, {
      body,
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }
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
  export { type InviteListParams as InviteListParams, type InviteSendParams as InviteSendParams };
}
