// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as FollowersAPI from '../users/followers';
import { APIPromise } from '../../core/api-promise';
import { buildHeaders } from '../../internal/headers';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class Collaborators extends APIResource {
  /**
   * Returns members of a band
   */
  list(
    songID: string,
    query: CollaboratorListParams,
    options?: RequestOptions,
  ): APIPromise<CollaboratorListResponse> {
    return this._client.get(path`/songs/${songID}/collaborators`, { query, ...options });
  }

  /**
   * Removes a collaborator
   */
  remove(userID: string, params: CollaboratorRemoveParams, options?: RequestOptions): APIPromise<void> {
    const { songId } = params;
    return this._client.delete(path`/songs/${songId}/collaborators/${userID}`, {
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }
}

/**
 * Successful operation
 */
export interface CollaboratorListResponse {
  data?: Array<unknown>;

  paging?: FollowersAPI.Paging;
}

export interface CollaboratorListParams {
  communityId: string;

  after?: string;

  before?: string;

  limit?: number;

  offset?: number;
}

export interface CollaboratorRemoveParams {
  songId: string;
}

export declare namespace Collaborators {
  export {
    type CollaboratorListResponse as CollaboratorListResponse,
    type CollaboratorListParams as CollaboratorListParams,
    type CollaboratorRemoveParams as CollaboratorRemoveParams,
  };
}
