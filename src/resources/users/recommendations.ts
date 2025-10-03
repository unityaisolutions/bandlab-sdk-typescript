// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as LikesAPI from '../collections/likes';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class Recommendations extends APIResource {
  /**
   * Returns a recommended users
   */
  listUsers(
    userID: string,
    query: RecommendationListUsersParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<LikesAPI.UserSummaryList> {
    return this._client.get(path`/users/${userID}/recommendations/users`, { query, ...options });
  }
}

export interface RecommendationListUsersParams {
  after?: string;

  before?: string;

  limit?: number;

  offset?: number;
}

export declare namespace Recommendations {
  export { type RecommendationListUsersParams as RecommendationListUsersParams };
}
