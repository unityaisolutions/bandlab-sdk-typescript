// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as GenresAPI from '../genres';
import * as MeAPI from '../me';
import * as SkillsAPI from '../skills';
import * as BandsAPI from '../bands/bands';
import * as PostsAPI from '../posts/posts';
import * as ContactsAPI from './contacts';
import {
  ContactListBandsParams,
  ContactListBandsResponse,
  ContactListUsersParams,
  Contacts,
} from './contacts';
import * as FollowersAPI from './followers';
import { FollowerListParams, Followers, Paging, UserList } from './followers';
import * as FollowingAPI from './following';
import { Following, FollowingListParams, FollowingListPostsParams } from './following';
import * as InvitesAPI from './invites';
import { InviteList, InviteListParams, InviteSendParams, Invites } from './invites';
import * as NotificationsAPI from './notifications';
import {
  NotificationCountResponse,
  NotificationList,
  NotificationListFollowingParams,
  NotificationListParams,
  NotificationPatch,
  NotificationUpdateAllParams,
  NotificationUpdateParams,
  Notifications,
} from './notifications';
import * as RecommendationsAPI from './recommendations';
import { RecommendationListUsersParams, Recommendations } from './recommendations';
import * as BlocksAPI from './blocks/blocks';
import { Blocks } from './blocks/blocks';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class Users extends APIResource {
  followers: FollowersAPI.Followers = new FollowersAPI.Followers(this._client);
  following: FollowingAPI.Following = new FollowingAPI.Following(this._client);
  invites: InvitesAPI.Invites = new InvitesAPI.Invites(this._client);
  notifications: NotificationsAPI.Notifications = new NotificationsAPI.Notifications(this._client);
  recommendations: RecommendationsAPI.Recommendations = new RecommendationsAPI.Recommendations(this._client);
  contacts: ContactsAPI.Contacts = new ContactsAPI.Contacts(this._client);
  blocks: BlocksAPI.Blocks = new BlocksAPI.Blocks(this._client);

  /**
   * Returns a single user
   */
  retrieve(userID: string, options?: RequestOptions): APIPromise<UserRetrieveResponse> {
    return this._client.get(path`/users/${userID}`, options);
  }

  /**
   * Generates one-time access key
   */
  createAccessKey(userID: string, options?: RequestOptions): APIPromise<UserCreateAccessKeyResponse> {
    return this._client.post(path`/users/${userID}/keys`, options);
  }

  /**
   * Returns a list of bands
   */
  listBands(
    userID: string,
    query: UserListBandsParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<BandsAPI.Band> {
    return this._client.get(path`/users/${userID}/bands`, { query, ...options });
  }

  /**
   * Returns a list of collections
   */
  listCollections(
    userID: string,
    query: UserListCollectionsParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<CollectionList> {
    return this._client.get(path`/users/${userID}/collections`, { query, ...options });
  }

  /**
   * Returns a list of bands
   */
  listCommunities(
    userID: string,
    query: UserListCommunitiesParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<UserListCommunitiesResponse> {
    return this._client.get(path`/users/${userID}/communities`, { query, ...options });
  }

  /**
   * Returns a list of posts
   */
  listPosts(
    userID: string,
    query: UserListPostsParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<PostsAPI.PostList> {
    return this._client.get(path`/users/${userID}/posts`, { query, ...options });
  }

  /**
   * Returns a list of songs
   */
  listSongs(
    userID: string,
    query: UserListSongsParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<SongList> {
    return this._client.get(path`/users/${userID}/songs`, { query, ...options });
  }
}

export interface CollectionList {
  data?: Array<unknown>;

  paging?: FollowersAPI.Paging;
}

export interface SongList {
  data?: Array<unknown>;

  paging?: FollowersAPI.Paging;
}

/**
 * Successful operation
 */
export interface UserRetrieveResponse {
  id?: string;

  about?: string;

  badges?: Array<string>;

  counters?: MeAPI.UserCounters;

  createdOn?: string;

  genres?: Array<GenresAPI.Genre>;

  isTippable?: boolean;

  isVerified?: boolean;

  location?: MeAPI.Location;

  name?: string;

  picture?: MeAPI.Picture;

  skills?: Array<SkillsAPI.Skill>;

  username?: string;
}

/**
 * Successful operation
 */
export interface UserCreateAccessKeyResponse {
  key?: string;
}

/**
 * Successful operation
 */
export interface UserListCommunitiesResponse {
  data?: Array<unknown>;

  paging?: FollowersAPI.Paging;
}

export interface UserListBandsParams {
  after?: string;

  before?: string;

  limit?: number;

  offset?: number;
}

export interface UserListCollectionsParams {
  after?: string;

  before?: string;

  limit?: number;

  offset?: number;
}

export interface UserListCommunitiesParams {
  after?: string;

  before?: string;

  limit?: number;

  offset?: number;
}

export interface UserListPostsParams {
  after?: string;

  before?: string;

  limit?: number;

  offset?: number;
}

export interface UserListSongsParams {
  after?: string;

  before?: string;

  limit?: number;

  offset?: number;
}

Users.Followers = Followers;
Users.Following = Following;
Users.Invites = Invites;
Users.Notifications = Notifications;
Users.Recommendations = Recommendations;
Users.Contacts = Contacts;
Users.Blocks = Blocks;

export declare namespace Users {
  export {
    type CollectionList as CollectionList,
    type SongList as SongList,
    type UserRetrieveResponse as UserRetrieveResponse,
    type UserCreateAccessKeyResponse as UserCreateAccessKeyResponse,
    type UserListCommunitiesResponse as UserListCommunitiesResponse,
    type UserListBandsParams as UserListBandsParams,
    type UserListCollectionsParams as UserListCollectionsParams,
    type UserListCommunitiesParams as UserListCommunitiesParams,
    type UserListPostsParams as UserListPostsParams,
    type UserListSongsParams as UserListSongsParams,
  };

  export {
    Followers as Followers,
    type Paging as Paging,
    type UserList as UserList,
    type FollowerListParams as FollowerListParams,
  };

  export {
    Following as Following,
    type FollowingListParams as FollowingListParams,
    type FollowingListPostsParams as FollowingListPostsParams,
  };

  export {
    Invites as Invites,
    type InviteList as InviteList,
    type InviteListParams as InviteListParams,
    type InviteSendParams as InviteSendParams,
  };

  export {
    Notifications as Notifications,
    type NotificationList as NotificationList,
    type NotificationPatch as NotificationPatch,
    type NotificationCountResponse as NotificationCountResponse,
    type NotificationUpdateParams as NotificationUpdateParams,
    type NotificationListParams as NotificationListParams,
    type NotificationListFollowingParams as NotificationListFollowingParams,
    type NotificationUpdateAllParams as NotificationUpdateAllParams,
  };

  export {
    Recommendations as Recommendations,
    type RecommendationListUsersParams as RecommendationListUsersParams,
  };

  export {
    Contacts as Contacts,
    type ContactListBandsResponse as ContactListBandsResponse,
    type ContactListBandsParams as ContactListBandsParams,
    type ContactListUsersParams as ContactListUsersParams,
  };

  export { Blocks as Blocks };
}
