// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as RegistrationsAPI from './registrations';
import { RegistrationCreateParams, RegistrationDeleteParams, Registrations } from './registrations';

export class Push extends APIResource {
  registrations: RegistrationsAPI.Registrations = new RegistrationsAPI.Registrations(this._client);
}

Push.Registrations = Registrations;

export declare namespace Push {
  export {
    Registrations as Registrations,
    type RegistrationCreateParams as RegistrationCreateParams,
    type RegistrationDeleteParams as RegistrationDeleteParams,
  };
}
