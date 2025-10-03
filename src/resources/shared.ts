// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import * as MeAPI from './me';
import * as RevisionsAPI from './revisions';
import * as BandsAPI from './bands/bands';
import * as PostsAPI from './collections/posts';

export interface ImageSample {
  id?: string;

  counters?: ImageSampleCounters;

  picture?: MeAPI.Picture;
}

export interface ImageSampleCounters {
  likes?: number;
}

export interface Lyrics {
  content?: string;
}

export interface PostCounters {
  comments?: number;

  likes?: number;

  reposts?: number;
}

export interface RevisionSummary {
  id?: string;

  clientId?: PostsAPI.ClientID;

  counters?: RevisionsAPI.RevisionCounters;

  createdOn?: string;

  creator?: BandsAPI.Creator;

  description?: string;

  isFork?: boolean;

  isPublic?: boolean;

  lyrics?: Lyrics;

  mixdown?: RevisionsAPI.AudioSample;

  parentId?: string;

  postId?: string;

  stamp?: string;
}

export interface VideoSample {
  id?: string;

  counters?: VideoSampleCounters;

  duration?: number;

  picture?: MeAPI.Picture;

  status?: PostsAPI.Status;
}

export interface VideoSampleCounters {
  likes?: number;

  views?: number;
}
