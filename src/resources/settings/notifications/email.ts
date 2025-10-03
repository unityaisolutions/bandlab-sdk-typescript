// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../core/resource';
import { APIPromise } from '../../../core/api-promise';
import { RequestOptions } from '../../../internal/request-options';

export class Email extends APIResource {
  /**
   * Returns email notifications settings
   */
  retrieve(options?: RequestOptions): APIPromise<SettingsEmail> {
    return this._client.get('/settings/notifications/email', options);
  }

  /**
   * Updates email notifications settings
   */
  update(body: EmailUpdateParams, options?: RequestOptions): APIPromise<SettingsEmail> {
    return this._client.patch('/settings/notifications/email', { body, ...options });
  }
}

export interface SettingsEmail {
  invitationToBand?: boolean;

  invitationToSong?: boolean;

  joinToBandRequest?: boolean;

  newBandMember?: boolean;

  newRevision?: boolean;

  newSongCollaborator?: boolean;

  newSongInBand?: boolean;

  requestToJoinApproved?: boolean;
}

export interface EmailUpdateParams {
  invitationToBand?: boolean;

  invitationToSong?: boolean;

  joinToBandRequest?: boolean;

  newBandMember?: boolean;

  newRevision?: boolean;

  newSongCollaborator?: boolean;

  newSongInBand?: boolean;

  requestToJoinApproved?: boolean;
}

export declare namespace Email {
  export { type SettingsEmail as SettingsEmail, type EmailUpdateParams as EmailUpdateParams };
}
