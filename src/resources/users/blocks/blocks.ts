// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../core/resource';
import * as UsersAPI from './users';
import { UserAddParams, UserListParams, UserRemoveParams, Users } from './users';

export class Blocks extends APIResource {
  users: UsersAPI.Users = new UsersAPI.Users(this._client);
}

Blocks.Users = Users;

export declare namespace Blocks {
  export {
    Users as Users,
    type UserListParams as UserListParams,
    type UserAddParams as UserAddParams,
    type UserRemoveParams as UserRemoveParams,
  };
}
