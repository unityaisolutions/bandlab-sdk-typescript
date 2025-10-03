// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as ConfirmationsAPI from './confirmations';
import { ConfirmationConfirmParams, Confirmations } from './confirmations';

export class Emails extends APIResource {
  confirmations: ConfirmationsAPI.Confirmations = new ConfirmationsAPI.Confirmations(this._client);
}

Emails.Confirmations = Confirmations;

export declare namespace Emails {
  export { Confirmations as Confirmations, type ConfirmationConfirmParams as ConfirmationConfirmParams };
}
