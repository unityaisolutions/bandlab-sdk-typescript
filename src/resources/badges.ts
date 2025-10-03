// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';

export class Badges extends APIResource {
  /**
   * Returns all badges
   */
  list(options?: RequestOptions): APIPromise<BadgeListResponse> {
    return this._client.get('/badges', options);
  }
}

export interface Badge {
  id?: string;

  name?: string;
}

/**
 * Successful operation
 */
export type BadgeListResponse = Array<Badge>;

export declare namespace Badges {
  export { type Badge as Badge, type BadgeListResponse as BadgeListResponse };
}
