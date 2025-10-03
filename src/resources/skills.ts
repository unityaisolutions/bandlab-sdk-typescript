// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';

export class Skills extends APIResource {
  /**
   * Returns all skills
   */
  list(options?: RequestOptions): APIPromise<SkillListResponse> {
    return this._client.get('/skills', options);
  }
}

export interface Skill {
  id?: string;

  name?: string;
}

/**
 * Successful operation
 */
export type SkillListResponse = Array<Skill>;

export declare namespace Skills {
  export { type Skill as Skill, type SkillListResponse as SkillListResponse };
}
