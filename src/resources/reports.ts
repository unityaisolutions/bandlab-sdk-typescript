// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { buildHeaders } from '../internal/headers';
import { RequestOptions } from '../internal/request-options';

export class Reports extends APIResource {
  /**
   * Send a new report
   */
  create(body: ReportCreateParams, options?: RequestOptions): APIPromise<void> {
    return this._client.post('/reports', {
      body,
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }
}

export interface ReportCreateParams {
  description?: string;

  objectId?: string;

  objectType?: string;

  reportType?: string;
}

export declare namespace Reports {
  export { type ReportCreateParams as ReportCreateParams };
}
