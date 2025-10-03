// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as MeAPI from '../me';
import * as BandsAPI from '../bands/bands';
import * as SongsAPI from './songs';
import * as FollowersAPI from '../users/followers';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class Revisions extends APIResource {
  /**
   * Returns a list of revisions
   */
  list(
    songID: string,
    query: RevisionListParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<RevisionListResponse> {
    return this._client.get(path`/songs/${songID}/revisions`, { query, ...options });
  }

  /**
   * Create a fork
   */
  forks(revisonID: string, params: RevisionForksParams, options?: RequestOptions): APIPromise<SongsAPI.Song> {
    const { songId, ...body } = params;
    return this._client.post(path`/songs/${songId}/revisions/${revisonID}/forks`, { body, ...options });
  }
}

/**
 * Successful operation
 */
export interface RevisionListResponse {
  data?: Array<unknown>;

  paging?: FollowersAPI.Paging;
}

export interface RevisionListParams {
  after?: string;

  before?: string;

  limit?: number;

  offset?: number;
}

export interface RevisionForksParams {
  /**
   * Path param:
   */
  songId: string;

  /**
   * Body param:
   */
  name: string;

  /**
   * Body param:
   */
  id?: string;

  /**
   * Body param:
   */
  author?: SongsAPI.Author;

  /**
   * Body param:
   */
  collaborators?: Array<RevisionForksParams.Collaborator>;

  /**
   * Body param:
   */
  counters?: SongsAPI.SongCounters;

  /**
   * Body param:
   */
  createdOn?: string;

  /**
   * Body param:
   */
  creator?: BandsAPI.Creator;

  /**
   * Body param:
   */
  description?: string;

  /**
   * Body param:
   */
  isFork?: boolean;

  /**
   * Body param:
   */
  isForkable?: boolean;

  /**
   * Body param:
   */
  isPublic?: boolean;

  /**
   * Body param:
   */
  modifiedOn?: string;

  /**
   * Body param:
   */
  original?: SongsAPI.SongOriginal;

  /**
   * Body param:
   */
  picture?: MeAPI.Picture;

  /**
   * Body param:
   */
  slug?: string;
}

export namespace RevisionForksParams {
  export interface Collaborator {
    id?: string;

    counters?: MeAPI.UserCounters;

    name?: string;

    picture?: MeAPI.Picture;

    username?: string;
  }
}

export declare namespace Revisions {
  export {
    type RevisionListResponse as RevisionListResponse,
    type RevisionListParams as RevisionListParams,
    type RevisionForksParams as RevisionForksParams,
  };
}
