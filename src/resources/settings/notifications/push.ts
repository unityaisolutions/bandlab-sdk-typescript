// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../core/resource';
import * as EmailAPI from './email';
import { APIPromise } from '../../../core/api-promise';
import { RequestOptions } from '../../../internal/request-options';

export class Push extends APIResource {
  /**
   * Returns push notifications settings
   */
  retrieve(options?: RequestOptions): APIPromise<EmailAPI.SettingsEmail> {
    return this._client.get('/settings/notifications/push', options);
  }

  /**
   * Updates push notifications settings
   */
  update(body: PushUpdateParams, options?: RequestOptions): APIPromise<SettingsPush> {
    return this._client.patch('/settings/notifications/push', { body, ...options });
  }
}

export interface SettingsPush {
  invitationToBand?: boolean;

  invitationToSong?: boolean;

  joinToBandRequest?: boolean;

  newBandMember?: boolean;

  newRevision?: boolean;

  newSongCollaborator?: boolean;

  newSongInBand?: boolean;

  requestToJoinApproved?: boolean;
}

export interface PushUpdateParams {
  invitationToBand?: boolean;

  invitationToSong?: boolean;

  joinToBandRequest?: boolean;

  newBandMember?: boolean;

  newRevision?: boolean;

  newSongCollaborator?: boolean;

  newSongInBand?: boolean;

  requestToJoinApproved?: boolean;
}

export declare namespace Push {
  export { type SettingsPush as SettingsPush, type PushUpdateParams as PushUpdateParams };
}
