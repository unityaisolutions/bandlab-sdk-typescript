// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as GenresAPI from '../genres';
import * as MeAPI from '../me';
import * as SkillsAPI from '../skills';
import * as FollowersAPI from '../users/followers';
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
   * const groupMember = await client.bands.members.retrieve(
   *   '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   *   { bandId: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e' },
   * );
   * ```
   */
  retrieve(userID: string, params: MemberRetrieveParams, options?: RequestOptions): APIPromise<GroupMember> {
    const { bandId } = params;
    return this._client.get(path`/bands/${bandId}/members/${userID}`, options);
  }

  /**
   * Updates a member
   *
   * @example
   * ```ts
   * const groupMember = await client.bands.members.update(
   *   '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   *   { bandId: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e' },
   * );
   * ```
   */
  update(userID: string, params: MemberUpdateParams, options?: RequestOptions): APIPromise<GroupMember> {
    const { bandId, ...body } = params;
    return this._client.patch(path`/bands/${bandId}/members/${userID}`, { body, ...options });
  }

  /**
   * Returns members of a band
   *
   * @example
   * ```ts
   * const groupMemberList = await client.bands.members.list(
   *   '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   * );
   * ```
   */
  list(
    bandID: string,
    query: MemberListParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<GroupMemberList> {
    return this._client.get(path`/bands/${bandID}/members`, { query, ...options });
  }

  /**
   * Removes a member
   *
   * @example
   * ```ts
   * await client.bands.members.remove(
   *   '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   *   { bandId: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e' },
   * );
   * ```
   */
  remove(userID: string, params: MemberRemoveParams, options?: RequestOptions): APIPromise<void> {
    const { bandId } = params;
    return this._client.delete(path`/bands/${bandId}/members/${userID}`, {
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }
}

export interface GroupMember {
  id?: string;

  about?: string;

  badges?: Array<string>;

  counters?: MeAPI.UserCounters;

  createdOn?: string;

  genres?: Array<GenresAPI.Genre>;

  isTippable?: boolean;

  isVerified?: boolean;

  location?: MeAPI.Location;

  name?: string;

  picture?: MeAPI.Picture;

  role?: 'None' | 'Member' | 'Admin' | 'Owner';

  skills?: Array<SkillsAPI.Skill>;

  username?: string;
}

export interface GroupMemberList {
  data?: Array<unknown>;

  paging?: FollowersAPI.Paging;
}

export interface MemberRetrieveParams {
  bandId: string;
}

export interface MemberUpdateParams {
  /**
   * Path param:
   */
  bandId: string;

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

export interface MemberRemoveParams {
  bandId: string;
}

export declare namespace Members {
  export {
    type GroupMember as GroupMember,
    type GroupMemberList as GroupMemberList,
    type MemberRetrieveParams as MemberRetrieveParams,
    type MemberUpdateParams as MemberUpdateParams,
    type MemberListParams as MemberListParams,
    type MemberRemoveParams as MemberRemoveParams,
  };
}
