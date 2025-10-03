// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as PostsAPI from './posts/posts';
import { APIPromise } from '../core/api-promise';
import { buildHeaders } from '../internal/headers';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class Invites extends APIResource {
  /**
   * Returns a single invite
   */
  retrieve(inviteID: string, options?: RequestOptions): APIPromise<PostsAPI.Invite> {
    return this._client.get(path`/invites/${inviteID}`, options);
  }

  /**
   * Deletes an invite
   */
  delete(inviteID: string, options?: RequestOptions): APIPromise<void> {
    return this._client.delete(path`/invites/${inviteID}`, {
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }

  /**
   * Accept an invite
   */
  accept(inviteID: string, options?: RequestOptions): APIPromise<void> {
    return this._client.put(path`/invites/${inviteID}`, {
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }

  /**
   * Send an external invite
   */
  send(body: InviteSendParams, options?: RequestOptions): APIPromise<void> {
    return this._client.post('/invites', {
      body,
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }
}

export interface InviteBatch {
  emails?: Array<string>;

  message?: string;

  userIds?: Array<string>;
}

export interface InviteSendParams {
  emails?: Array<string>;

  message?: string;

  userIds?: Array<string>;
}

export declare namespace Invites {
  export { type InviteBatch as InviteBatch, type InviteSendParams as InviteSendParams };
}
