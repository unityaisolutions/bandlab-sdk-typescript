// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as GenresAPI from './genres';
import * as BandsAPI from './bands/bands';
import * as PostsAPI from './collections/posts';
import * as PostsPostsAPI from './posts/posts';
import { APIPromise } from '../core/api-promise';
import { buildHeaders } from '../internal/headers';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class Revisions extends APIResource {
  /**
   * Create a new revision
   *
   * @example
   * ```ts
   * const revision = await client.revisions.create();
   * ```
   */
  create(body: RevisionCreateParams, options?: RequestOptions): APIPromise<Revision> {
    return this._client.post('/revisions', { body, ...options });
  }

  /**
   * Returns a single revision
   *
   * @example
   * ```ts
   * const revision = await client.revisions.retrieve(
   *   '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   * );
   * ```
   */
  retrieve(revisionID: string, options?: RequestOptions): APIPromise<Revision> {
    return this._client.get(path`/revisions/${revisionID}`, options);
  }

  /**
   * Updates a revision
   *
   * @example
   * ```ts
   * const revision = await client.revisions.update(
   *   '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   * );
   * ```
   */
  update(revisionID: string, body: RevisionUpdateParams, options?: RequestOptions): APIPromise<Revision> {
    return this._client.patch(path`/revisions/${revisionID}`, { body, ...options });
  }

  /**
   * Add a play
   *
   * @example
   * ```ts
   * await client.revisions.addPlay(
   *   '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   * );
   * ```
   */
  addPlay(revisionID: string, options?: RequestOptions): APIPromise<void> {
    return this._client.post(path`/revisions/${revisionID}/plays`, {
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }
}

export interface AudioSample {
  id?: string;

  name?: string;

  status?: PostsAPI.Status;
}

export interface Mastering {
  drySampleId?: string;

  preset?: string;
}

export interface Revision {
  id?: string;

  auxChannels?: Array<Revision.AuxChannel>;

  clientId?: PostsAPI.ClientID;

  counters?: RevisionCounters;

  createdOn?: string;

  creator?: BandsAPI.Creator;

  description?: string;

  genres?: Array<GenresAPI.Genre>;

  isFork?: boolean;

  isPublic?: boolean;

  key?: string;

  mastering?: Mastering;

  mixdown?: AudioSample;

  modifiedOn?: string;

  parentId?: string;

  postId?: string;

  samples?: Array<AudioSample>;

  song?: PostsPostsAPI.SongSummary;

  stamp?: string;

  tracks?: Array<AudioSample>;
}

export namespace Revision {
  export interface AuxChannel {
    id?: string;

    effects?: Array<AuxChannel.Effect>;

    preset?: string;

    returnLevel?: number;
  }

  export namespace AuxChannel {
    export interface Effect {
      bypass?: boolean;

      params?: unknown;

      slug?: string;
    }
  }
}

export interface RevisionCounters {
  comments?: number;

  forks?: number;

  likes?: number;

  plays?: number;
}

export interface RevisionCreateParams {
  id?: string;

  auxChannels?: Array<RevisionCreateParams.AuxChannel>;

  clientId?: PostsAPI.ClientID;

  counters?: RevisionCounters;

  createdOn?: string;

  creator?: BandsAPI.Creator;

  description?: string;

  genres?: Array<GenresAPI.Genre>;

  isFork?: boolean;

  isPublic?: boolean;

  key?: string;

  mastering?: Mastering;

  mixdown?: AudioSample;

  modifiedOn?: string;

  parentId?: string;

  postId?: string;

  samples?: Array<AudioSample>;

  song?: PostsPostsAPI.SongSummary;

  stamp?: string;

  tracks?: Array<AudioSample>;
}

export namespace RevisionCreateParams {
  export interface AuxChannel {
    id?: string;

    effects?: Array<AuxChannel.Effect>;

    preset?: string;

    returnLevel?: number;
  }

  export namespace AuxChannel {
    export interface Effect {
      bypass?: boolean;

      params?: unknown;

      slug?: string;
    }
  }
}

export interface RevisionUpdateParams {
  id?: string;

  auxChannels?: Array<RevisionUpdateParams.AuxChannel>;

  clientId?: PostsAPI.ClientID;

  counters?: RevisionCounters;

  createdOn?: string;

  creator?: BandsAPI.Creator;

  description?: string;

  genres?: Array<GenresAPI.Genre>;

  isFork?: boolean;

  isPublic?: boolean;

  key?: string;

  mastering?: Mastering;

  mixdown?: AudioSample;

  modifiedOn?: string;

  parentId?: string;

  postId?: string;

  samples?: Array<AudioSample>;

  song?: PostsPostsAPI.SongSummary;

  stamp?: string;

  tracks?: Array<AudioSample>;
}

export namespace RevisionUpdateParams {
  export interface AuxChannel {
    id?: string;

    effects?: Array<AuxChannel.Effect>;

    preset?: string;

    returnLevel?: number;
  }

  export namespace AuxChannel {
    export interface Effect {
      bypass?: boolean;

      params?: unknown;

      slug?: string;
    }
  }
}

export declare namespace Revisions {
  export {
    type AudioSample as AudioSample,
    type Mastering as Mastering,
    type Revision as Revision,
    type RevisionCounters as RevisionCounters,
    type RevisionCreateParams as RevisionCreateParams,
    type RevisionUpdateParams as RevisionUpdateParams,
  };
}
