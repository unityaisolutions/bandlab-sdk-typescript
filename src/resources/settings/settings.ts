// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as NotificationsAPI from './notifications/notifications';
import { Notifications } from './notifications/notifications';

export class Settings extends APIResource {
  notifications: NotificationsAPI.Notifications = new NotificationsAPI.Notifications(this._client);
}

Settings.Notifications = Notifications;

export declare namespace Settings {
  export { Notifications as Notifications };
}
