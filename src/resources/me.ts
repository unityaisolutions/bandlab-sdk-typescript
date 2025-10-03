// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as GenresAPI from './genres';
import * as SkillsAPI from './skills';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';

export class Me extends APIResource {
  /**
   * Returns a profile of current user
   *
   * @example
   * ```ts
   * const profile = await client.me.retrieve();
   * ```
   */
  retrieve(options?: RequestOptions): APIPromise<Profile> {
    return this._client.get('/me', options);
  }

  /**
   * Updates a profile of current user
   *
   * @example
   * ```ts
   * const profile = await client.me.update();
   * ```
   */
  update(body: MeUpdateParams, options?: RequestOptions): APIPromise<Profile> {
    return this._client.patch('/me', { body, ...options });
  }
}

export interface GeoCoordinate {
  latitude?: number;

  longitude?: number;
}

export interface Location {
  city?: string;

  Coordinates?: GeoCoordinate;

  country?: string;
}

export interface Picture {
  isDefault?: boolean;

  l?: string;

  m?: string;

  s?: string;

  url?: string;
}

export interface Profile {
  id?: string;

  about?: string;

  badges?: Array<string>;

  birthday?: string;

  counters?: UserCounters;

  createdOn?: string;

  email?: string;

  ftue?: Profile.Ftue;

  gender?: 'Male' | 'Female' | 'Other';

  genres?: Array<GenresAPI.Genre>;

  hasPassword?: boolean;

  isBetaUser?: boolean;

  isEmailConfirmed?: boolean;

  isNewbie?: boolean;

  isSocial?: boolean;

  isTippable?: boolean;

  isVerified?: boolean;

  location?: Location;

  name?: string;

  picture?: Picture;

  skills?: Array<SkillsAPI.Skill>;

  username?: string;
}

export namespace Profile {
  export interface Ftue {
    confirmedEmail?: boolean;

    createdBand?: boolean;

    createdSong?: boolean;

    setCustomUsername?: boolean;

    setGenres?: boolean;

    setPicture?: boolean;

    setSkills?: boolean;
  }
}

export interface UserCounters {
  bands?: number;

  collections?: number;

  followers?: number;

  following?: number;
}

export interface MeUpdateParams {
  id?: string;

  about?: string;

  badges?: Array<string>;

  birthday?: string;

  counters?: UserCounters;

  createdOn?: string;

  email?: string;

  ftue?: MeUpdateParams.Ftue;

  gender?: 'Male' | 'Female' | 'Other';

  genres?: Array<GenresAPI.Genre>;

  hasPassword?: boolean;

  isBetaUser?: boolean;

  isEmailConfirmed?: boolean;

  isNewbie?: boolean;

  isSocial?: boolean;

  isTippable?: boolean;

  isVerified?: boolean;

  location?: Location;

  name?: string;

  picture?: Picture;

  skills?: Array<SkillsAPI.Skill>;

  username?: string;
}

export namespace MeUpdateParams {
  export interface Ftue {
    confirmedEmail?: boolean;

    createdBand?: boolean;

    createdSong?: boolean;

    setCustomUsername?: boolean;

    setGenres?: boolean;

    setPicture?: boolean;

    setSkills?: boolean;
  }
}

export declare namespace Me {
  export {
    type GeoCoordinate as GeoCoordinate,
    type Location as Location,
    type Picture as Picture,
    type Profile as Profile,
    type UserCounters as UserCounters,
    type MeUpdateParams as MeUpdateParams,
  };
}
