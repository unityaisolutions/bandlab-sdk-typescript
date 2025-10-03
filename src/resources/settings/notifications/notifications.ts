// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../core/resource';
import * as EmailAPI from './email';
import { Email, EmailUpdateParams, SettingsEmail } from './email';
import * as PushAPI from './push';
import { Push, PushUpdateParams, SettingsPush } from './push';

export class Notifications extends APIResource {
  email: EmailAPI.Email = new EmailAPI.Email(this._client);
  push: PushAPI.Push = new PushAPI.Push(this._client);
}

Notifications.Email = Email;
Notifications.Push = Push;

export declare namespace Notifications {
  export { Email as Email, type SettingsEmail as SettingsEmail, type EmailUpdateParams as EmailUpdateParams };

  export { Push as Push, type SettingsPush as SettingsPush, type PushUpdateParams as PushUpdateParams };
}
