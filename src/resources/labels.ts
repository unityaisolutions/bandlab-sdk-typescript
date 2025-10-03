// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as BadgesAPI from './badges';
import * as GenresAPI from './genres';
import * as SkillsAPI from './skills';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';

export class Labels extends APIResource {
  /**
   * Returns all labels
   */
  list(options?: RequestOptions): APIPromise<LabelListResponse> {
    return this._client.get('/labels', options);
  }
}

/**
 * Successful operation
 */
export type LabelListResponse = Array<LabelListResponse.LabelListResponseItem>;

export namespace LabelListResponse {
  export interface LabelListResponseItem {
    badges?: Array<BadgesAPI.Badge>;

    genres?: Array<GenresAPI.Genre>;

    skills?: Array<SkillsAPI.Skill>;
  }
}

export declare namespace Labels {
  export { type LabelListResponse as LabelListResponse };
}
