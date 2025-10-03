// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { buildHeaders } from '../internal/headers';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class Logins extends APIResource {
  /**
   * Add external login
   *
   * @example
   * ```ts
   * const login = await client.logins.create();
   * ```
   */
  create(body: LoginCreateParams, options?: RequestOptions): APIPromise<Login> {
    return this._client.post('/logins', { body, ...options });
  }

  /**
   * Updates an external login
   *
   * @example
   * ```ts
   * const login = await client.logins.update('Google');
   * ```
   */
  update(
    providerType: ProviderType139,
    body: LoginUpdateParams,
    options?: RequestOptions,
  ): APIPromise<Login> {
    return this._client.put(path`/logins/${providerType}`, { body, ...options });
  }

  /**
   * Returns external logins
   *
   * @example
   * ```ts
   * const logins = await client.logins.list();
   * ```
   */
  list(options?: RequestOptions): APIPromise<LoginListResponse> {
    return this._client.get('/logins', options);
  }

  /**
   * Removes an external login
   *
   * @example
   * ```ts
   * await client.logins.delete('Google');
   * ```
   */
  delete(providerType: ProviderType139, options?: RequestOptions): APIPromise<void> {
    return this._client.delete(path`/logins/${providerType}`, {
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }
}

export interface Login {
  accessToken?: string;

  provider?: 'Google' | 'Facebook';
}

export type ProviderType139 = 'Google' | 'Facebook';

/**
 * Successful operation
 */
export type LoginListResponse = Array<Login>;

export interface LoginCreateParams {
  accessToken?: string;

  provider?: 'Google' | 'Facebook';
}

export interface LoginUpdateParams {
  accessToken?: string;

  provider?: 'Google' | 'Facebook';
}

export declare namespace Logins {
  export {
    type Login as Login,
    type ProviderType139 as ProviderType139,
    type LoginListResponse as LoginListResponse,
    type LoginCreateParams as LoginCreateParams,
    type LoginUpdateParams as LoginUpdateParams,
  };
}
