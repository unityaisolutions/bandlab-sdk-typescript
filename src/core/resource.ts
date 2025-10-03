// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import type { BandlabSDK } from '../client';

export abstract class APIResource {
  protected _client: BandlabSDK;

  constructor(client: BandlabSDK) {
    this._client = client;
  }
}
