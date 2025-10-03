// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';

export class Authorizations extends APIResource {
  /**
   * Generates a session key
   *
   * @example
   * ```ts
   * const response =
   *   await client.authorizations.createSessionKey();
   * ```
   */
  createSessionKey(
    body: AuthorizationCreateSessionKeyParams,
    options?: RequestOptions,
  ): APIPromise<AuthorizationCreateSessionKeyResponse> {
    return this._client.post('/authorizations', { body, ...options });
  }
}

export type Provider = 'Password' | 'Key' | 'Token' | 'Google' | 'Facebook' | 'Twitter' | 'Soundcloud';

/**
 * Successful operation
 */
export interface AuthorizationCreateSessionKeyResponse {
  expireDate?: string;

  provider?: Provider;

  refreshToken?: string;

  sessionKey?: string;

  wasRegistered?: boolean;
}

export interface AuthorizationCreateSessionKeyParams {
  accessToken?: string;

  email?: string;

  key?: string;

  login?: string;

  name?: string;

  password?: string;

  provider?: Provider;

  referral?: string;

  refreshToken?: string;

  register?: boolean;

  rememberMe?: boolean;

  username?: string;
}

export declare namespace Authorizations {
  export {
    type Provider as Provider,
    type AuthorizationCreateSessionKeyResponse as AuthorizationCreateSessionKeyResponse,
    type AuthorizationCreateSessionKeyParams as AuthorizationCreateSessionKeyParams,
  };
}
