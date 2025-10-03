// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as FollowersAPI from './followers';
import { APIPromise } from '../../core/api-promise';
import { buildHeaders } from '../../internal/headers';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class Notifications extends APIResource {
  /**
   * Updates a notification
   */
  update(
    notificationID: string,
    params: NotificationUpdateParams,
    options?: RequestOptions,
  ): APIPromise<void> {
    const { userId, ...body } = params;
    return this._client.patch(path`/users/${userId}/notifications/${notificationID}`, {
      body,
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }

  /**
   * Returns a list of notifications
   */
  list(
    userID: string,
    query: NotificationListParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<NotificationList> {
    return this._client.get(path`/users/${userID}/notifications`, { query, ...options });
  }

  /**
   * Returns number of all notifications
   */
  count(userID: string, options?: RequestOptions): APIPromise<NotificationCountResponse> {
    return this._client.get(path`/users/${userID}/notifications/count`, options);
  }

  /**
   * Returns a list of notifications
   */
  listFollowing(
    userID: string,
    query: NotificationListFollowingParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<NotificationList> {
    return this._client.get(path`/users/${userID}/notifications/following`, { query, ...options });
  }

  /**
   * Updates notifications
   */
  updateAll(userID: string, body: NotificationUpdateAllParams, options?: RequestOptions): APIPromise<void> {
    return this._client.patch(path`/users/${userID}/notifications`, {
      body,
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }
}

export interface NotificationList {
  data?: Array<unknown>;

  paging?: FollowersAPI.Paging;
}

export interface NotificationPatch {
  ids?: Array<string>;

  lastReadOn?: string;

  unread?: boolean;
}

/**
 * Successful operation
 */
export interface NotificationCountResponse {
  count?: number;
}

export interface NotificationUpdateParams {
  /**
   * Path param:
   */
  userId: string;

  /**
   * Body param:
   */
  ids?: Array<string>;

  /**
   * Body param:
   */
  lastReadOn?: string;

  /**
   * Body param:
   */
  unread?: boolean;
}

export interface NotificationListParams {
  after?: string;

  before?: string;

  limit?: number;

  offset?: number;
}

export interface NotificationListFollowingParams {
  after?: string;

  before?: string;

  limit?: number;

  offset?: number;
}

export interface NotificationUpdateAllParams {
  ids?: Array<string>;

  lastReadOn?: string;

  unread?: boolean;
}

export declare namespace Notifications {
  export {
    type NotificationList as NotificationList,
    type NotificationPatch as NotificationPatch,
    type NotificationCountResponse as NotificationCountResponse,
    type NotificationUpdateParams as NotificationUpdateParams,
    type NotificationListParams as NotificationListParams,
    type NotificationListFollowingParams as NotificationListFollowingParams,
    type NotificationUpdateAllParams as NotificationUpdateAllParams,
  };
}
