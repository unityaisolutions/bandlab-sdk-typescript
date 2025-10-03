// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import type { RequestInit, RequestInfo, BodyInit } from './internal/builtin-types';
import type { HTTPMethod, PromiseOrValue, MergedRequestInit, FinalizedRequestInit } from './internal/types';
import { uuid4 } from './internal/utils/uuid';
import { validatePositiveInteger, isAbsoluteURL, safeJSON } from './internal/utils/values';
import { sleep } from './internal/utils/sleep';
export type { Logger, LogLevel } from './internal/utils/log';
import { castToError, isAbortError } from './internal/errors';
import type { APIResponseProps } from './internal/parse';
import { getPlatformHeaders } from './internal/detect-platform';
import * as Shims from './internal/shims';
import * as Opts from './internal/request-options';
import { VERSION } from './version';
import * as Errors from './core/error';
import * as Uploads from './core/uploads';
import * as API from './resources/index';
import { APIPromise } from './core/api-promise';
import {
  AuthorizationCreateSessionKeyParams,
  AuthorizationCreateSessionKeyResponse,
  Authorizations,
  Provider,
} from './resources/authorizations';
import { Badge, BadgeListResponse, Badges } from './resources/badges';
import { Feedback, FeedbackCreateParams } from './resources/feedback';
import { Genre, GenreListResponse, Genres } from './resources/genres';
import { ImageCreatePostParams, Images } from './resources/images';
import { InviteBatch, InviteSendParams, Invites } from './resources/invites';
import { LabelListResponse, Labels } from './resources/labels';
import {
  Login,
  LoginCreateParams,
  LoginListResponse,
  LoginUpdateParams,
  Logins,
  ProviderType139,
} from './resources/logins';
import { GeoCoordinate, Location, Me, MeUpdateParams, Picture, Profile, UserCounters } from './resources/me';
import {
  PasswordChangeParams,
  PasswordResetParams,
  PasswordSendRestoreEmailParams,
  Passwords,
} from './resources/passwords';
import { ReportCreateParams, Reports } from './resources/reports';
import {
  AudioSample,
  Mastering,
  Revision,
  RevisionCounters,
  RevisionCreateParams,
  RevisionUpdateParams,
  Revisions,
} from './resources/revisions';
import {
  Search,
  SearchGlobalSearchParams,
  SearchGlobalSearchResponse,
  SearchSearchBandsParams,
  SearchSearchBandsResponse,
  SearchSearchCollectionsParams,
  SearchSearchSongsParams,
  SearchSearchUsersParams,
} from './resources/search';
import { Skill, SkillListResponse, Skills } from './resources/skills';
import { Validation, ValidationValidateParams, ValidationValidateResponse } from './resources/validation';
import {
  VersionRetrieveResponse,
  VersionValidateParams,
  VersionValidateResponse,
  Versions,
} from './resources/versions';
import { VideoCreatePostParams, Videos } from './resources/videos';
import {
  Band,
  BandCounters,
  BandCreateParams,
  BandListPostsParams,
  BandListSongsParams,
  BandUpdateParams,
  Bands,
  Creator,
  GroupMemberSummary,
} from './resources/bands/bands';
import {
  Collection,
  CollectionCounters,
  CollectionCreateParams,
  CollectionUpdateParams,
  Collections,
} from './resources/collections/collections';
import {
  Communities,
  Community,
  CommunityCounters,
  CommunityCreateParams,
  CommunityUpdateParams,
  Type,
} from './resources/communities/communities';
import { Emails } from './resources/emails/emails';
import { Invite, PostList, PostListParams, Posts, SongSummary, UserSummary } from './resources/posts/posts';
import { Push } from './resources/push/push';
import { Settings } from './resources/settings/settings';
import {
  Author,
  Song,
  SongCounters,
  SongListPostsParams,
  SongOriginal,
  SongUpdateParams,
  Songs,
} from './resources/songs/songs';
import {
  CollectionList,
  SongList,
  UserCreateAccessKeyResponse,
  UserListBandsParams,
  UserListCollectionsParams,
  UserListCommunitiesParams,
  UserListCommunitiesResponse,
  UserListPostsParams,
  UserListSongsParams,
  UserRetrieveResponse,
  Users,
} from './resources/users/users';
import { type Fetch } from './internal/builtin-types';
import { HeadersLike, NullableHeaders, buildHeaders } from './internal/headers';
import { FinalRequestOptions, RequestOptions } from './internal/request-options';
import { readEnv } from './internal/utils/env';
import {
  type LogLevel,
  type Logger,
  formatRequestDetails,
  loggerFor,
  parseLogLevel,
} from './internal/utils/log';
import { isEmptyObj } from './internal/utils/values';

const environments = {
  production: 'https://test.bandlab.com/api/v1.3',
  environment_1: 'https://bandlab.com/api/v1.3',
};
type Environment = keyof typeof environments;

export interface ClientOptions {
  /**
   * Defaults to process.env['BANDLAB_SDK_BEARER_TOKEN'].
   */
  bearerToken?: string | undefined;

  /**
   * Specifies the environment to use for the API.
   *
   * Each environment maps to a different base URL:
   * - `production` corresponds to `https://test.bandlab.com/api/v1.3`
   * - `environment_1` corresponds to `https://bandlab.com/api/v1.3`
   */
  environment?: Environment | undefined;

  /**
   * Override the default base URL for the API, e.g., "https://api.example.com/v2/"
   *
   * Defaults to process.env['BANDLAB_SDK_BASE_URL'].
   */
  baseURL?: string | null | undefined;

  /**
   * The maximum amount of time (in milliseconds) that the client should wait for a response
   * from the server before timing out a single request.
   *
   * Note that request timeouts are retried by default, so in a worst-case scenario you may wait
   * much longer than this timeout before the promise succeeds or fails.
   *
   * @unit milliseconds
   */
  timeout?: number | undefined;
  /**
   * Additional `RequestInit` options to be passed to `fetch` calls.
   * Properties will be overridden by per-request `fetchOptions`.
   */
  fetchOptions?: MergedRequestInit | undefined;

  /**
   * Specify a custom `fetch` function implementation.
   *
   * If not provided, we expect that `fetch` is defined globally.
   */
  fetch?: Fetch | undefined;

  /**
   * The maximum number of times that the client will retry a request in case of a
   * temporary failure, like a network error or a 5XX error from the server.
   *
   * @default 2
   */
  maxRetries?: number | undefined;

  /**
   * Default headers to include with every request to the API.
   *
   * These can be removed in individual requests by explicitly setting the
   * header to `null` in request options.
   */
  defaultHeaders?: HeadersLike | undefined;

  /**
   * Default query parameters to include with every request to the API.
   *
   * These can be removed in individual requests by explicitly setting the
   * param to `undefined` in request options.
   */
  defaultQuery?: Record<string, string | undefined> | undefined;

  /**
   * Set the log level.
   *
   * Defaults to process.env['BANDLAB_SDK_LOG'] or 'warn' if it isn't set.
   */
  logLevel?: LogLevel | undefined;

  /**
   * Set the logger.
   *
   * Defaults to globalThis.console.
   */
  logger?: Logger | undefined;
}

/**
 * API Client for interfacing with the Bandlab SDK API.
 */
export class BandlabSDK {
  bearerToken: string;

  baseURL: string;
  maxRetries: number;
  timeout: number;
  logger: Logger | undefined;
  logLevel: LogLevel | undefined;
  fetchOptions: MergedRequestInit | undefined;

  private fetch: Fetch;
  #encoder: Opts.RequestEncoder;
  protected idempotencyHeader?: string;
  private _options: ClientOptions;

  /**
   * API Client for interfacing with the Bandlab SDK API.
   *
   * @param {string | undefined} [opts.bearerToken=process.env['BANDLAB_SDK_BEARER_TOKEN'] ?? undefined]
   * @param {Environment} [opts.environment=production] - Specifies the environment URL to use for the API.
   * @param {string} [opts.baseURL=process.env['BANDLAB_SDK_BASE_URL'] ?? https://test.bandlab.com/api/v1.3] - Override the default base URL for the API.
   * @param {number} [opts.timeout=1 minute] - The maximum amount of time (in milliseconds) the client will wait for a response before timing out.
   * @param {MergedRequestInit} [opts.fetchOptions] - Additional `RequestInit` options to be passed to `fetch` calls.
   * @param {Fetch} [opts.fetch] - Specify a custom `fetch` function implementation.
   * @param {number} [opts.maxRetries=2] - The maximum number of times the client will retry a request.
   * @param {HeadersLike} opts.defaultHeaders - Default headers to include with every request to the API.
   * @param {Record<string, string | undefined>} opts.defaultQuery - Default query parameters to include with every request to the API.
   */
  constructor({
    baseURL = readEnv('BANDLAB_SDK_BASE_URL'),
    bearerToken = readEnv('BANDLAB_SDK_BEARER_TOKEN'),
    ...opts
  }: ClientOptions = {}) {
    if (bearerToken === undefined) {
      throw new Errors.BandlabSDKError(
        "The BANDLAB_SDK_BEARER_TOKEN environment variable is missing or empty; either provide it, or instantiate the BandlabSDK client with an bearerToken option, like new BandlabSDK({ bearerToken: 'My Bearer Token' }).",
      );
    }

    const options: ClientOptions = {
      bearerToken,
      ...opts,
      baseURL,
      environment: opts.environment ?? 'production',
    };

    if (baseURL && opts.environment) {
      throw new Errors.BandlabSDKError(
        'Ambiguous URL; The `baseURL` option (or BANDLAB_SDK_BASE_URL env var) and the `environment` option are given. If you want to use the environment you must pass baseURL: null',
      );
    }

    this.baseURL = options.baseURL || environments[options.environment || 'production'];
    this.timeout = options.timeout ?? BandlabSDK.DEFAULT_TIMEOUT /* 1 minute */;
    this.logger = options.logger ?? console;
    const defaultLogLevel = 'warn';
    // Set default logLevel early so that we can log a warning in parseLogLevel.
    this.logLevel = defaultLogLevel;
    this.logLevel =
      parseLogLevel(options.logLevel, 'ClientOptions.logLevel', this) ??
      parseLogLevel(readEnv('BANDLAB_SDK_LOG'), "process.env['BANDLAB_SDK_LOG']", this) ??
      defaultLogLevel;
    this.fetchOptions = options.fetchOptions;
    this.maxRetries = options.maxRetries ?? 2;
    this.fetch = options.fetch ?? Shims.getDefaultFetch();
    this.#encoder = Opts.FallbackEncoder;

    this._options = options;

    this.bearerToken = bearerToken;
  }

  /**
   * Create a new client instance re-using the same options given to the current client with optional overriding.
   */
  withOptions(options: Partial<ClientOptions>): this {
    const client = new (this.constructor as any as new (props: ClientOptions) => typeof this)({
      ...this._options,
      environment: options.environment ? options.environment : undefined,
      baseURL: options.environment ? undefined : this.baseURL,
      maxRetries: this.maxRetries,
      timeout: this.timeout,
      logger: this.logger,
      logLevel: this.logLevel,
      fetch: this.fetch,
      fetchOptions: this.fetchOptions,
      bearerToken: this.bearerToken,
      ...options,
    });
    return client;
  }

  /**
   * Check whether the base URL is set to its default.
   */
  #baseURLOverridden(): boolean {
    return this.baseURL !== environments[this._options.environment || 'production'];
  }

  protected defaultQuery(): Record<string, string | undefined> | undefined {
    return this._options.defaultQuery;
  }

  protected validateHeaders({ values, nulls }: NullableHeaders) {
    return;
  }

  protected async authHeaders(opts: FinalRequestOptions): Promise<NullableHeaders | undefined> {
    return buildHeaders([{ Authorization: `Bearer ${this.bearerToken}` }]);
  }

  /**
   * Basic re-implementation of `qs.stringify` for primitive types.
   */
  protected stringifyQuery(query: Record<string, unknown>): string {
    return Object.entries(query)
      .filter(([_, value]) => typeof value !== 'undefined')
      .map(([key, value]) => {
        if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
          return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
        }
        if (value === null) {
          return `${encodeURIComponent(key)}=`;
        }
        throw new Errors.BandlabSDKError(
          `Cannot stringify type ${typeof value}; Expected string, number, boolean, or null. If you need to pass nested query parameters, you can manually encode them, e.g. { query: { 'foo[key1]': value1, 'foo[key2]': value2 } }, and please open a GitHub issue requesting better support for your use case.`,
        );
      })
      .join('&');
  }

  private getUserAgent(): string {
    return `${this.constructor.name}/JS ${VERSION}`;
  }

  protected defaultIdempotencyKey(): string {
    return `stainless-node-retry-${uuid4()}`;
  }

  protected makeStatusError(
    status: number,
    error: Object,
    message: string | undefined,
    headers: Headers,
  ): Errors.APIError {
    return Errors.APIError.generate(status, error, message, headers);
  }

  buildURL(
    path: string,
    query: Record<string, unknown> | null | undefined,
    defaultBaseURL?: string | undefined,
  ): string {
    const baseURL = (!this.#baseURLOverridden() && defaultBaseURL) || this.baseURL;
    const url =
      isAbsoluteURL(path) ?
        new URL(path)
      : new URL(baseURL + (baseURL.endsWith('/') && path.startsWith('/') ? path.slice(1) : path));

    const defaultQuery = this.defaultQuery();
    if (!isEmptyObj(defaultQuery)) {
      query = { ...defaultQuery, ...query };
    }

    if (typeof query === 'object' && query && !Array.isArray(query)) {
      url.search = this.stringifyQuery(query as Record<string, unknown>);
    }

    return url.toString();
  }

  /**
   * Used as a callback for mutating the given `FinalRequestOptions` object.
   */
  protected async prepareOptions(options: FinalRequestOptions): Promise<void> {}

  /**
   * Used as a callback for mutating the given `RequestInit` object.
   *
   * This is useful for cases where you want to add certain headers based off of
   * the request properties, e.g. `method` or `url`.
   */
  protected async prepareRequest(
    request: RequestInit,
    { url, options }: { url: string; options: FinalRequestOptions },
  ): Promise<void> {}

  get<Rsp>(path: string, opts?: PromiseOrValue<RequestOptions>): APIPromise<Rsp> {
    return this.methodRequest('get', path, opts);
  }

  post<Rsp>(path: string, opts?: PromiseOrValue<RequestOptions>): APIPromise<Rsp> {
    return this.methodRequest('post', path, opts);
  }

  patch<Rsp>(path: string, opts?: PromiseOrValue<RequestOptions>): APIPromise<Rsp> {
    return this.methodRequest('patch', path, opts);
  }

  put<Rsp>(path: string, opts?: PromiseOrValue<RequestOptions>): APIPromise<Rsp> {
    return this.methodRequest('put', path, opts);
  }

  delete<Rsp>(path: string, opts?: PromiseOrValue<RequestOptions>): APIPromise<Rsp> {
    return this.methodRequest('delete', path, opts);
  }

  private methodRequest<Rsp>(
    method: HTTPMethod,
    path: string,
    opts?: PromiseOrValue<RequestOptions>,
  ): APIPromise<Rsp> {
    return this.request(
      Promise.resolve(opts).then((opts) => {
        return { method, path, ...opts };
      }),
    );
  }

  request<Rsp>(
    options: PromiseOrValue<FinalRequestOptions>,
    remainingRetries: number | null = null,
  ): APIPromise<Rsp> {
    return new APIPromise(this, this.makeRequest(options, remainingRetries, undefined));
  }

  private async makeRequest(
    optionsInput: PromiseOrValue<FinalRequestOptions>,
    retriesRemaining: number | null,
    retryOfRequestLogID: string | undefined,
  ): Promise<APIResponseProps> {
    const options = await optionsInput;
    const maxRetries = options.maxRetries ?? this.maxRetries;
    if (retriesRemaining == null) {
      retriesRemaining = maxRetries;
    }

    await this.prepareOptions(options);

    const { req, url, timeout } = await this.buildRequest(options, {
      retryCount: maxRetries - retriesRemaining,
    });

    await this.prepareRequest(req, { url, options });

    /** Not an API request ID, just for correlating local log entries. */
    const requestLogID = 'log_' + ((Math.random() * (1 << 24)) | 0).toString(16).padStart(6, '0');
    const retryLogStr = retryOfRequestLogID === undefined ? '' : `, retryOf: ${retryOfRequestLogID}`;
    const startTime = Date.now();

    loggerFor(this).debug(
      `[${requestLogID}] sending request`,
      formatRequestDetails({
        retryOfRequestLogID,
        method: options.method,
        url,
        options,
        headers: req.headers,
      }),
    );

    if (options.signal?.aborted) {
      throw new Errors.APIUserAbortError();
    }

    const controller = new AbortController();
    const response = await this.fetchWithTimeout(url, req, timeout, controller).catch(castToError);
    const headersTime = Date.now();

    if (response instanceof globalThis.Error) {
      const retryMessage = `retrying, ${retriesRemaining} attempts remaining`;
      if (options.signal?.aborted) {
        throw new Errors.APIUserAbortError();
      }
      // detect native connection timeout errors
      // deno throws "TypeError: error sending request for url (https://example/): client error (Connect): tcp connect error: Operation timed out (os error 60): Operation timed out (os error 60)"
      // undici throws "TypeError: fetch failed" with cause "ConnectTimeoutError: Connect Timeout Error (attempted address: example:443, timeout: 1ms)"
      // others do not provide enough information to distinguish timeouts from other connection errors
      const isTimeout =
        isAbortError(response) ||
        /timed? ?out/i.test(String(response) + ('cause' in response ? String(response.cause) : ''));
      if (retriesRemaining) {
        loggerFor(this).info(
          `[${requestLogID}] connection ${isTimeout ? 'timed out' : 'failed'} - ${retryMessage}`,
        );
        loggerFor(this).debug(
          `[${requestLogID}] connection ${isTimeout ? 'timed out' : 'failed'} (${retryMessage})`,
          formatRequestDetails({
            retryOfRequestLogID,
            url,
            durationMs: headersTime - startTime,
            message: response.message,
          }),
        );
        return this.retryRequest(options, retriesRemaining, retryOfRequestLogID ?? requestLogID);
      }
      loggerFor(this).info(
        `[${requestLogID}] connection ${isTimeout ? 'timed out' : 'failed'} - error; no more retries left`,
      );
      loggerFor(this).debug(
        `[${requestLogID}] connection ${isTimeout ? 'timed out' : 'failed'} (error; no more retries left)`,
        formatRequestDetails({
          retryOfRequestLogID,
          url,
          durationMs: headersTime - startTime,
          message: response.message,
        }),
      );
      if (isTimeout) {
        throw new Errors.APIConnectionTimeoutError();
      }
      throw new Errors.APIConnectionError({ cause: response });
    }

    const responseInfo = `[${requestLogID}${retryLogStr}] ${req.method} ${url} ${
      response.ok ? 'succeeded' : 'failed'
    } with status ${response.status} in ${headersTime - startTime}ms`;

    if (!response.ok) {
      const shouldRetry = await this.shouldRetry(response);
      if (retriesRemaining && shouldRetry) {
        const retryMessage = `retrying, ${retriesRemaining} attempts remaining`;

        // We don't need the body of this response.
        await Shims.CancelReadableStream(response.body);
        loggerFor(this).info(`${responseInfo} - ${retryMessage}`);
        loggerFor(this).debug(
          `[${requestLogID}] response error (${retryMessage})`,
          formatRequestDetails({
            retryOfRequestLogID,
            url: response.url,
            status: response.status,
            headers: response.headers,
            durationMs: headersTime - startTime,
          }),
        );
        return this.retryRequest(
          options,
          retriesRemaining,
          retryOfRequestLogID ?? requestLogID,
          response.headers,
        );
      }

      const retryMessage = shouldRetry ? `error; no more retries left` : `error; not retryable`;

      loggerFor(this).info(`${responseInfo} - ${retryMessage}`);

      const errText = await response.text().catch((err: any) => castToError(err).message);
      const errJSON = safeJSON(errText);
      const errMessage = errJSON ? undefined : errText;

      loggerFor(this).debug(
        `[${requestLogID}] response error (${retryMessage})`,
        formatRequestDetails({
          retryOfRequestLogID,
          url: response.url,
          status: response.status,
          headers: response.headers,
          message: errMessage,
          durationMs: Date.now() - startTime,
        }),
      );

      const err = this.makeStatusError(response.status, errJSON, errMessage, response.headers);
      throw err;
    }

    loggerFor(this).info(responseInfo);
    loggerFor(this).debug(
      `[${requestLogID}] response start`,
      formatRequestDetails({
        retryOfRequestLogID,
        url: response.url,
        status: response.status,
        headers: response.headers,
        durationMs: headersTime - startTime,
      }),
    );

    return { response, options, controller, requestLogID, retryOfRequestLogID, startTime };
  }

  async fetchWithTimeout(
    url: RequestInfo,
    init: RequestInit | undefined,
    ms: number,
    controller: AbortController,
  ): Promise<Response> {
    const { signal, method, ...options } = init || {};
    if (signal) signal.addEventListener('abort', () => controller.abort());

    const timeout = setTimeout(() => controller.abort(), ms);

    const isReadableBody =
      ((globalThis as any).ReadableStream && options.body instanceof (globalThis as any).ReadableStream) ||
      (typeof options.body === 'object' && options.body !== null && Symbol.asyncIterator in options.body);

    const fetchOptions: RequestInit = {
      signal: controller.signal as any,
      ...(isReadableBody ? { duplex: 'half' } : {}),
      method: 'GET',
      ...options,
    };
    if (method) {
      // Custom methods like 'patch' need to be uppercased
      // See https://github.com/nodejs/undici/issues/2294
      fetchOptions.method = method.toUpperCase();
    }

    try {
      // use undefined this binding; fetch errors if bound to something else in browser/cloudflare
      return await this.fetch.call(undefined, url, fetchOptions);
    } finally {
      clearTimeout(timeout);
    }
  }

  private async shouldRetry(response: Response): Promise<boolean> {
    // Note this is not a standard header.
    const shouldRetryHeader = response.headers.get('x-should-retry');

    // If the server explicitly says whether or not to retry, obey.
    if (shouldRetryHeader === 'true') return true;
    if (shouldRetryHeader === 'false') return false;

    // Retry on request timeouts.
    if (response.status === 408) return true;

    // Retry on lock timeouts.
    if (response.status === 409) return true;

    // Retry on rate limits.
    if (response.status === 429) return true;

    // Retry internal errors.
    if (response.status >= 500) return true;

    return false;
  }

  private async retryRequest(
    options: FinalRequestOptions,
    retriesRemaining: number,
    requestLogID: string,
    responseHeaders?: Headers | undefined,
  ): Promise<APIResponseProps> {
    let timeoutMillis: number | undefined;

    // Note the `retry-after-ms` header may not be standard, but is a good idea and we'd like proactive support for it.
    const retryAfterMillisHeader = responseHeaders?.get('retry-after-ms');
    if (retryAfterMillisHeader) {
      const timeoutMs = parseFloat(retryAfterMillisHeader);
      if (!Number.isNaN(timeoutMs)) {
        timeoutMillis = timeoutMs;
      }
    }

    // About the Retry-After header: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Retry-After
    const retryAfterHeader = responseHeaders?.get('retry-after');
    if (retryAfterHeader && !timeoutMillis) {
      const timeoutSeconds = parseFloat(retryAfterHeader);
      if (!Number.isNaN(timeoutSeconds)) {
        timeoutMillis = timeoutSeconds * 1000;
      } else {
        timeoutMillis = Date.parse(retryAfterHeader) - Date.now();
      }
    }

    // If the API asks us to wait a certain amount of time (and it's a reasonable amount),
    // just do what it says, but otherwise calculate a default
    if (!(timeoutMillis && 0 <= timeoutMillis && timeoutMillis < 60 * 1000)) {
      const maxRetries = options.maxRetries ?? this.maxRetries;
      timeoutMillis = this.calculateDefaultRetryTimeoutMillis(retriesRemaining, maxRetries);
    }
    await sleep(timeoutMillis);

    return this.makeRequest(options, retriesRemaining - 1, requestLogID);
  }

  private calculateDefaultRetryTimeoutMillis(retriesRemaining: number, maxRetries: number): number {
    const initialRetryDelay = 0.5;
    const maxRetryDelay = 8.0;

    const numRetries = maxRetries - retriesRemaining;

    // Apply exponential backoff, but not more than the max.
    const sleepSeconds = Math.min(initialRetryDelay * Math.pow(2, numRetries), maxRetryDelay);

    // Apply some jitter, take up to at most 25 percent of the retry time.
    const jitter = 1 - Math.random() * 0.25;

    return sleepSeconds * jitter * 1000;
  }

  async buildRequest(
    inputOptions: FinalRequestOptions,
    { retryCount = 0 }: { retryCount?: number } = {},
  ): Promise<{ req: FinalizedRequestInit; url: string; timeout: number }> {
    const options = { ...inputOptions };
    const { method, path, query, defaultBaseURL } = options;

    const url = this.buildURL(path!, query as Record<string, unknown>, defaultBaseURL);
    if ('timeout' in options) validatePositiveInteger('timeout', options.timeout);
    options.timeout = options.timeout ?? this.timeout;
    const { bodyHeaders, body } = this.buildBody({ options });
    const reqHeaders = await this.buildHeaders({ options: inputOptions, method, bodyHeaders, retryCount });

    const req: FinalizedRequestInit = {
      method,
      headers: reqHeaders,
      ...(options.signal && { signal: options.signal }),
      ...((globalThis as any).ReadableStream &&
        body instanceof (globalThis as any).ReadableStream && { duplex: 'half' }),
      ...(body && { body }),
      ...((this.fetchOptions as any) ?? {}),
      ...((options.fetchOptions as any) ?? {}),
    };

    return { req, url, timeout: options.timeout };
  }

  private async buildHeaders({
    options,
    method,
    bodyHeaders,
    retryCount,
  }: {
    options: FinalRequestOptions;
    method: HTTPMethod;
    bodyHeaders: HeadersLike;
    retryCount: number;
  }): Promise<Headers> {
    let idempotencyHeaders: HeadersLike = {};
    if (this.idempotencyHeader && method !== 'get') {
      if (!options.idempotencyKey) options.idempotencyKey = this.defaultIdempotencyKey();
      idempotencyHeaders[this.idempotencyHeader] = options.idempotencyKey;
    }

    const headers = buildHeaders([
      idempotencyHeaders,
      {
        Accept: 'application/json',
        'User-Agent': this.getUserAgent(),
        'X-Stainless-Retry-Count': String(retryCount),
        ...(options.timeout ? { 'X-Stainless-Timeout': String(Math.trunc(options.timeout / 1000)) } : {}),
        ...getPlatformHeaders(),
      },
      await this.authHeaders(options),
      this._options.defaultHeaders,
      bodyHeaders,
      options.headers,
    ]);

    this.validateHeaders(headers);

    return headers.values;
  }

  private buildBody({ options: { body, headers: rawHeaders } }: { options: FinalRequestOptions }): {
    bodyHeaders: HeadersLike;
    body: BodyInit | undefined;
  } {
    if (!body) {
      return { bodyHeaders: undefined, body: undefined };
    }
    const headers = buildHeaders([rawHeaders]);
    if (
      // Pass raw type verbatim
      ArrayBuffer.isView(body) ||
      body instanceof ArrayBuffer ||
      body instanceof DataView ||
      (typeof body === 'string' &&
        // Preserve legacy string encoding behavior for now
        headers.values.has('content-type')) ||
      // `Blob` is superset of `File`
      ((globalThis as any).Blob && body instanceof (globalThis as any).Blob) ||
      // `FormData` -> `multipart/form-data`
      body instanceof FormData ||
      // `URLSearchParams` -> `application/x-www-form-urlencoded`
      body instanceof URLSearchParams ||
      // Send chunked stream (each chunk has own `length`)
      ((globalThis as any).ReadableStream && body instanceof (globalThis as any).ReadableStream)
    ) {
      return { bodyHeaders: undefined, body: body as BodyInit };
    } else if (
      typeof body === 'object' &&
      (Symbol.asyncIterator in body ||
        (Symbol.iterator in body && 'next' in body && typeof body.next === 'function'))
    ) {
      return { bodyHeaders: undefined, body: Shims.ReadableStreamFrom(body as AsyncIterable<Uint8Array>) };
    } else {
      return this.#encoder({ body, headers });
    }
  }

  static BandlabSDK = this;
  static DEFAULT_TIMEOUT = 60000; // 1 minute

  static BandlabSDKError = Errors.BandlabSDKError;
  static APIError = Errors.APIError;
  static APIConnectionError = Errors.APIConnectionError;
  static APIConnectionTimeoutError = Errors.APIConnectionTimeoutError;
  static APIUserAbortError = Errors.APIUserAbortError;
  static NotFoundError = Errors.NotFoundError;
  static ConflictError = Errors.ConflictError;
  static RateLimitError = Errors.RateLimitError;
  static BadRequestError = Errors.BadRequestError;
  static AuthenticationError = Errors.AuthenticationError;
  static InternalServerError = Errors.InternalServerError;
  static PermissionDeniedError = Errors.PermissionDeniedError;
  static UnprocessableEntityError = Errors.UnprocessableEntityError;

  static toFile = Uploads.toFile;

  validation: API.Validation = new API.Validation(this);
  me: API.Me = new API.Me(this);
  users: API.Users = new API.Users(this);
  bands: API.Bands = new API.Bands(this);
  collections: API.Collections = new API.Collections(this);
  posts: API.Posts = new API.Posts(this);
  videos: API.Videos = new API.Videos(this);
  images: API.Images = new API.Images(this);
  revisions: API.Revisions = new API.Revisions(this);
  invites: API.Invites = new API.Invites(this);
  reports: API.Reports = new API.Reports(this);
  feedback: API.Feedback = new API.Feedback(this);
  versions: API.Versions = new API.Versions(this);
  labels: API.Labels = new API.Labels(this);
  genres: API.Genres = new API.Genres(this);
  skills: API.Skills = new API.Skills(this);
  badges: API.Badges = new API.Badges(this);
  push: API.Push = new API.Push(this);
  search: API.Search = new API.Search(this);
  authorizations: API.Authorizations = new API.Authorizations(this);
  logins: API.Logins = new API.Logins(this);
  emails: API.Emails = new API.Emails(this);
  passwords: API.Passwords = new API.Passwords(this);
  settings: API.Settings = new API.Settings(this);
  communities: API.Communities = new API.Communities(this);
  songs: API.Songs = new API.Songs(this);
}

BandlabSDK.Validation = Validation;
BandlabSDK.Me = Me;
BandlabSDK.Users = Users;
BandlabSDK.Bands = Bands;
BandlabSDK.Collections = Collections;
BandlabSDK.Posts = Posts;
BandlabSDK.Videos = Videos;
BandlabSDK.Images = Images;
BandlabSDK.Revisions = Revisions;
BandlabSDK.Invites = Invites;
BandlabSDK.Reports = Reports;
BandlabSDK.Feedback = Feedback;
BandlabSDK.Versions = Versions;
BandlabSDK.Labels = Labels;
BandlabSDK.Genres = Genres;
BandlabSDK.Skills = Skills;
BandlabSDK.Badges = Badges;
BandlabSDK.Push = Push;
BandlabSDK.Search = Search;
BandlabSDK.Authorizations = Authorizations;
BandlabSDK.Logins = Logins;
BandlabSDK.Emails = Emails;
BandlabSDK.Passwords = Passwords;
BandlabSDK.Settings = Settings;
BandlabSDK.Communities = Communities;
BandlabSDK.Songs = Songs;

export declare namespace BandlabSDK {
  export type RequestOptions = Opts.RequestOptions;

  export {
    Validation as Validation,
    type ValidationValidateResponse as ValidationValidateResponse,
    type ValidationValidateParams as ValidationValidateParams,
  };

  export {
    Me as Me,
    type GeoCoordinate as GeoCoordinate,
    type Location as Location,
    type Picture as Picture,
    type Profile as Profile,
    type UserCounters as UserCounters,
    type MeUpdateParams as MeUpdateParams,
  };

  export {
    Users as Users,
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
    Bands as Bands,
    type Band as Band,
    type BandCounters as BandCounters,
    type Creator as Creator,
    type GroupMemberSummary as GroupMemberSummary,
    type BandCreateParams as BandCreateParams,
    type BandUpdateParams as BandUpdateParams,
    type BandListPostsParams as BandListPostsParams,
    type BandListSongsParams as BandListSongsParams,
  };

  export {
    Collections as Collections,
    type Collection as Collection,
    type CollectionCounters as CollectionCounters,
    type CollectionCreateParams as CollectionCreateParams,
    type CollectionUpdateParams as CollectionUpdateParams,
  };

  export {
    Posts as Posts,
    type Invite as Invite,
    type PostList as PostList,
    type SongSummary as SongSummary,
    type UserSummary as UserSummary,
    type PostListParams as PostListParams,
  };

  export { Videos as Videos, type VideoCreatePostParams as VideoCreatePostParams };

  export { Images as Images, type ImageCreatePostParams as ImageCreatePostParams };

  export {
    Revisions as Revisions,
    type AudioSample as AudioSample,
    type Mastering as Mastering,
    type Revision as Revision,
    type RevisionCounters as RevisionCounters,
    type RevisionCreateParams as RevisionCreateParams,
    type RevisionUpdateParams as RevisionUpdateParams,
  };

  export { Invites as Invites, type InviteBatch as InviteBatch, type InviteSendParams as InviteSendParams };

  export { Reports as Reports, type ReportCreateParams as ReportCreateParams };

  export { Feedback as Feedback, type FeedbackCreateParams as FeedbackCreateParams };

  export {
    Versions as Versions,
    type VersionRetrieveResponse as VersionRetrieveResponse,
    type VersionValidateResponse as VersionValidateResponse,
    type VersionValidateParams as VersionValidateParams,
  };

  export { Labels as Labels, type LabelListResponse as LabelListResponse };

  export { Genres as Genres, type Genre as Genre, type GenreListResponse as GenreListResponse };

  export { Skills as Skills, type Skill as Skill, type SkillListResponse as SkillListResponse };

  export { Badges as Badges, type Badge as Badge, type BadgeListResponse as BadgeListResponse };

  export { Push as Push };

  export {
    Search as Search,
    type SearchGlobalSearchResponse as SearchGlobalSearchResponse,
    type SearchSearchBandsResponse as SearchSearchBandsResponse,
    type SearchGlobalSearchParams as SearchGlobalSearchParams,
    type SearchSearchBandsParams as SearchSearchBandsParams,
    type SearchSearchCollectionsParams as SearchSearchCollectionsParams,
    type SearchSearchSongsParams as SearchSearchSongsParams,
    type SearchSearchUsersParams as SearchSearchUsersParams,
  };

  export {
    Authorizations as Authorizations,
    type Provider as Provider,
    type AuthorizationCreateSessionKeyResponse as AuthorizationCreateSessionKeyResponse,
    type AuthorizationCreateSessionKeyParams as AuthorizationCreateSessionKeyParams,
  };

  export {
    Logins as Logins,
    type Login as Login,
    type ProviderType139 as ProviderType139,
    type LoginListResponse as LoginListResponse,
    type LoginCreateParams as LoginCreateParams,
    type LoginUpdateParams as LoginUpdateParams,
  };

  export { Emails as Emails };

  export {
    Passwords as Passwords,
    type PasswordChangeParams as PasswordChangeParams,
    type PasswordResetParams as PasswordResetParams,
    type PasswordSendRestoreEmailParams as PasswordSendRestoreEmailParams,
  };

  export { Settings as Settings };

  export {
    Communities as Communities,
    type Community as Community,
    type CommunityCounters as CommunityCounters,
    type Type as Type,
    type CommunityCreateParams as CommunityCreateParams,
    type CommunityUpdateParams as CommunityUpdateParams,
  };

  export {
    Songs as Songs,
    type Author as Author,
    type Song as Song,
    type SongCounters as SongCounters,
    type SongOriginal as SongOriginal,
    type SongUpdateParams as SongUpdateParams,
    type SongListPostsParams as SongListPostsParams,
  };

  export type ImageSample = API.ImageSample;
  export type ImageSampleCounters = API.ImageSampleCounters;
  export type Lyrics = API.Lyrics;
  export type PostCounters = API.PostCounters;
  export type RevisionSummary = API.RevisionSummary;
  export type VideoSample = API.VideoSample;
  export type VideoSampleCounters = API.VideoSampleCounters;
}
