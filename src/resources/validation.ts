// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class Validation extends APIResource {
  /**
   * Validates the user fields
   */
  validate(
    entityType: 'user' | 'band' | 'song',
    query: ValidationValidateParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<ValidationValidateResponse> {
    return this._client.get(path`/validation/${entityType}`, { query, ...options });
  }
}

/**
 * Successful operation
 */
export interface ValidationValidateResponse {
  isAvailable?: boolean;

  isValid?: boolean;
}

export interface ValidationValidateParams {
  name?: string;

  username?: string;
}

export declare namespace Validation {
  export {
    type ValidationValidateResponse as ValidationValidateResponse,
    type ValidationValidateParams as ValidationValidateParams,
  };
}
