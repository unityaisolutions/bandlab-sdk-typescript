// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as Shared from './shared';
import * as BandsAPI from './bands/bands';
import * as PostsAPI from './collections/posts';
import * as CommentsAPI from './posts/comments';
import { APIPromise } from '../core/api-promise';
import { buildHeaders } from '../internal/headers';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class Videos extends APIResource {
  /**
   * Add a view
   *
   * @example
   * ```ts
   * await client.videos.addView(
   *   '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   * );
   * ```
   */
  addView(videoID: string, options?: RequestOptions): APIPromise<void> {
    return this._client.post(path`/videos/${videoID}/views`, {
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }

  /**
   * Create a video post
   *
   * @example
   * ```ts
   * const post = await client.videos.createPost(
   *   '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   * );
   * ```
   */
  createPost(
    videoID: string,
    body: VideoCreatePostParams,
    options?: RequestOptions,
  ): APIPromise<PostsAPI.Post> {
    return this._client.post(path`/videos/${videoID}/posts`, { body, ...options });
  }
}

export interface VideoCreatePostParams {
  id?: string;

  caption?: string;

  clientId?: PostsAPI.ClientID;

  comments?: Array<CommentsAPI.Comment>;

  counters?: Shared.PostCounters;

  createdOn?: string;

  creator?: BandsAPI.Creator;

  image?: Shared.ImageSample;

  message?: string;

  revision?: Shared.RevisionSummary;

  type?: 'Revision' | 'Image' | 'Video' | 'Text';

  video?: Shared.VideoSample;
}

export declare namespace Videos {
  export { type VideoCreatePostParams as VideoCreatePostParams };
}
