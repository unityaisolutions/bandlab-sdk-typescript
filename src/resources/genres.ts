// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';

export class Genres extends APIResource {
  /**
   * Returns all genres
   */
  list(options?: RequestOptions): APIPromise<GenreListResponse> {
    return this._client.get('/genres', options);
  }
}

export interface Genre {
  id?: string;

  name?: string;
}

/**
 * Successful operation
 */
export type GenreListResponse = Array<Genre>;

export declare namespace Genres {
  export { type Genre as Genre, type GenreListResponse as GenreListResponse };
}
