// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as FollowersAPI from './users/followers';
import * as UsersAPI from './users/users';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';

export class Search extends APIResource {
  /**
   * Search global
   */
  globalSearch(
    query: SearchGlobalSearchParams,
    options?: RequestOptions,
  ): APIPromise<SearchGlobalSearchResponse> {
    return this._client.get('/search', { query, ...options });
  }

  /**
   * Search users
   */
  searchBands(
    query: SearchSearchBandsParams,
    options?: RequestOptions,
  ): APIPromise<SearchSearchBandsResponse> {
    return this._client.get('/search/bands', { query, ...options });
  }

  /**
   * Search users
   */
  searchCollections(
    query: SearchSearchCollectionsParams,
    options?: RequestOptions,
  ): APIPromise<UsersAPI.CollectionList> {
    return this._client.get('/search/collections', { query, ...options });
  }

  /**
   * Search users
   */
  searchSongs(query: SearchSearchSongsParams, options?: RequestOptions): APIPromise<UsersAPI.SongList> {
    return this._client.get('/search/songs', { query, ...options });
  }

  /**
   * Search users
   */
  searchUsers(query: SearchSearchUsersParams, options?: RequestOptions): APIPromise<FollowersAPI.UserList> {
    return this._client.get('/search/users', { query, ...options });
  }
}

/**
 * Successful operation
 */
export interface SearchGlobalSearchResponse {
  data?: Array<unknown>;

  paging?: FollowersAPI.Paging;
}

/**
 * Successful operation
 */
export interface SearchSearchBandsResponse {
  data?: Array<unknown>;

  paging?: FollowersAPI.Paging;
}

export interface SearchGlobalSearchParams {
  query: string;

  after?: string;

  before?: string;

  limit?: number;

  offset?: number;
}

export interface SearchSearchBandsParams {
  query: string;

  after?: string;

  before?: string;

  limit?: number;

  offset?: number;
}

export interface SearchSearchCollectionsParams {
  query: string;

  after?: string;

  before?: string;

  limit?: number;

  offset?: number;
}

export interface SearchSearchSongsParams {
  query: string;

  after?: string;

  before?: string;

  limit?: number;

  offset?: number;
}

export interface SearchSearchUsersParams {
  query: string;

  after?: string;

  before?: string;

  limit?: number;

  offset?: number;
}

export declare namespace Search {
  export {
    type SearchGlobalSearchResponse as SearchGlobalSearchResponse,
    type SearchSearchBandsResponse as SearchSearchBandsResponse,
    type SearchGlobalSearchParams as SearchGlobalSearchParams,
    type SearchSearchBandsParams as SearchSearchBandsParams,
    type SearchSearchCollectionsParams as SearchSearchCollectionsParams,
    type SearchSearchSongsParams as SearchSearchSongsParams,
    type SearchSearchUsersParams as SearchSearchUsersParams,
  };
}
