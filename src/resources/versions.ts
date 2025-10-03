// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class Versions extends APIResource {
  /**
   * Returns version info of a client
   */
  retrieve(clientID: string, options?: RequestOptions): APIPromise<VersionRetrieveResponse> {
    return this._client.get(path`/versions/${clientID}`, options);
  }

  /**
   * Validates version of a client
   */
  validate(
    version: string,
    params: VersionValidateParams,
    options?: RequestOptions,
  ): APIPromise<VersionValidateResponse> {
    const { clientId, ...query } = params;
    return this._client.get(path`/versions/${clientId}/${version}/valid`, { query, ...options });
  }
}

/**
 * Successful operation
 */
export interface VersionRetrieveResponse {
  last?: string;

  message?: string;

  min?: string;

  url?: string;
}

/**
 * Successful operation
 */
export interface VersionValidateResponse {
  value?: boolean;
}

export interface VersionValidateParams {
  /**
   * Path param:
   */
  clientId: string;

  /**
   * Query param:
   */
  clientVersion: string;
}

export declare namespace Versions {
  export {
    type VersionRetrieveResponse as VersionRetrieveResponse,
    type VersionValidateResponse as VersionValidateResponse,
    type VersionValidateParams as VersionValidateParams,
  };
}
