// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import { buildHeaders } from '../../internal/headers';
import { RequestOptions } from '../../internal/request-options';

export class Confirmations extends APIResource {
  /**
   * Confirms an email
   */
  confirm(body: ConfirmationConfirmParams, options?: RequestOptions): APIPromise<void> {
    return this._client.put('/emails/confirmations', {
      body,
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }

  /**
   * Resends the email confirmation
   */
  resend(options?: RequestOptions): APIPromise<void> {
    return this._client.post('/emails/confirmations', {
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }
}

export interface ConfirmationConfirmParams {
  code?: string;

  userId?: string;
}

export declare namespace Confirmations {
  export { type ConfirmationConfirmParams as ConfirmationConfirmParams };
}
