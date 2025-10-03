// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { buildHeaders } from '../internal/headers';
import { RequestOptions } from '../internal/request-options';

export class Feedback extends APIResource {
  /**
   * Send a new feedback
   */
  create(body: FeedbackCreateParams, options?: RequestOptions): APIPromise<void> {
    return this._client.post('/feedback', {
      body,
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }
}

export interface FeedbackCreateParams {
  description?: string;

  reportType?: string;
}

export declare namespace Feedback {
  export { type FeedbackCreateParams as FeedbackCreateParams };
}
