// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as GenresAPI from '../genres';
import * as MeAPI from '../me';
import * as SkillsAPI from '../skills';
import * as MembersAPI from '../bands/members';
import { APIPromise } from '../../core/api-promise';
import { buildHeaders } from '../../internal/headers';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class Members extends APIResource {
  /**
   * Returns a single member
   *
   * @example
   * ```ts
   * const groupMember =
   *   await client.communities.members.retrieve(
   *     '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   *     { communityId: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e' },
   *   );
   * ```
   */
  retrieve(
    userID: string,
    params: MemberRetrieveParams,
    options?: RequestOptions,
  ): APIPromise<MembersAPI.GroupMember> {
    const { communityId } = params;
    return this._client.get(path`/communities/${communityId}/members/${userID}`, options);
  }

  /**
   * Updates a member
   *
   * @example
   * ```ts
   * const groupMember = await client.communities.members.update(
   *   '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   *   { communityId: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e' },
   * );
   * ```
   */
  update(
    userID: string,
    params: MemberUpdateParams,
    options?: RequestOptions,
  ): APIPromise<MembersAPI.GroupMember> {
    const { communityId, ...body } = params;
    return this._client.patch(path`/communities/${communityId}/members/${userID}`, { body, ...options });
  }

  /**
   * Returns members of a band
   *
   * @example
   * ```ts
   * const groupMemberList =
   *   await client.communities.members.list(
   *     '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   *   );
   * ```
   */
  list(
    communityID: string,
    query: MemberListParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<MembersAPI.GroupMemberList> {
    return this._client.get(path`/communities/${communityID}/members`, { query, ...options });
  }

  /**
   * Removes a member
   *
   * @example
   * ```ts
   * await client.communities.members.delete(
   *   '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   *   { communityId: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e' },
   * );
   * ```
   */
  delete(userID: string, params: MemberDeleteParams, options?: RequestOptions): APIPromise<void> {
    const { communityId } = params;
    return this._client.delete(path`/communities/${communityId}/members/${userID}`, {
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }
}

export interface MemberRetrieveParams {
  communityId: string;
}

export interface MemberUpdateParams {
  /**
   * Path param:
   */
  communityId: string;

  /**
   * Body param:
   */
  id?: string;

  /**
   * Body param:
   */
  about?: string;

  /**
   * Body param:
   */
  badges?: Array<string>;

  /**
   * Body param:
   */
  counters?: MeAPI.UserCounters;

  /**
   * Body param:
   */
  createdOn?: string;

  /**
   * Body param:
   */
  genres?: Array<GenresAPI.Genre>;

  /**
   * Body param:
   */
  isTippable?: boolean;

  /**
   * Body param:
   */
  isVerified?: boolean;

  /**
   * Body param:
   */
  location?: MeAPI.Location;

  /**
   * Body param:
   */
  name?: string;

  /**
   * Body param:
   */
  picture?: MeAPI.Picture;

  /**
   * Body param:
   */
  role?: 'None' | 'Member' | 'Admin' | 'Owner';

  /**
   * Body param:
   */
  skills?: Array<SkillsAPI.Skill>;

  /**
   * Body param:
   */
  username?: string;
}

export interface MemberListParams {
  after?: string;

  before?: string;

  limit?: number;

  offset?: number;
}

export interface MemberDeleteParams {
  communityId: string;
}

export declare namespace Members {
  export {
    type MemberRetrieveParams as MemberRetrieveParams,
    type MemberUpdateParams as MemberUpdateParams,
    type MemberListParams as MemberListParams,
    type MemberDeleteParams as MemberDeleteParams,
  };
}
