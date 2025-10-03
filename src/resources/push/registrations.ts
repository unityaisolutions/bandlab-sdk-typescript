// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import { buildHeaders } from '../../internal/headers';
import { RequestOptions } from '../../internal/request-options';

export class Registrations extends APIResource {
  /**
   * Registers a device for push notifications
   *
   * @example
   * ```ts
   * await client.push.registrations.create();
   * ```
   */
  create(body: RegistrationCreateParams, options?: RequestOptions): APIPromise<void> {
    return this._client.post('/push/registrations', {
      body,
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }

  /**
   * Unregisters a device
   *
   * @example
   * ```ts
   * await client.push.registrations.delete({ pnsId: 'pnsId' });
   * ```
   */
  delete(params: RegistrationDeleteParams, options?: RequestOptions): APIPromise<void> {
    const { pnsId } = params;
    return this._client.delete('/push/registrations', {
      query: { pnsId },
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }
}

export interface RegistrationCreateParams {
  deviceId?: string;

  platfrom?: 'Gcm' | 'Apns';

  pnsId?: string;
}

export interface RegistrationDeleteParams {
  pnsId: string;
}

export declare namespace Registrations {
  export {
    type RegistrationCreateParams as RegistrationCreateParams,
    type RegistrationDeleteParams as RegistrationDeleteParams,
  };
}
