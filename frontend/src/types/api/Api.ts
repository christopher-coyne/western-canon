/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface SignUpDto {
  /**
   * User's email address
   * @example "user@example.com"
   */
  email: string;
  /**
   * User's display name
   * @example "John Doe"
   */
  name: string;
  /**
   * User's password
   * @example "StrongP@ss123"
   */
  password: string;
}

export interface UserProfileDto {
  /**
   * The unique identifier of the user
   * @example "123e4567-e89b-12d3-a456-426614174000"
   */
  id: string;
  /**
   * User's email address
   * @example "john.doe@example.com"
   */
  email: string;
  /**
   * User's display name
   * @example "John Doe"
   */
  name: string;
  /**
   * User's role in the system
   * @example "USER"
   */
  role: "USER" | "ADMIN";
  /**
   * Number of consecutive days the user has been active
   * @example 5
   */
  dayStreak: number;
  /**
   * Last time the user was active
   * @example "2024-03-12T10:30:00Z"
   */
  lastActive: object;
  /**
   * When the user account was created
   * @format date-time
   * @example "2024-01-01T00:00:00Z"
   */
  createdAt: string;
  /**
   * Total number of snippets favorited by the user
   * @example 42
   */
  favoriteCount: number;
}

export interface UpdateCursorDto {
  /**
   * new cursor value
   * @example 1
   */
  cursor: number;
}

export interface AuthorDto {
  id: string;
  name: string;
  birthYear?: object;
  birthYearApprox: boolean;
  deathYear?: object;
  intro: string;
  /** @format date-time */
  createdAt: string;
  /** @format date-time */
  updatedAt: string;
  /** @format date-time */
  deletedAt?: string;
  works: WorkDto[];
}

export interface GenreDto {
  name: string;
}

export interface WorkGenreDto {
  genre: GenreDto;
}

export interface WorkDto {
  id: string;
  title: string;
  introductions: string;
  pageCount?: object;
  publishYear?: object;
  authorId: string;
  /** @format date-time */
  createdAt: string;
  /** @format date-time */
  updatedAt: string;
  /** @format date-time */
  deletedAt?: string;
  author: AuthorDto;
  genres: WorkGenreDto[];
}

export interface FavoriteDto {
  snippetId: string;
}

export interface ListSnippetDto {
  id: string;
  content: string;
  analysis?: string;
  workId: string;
  order: number;
  /** @format date-time */
  createdAt: string;
  /** @format date-time */
  updatedAt: string;
  /** @format date-time */
  deletedAt?: string;
  work: WorkDto;
  favorites: FavoriteDto[];
}

export interface SnippetDto {
  id: string;
  content: string;
  analysis?: string;
  workId: string;
  /** @format date-time */
  createdAt: string;
  /** @format date-time */
  updatedAt: string;
  /** @format date-time */
  deletedAt?: string;
  order: number;
  work: WorkDto;
  favorites: FavoriteDto[];
}

export interface FavoriteSnippetDto {
  /** @format date-time */
  createdAt: string;
  snippet: SnippetDto;
}

export interface ToggleFavoriteSnippetResponseDto {
  /** The action that was performed on the snippet */
  action: "FAVORITE" | "UNFAVORITE";
  /** The ID of the snippet that was toggled */
  snippetId: string;
}

export type QueryParamsType = Record<string | number, any>;
export type ResponseFormat = keyof Omit<Body, "body" | "bodyUsed">;

export interface FullRequestParams extends Omit<RequestInit, "body"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseFormat;
  /** request body */
  body?: unknown;
  /** base url */
  baseUrl?: string;
  /** request cancellation token */
  cancelToken?: CancelToken;
}

export type RequestParams = Omit<
  FullRequestParams,
  "body" | "method" | "query" | "path"
>;

export interface ApiConfig<SecurityDataType = unknown> {
  baseUrl?: string;
  baseApiParams?: Omit<RequestParams, "baseUrl" | "cancelToken" | "signal">;
  securityWorker?: (
    securityData: SecurityDataType | null
  ) => Promise<RequestParams | void> | RequestParams | void;
  customFetch?: typeof fetch;
}

export interface HttpResponse<D extends unknown, E extends unknown = unknown>
  extends Response {
  data: D;
  error: E;
}

type CancelToken = Symbol | string | number;

export enum ContentType {
  Json = "application/json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public baseUrl: string = "";
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private abortControllers = new Map<CancelToken, AbortController>();
  private customFetch = (...fetchParams: Parameters<typeof fetch>) =>
    fetch(...fetchParams);

  private baseApiParams: RequestParams = {
    credentials: "same-origin",
    headers: {},
    redirect: "follow",
    referrerPolicy: "no-referrer",
  };

  constructor(apiConfig: ApiConfig<SecurityDataType> = {}) {
    Object.assign(this, apiConfig);
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected encodeQueryParam(key: string, value: any) {
    const encodedKey = encodeURIComponent(key);
    return `${encodedKey}=${encodeURIComponent(typeof value === "number" ? value : `${value}`)}`;
  }

  protected addQueryParam(query: QueryParamsType, key: string) {
    return this.encodeQueryParam(key, query[key]);
  }

  protected addArrayQueryParam(query: QueryParamsType, key: string) {
    const value = query[key];
    return value.map((v: any) => this.encodeQueryParam(key, v)).join("&");
  }

  protected toQueryString(rawQuery?: QueryParamsType): string {
    const query = rawQuery || {};
    const keys = Object.keys(query).filter(
      (key) => "undefined" !== typeof query[key]
    );
    return keys
      .map((key) =>
        Array.isArray(query[key])
          ? this.addArrayQueryParam(query, key)
          : this.addQueryParam(query, key)
      )
      .join("&");
  }

  protected addQueryParams(rawQuery?: QueryParamsType): string {
    const queryString = this.toQueryString(rawQuery);
    return queryString ? `?${queryString}` : "";
  }

  private contentFormatters: Record<ContentType, (input: any) => any> = {
    [ContentType.Json]: (input: any) =>
      input !== null && (typeof input === "object" || typeof input === "string")
        ? JSON.stringify(input)
        : input,
    [ContentType.Text]: (input: any) =>
      input !== null && typeof input !== "string"
        ? JSON.stringify(input)
        : input,
    [ContentType.FormData]: (input: any) =>
      Object.keys(input || {}).reduce((formData, key) => {
        const property = input[key];
        formData.append(
          key,
          property instanceof Blob
            ? property
            : typeof property === "object" && property !== null
              ? JSON.stringify(property)
              : `${property}`
        );
        return formData;
      }, new FormData()),
    [ContentType.UrlEncoded]: (input: any) => this.toQueryString(input),
  };

  protected mergeRequestParams(
    params1: RequestParams,
    params2?: RequestParams
  ): RequestParams {
    return {
      ...this.baseApiParams,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...(this.baseApiParams.headers || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected createAbortSignal = (
    cancelToken: CancelToken
  ): AbortSignal | undefined => {
    if (this.abortControllers.has(cancelToken)) {
      const abortController = this.abortControllers.get(cancelToken);
      if (abortController) {
        return abortController.signal;
      }
      return void 0;
    }

    const abortController = new AbortController();
    this.abortControllers.set(cancelToken, abortController);
    return abortController.signal;
  };

  public abortRequest = (cancelToken: CancelToken) => {
    const abortController = this.abortControllers.get(cancelToken);

    if (abortController) {
      abortController.abort();
      this.abortControllers.delete(cancelToken);
    }
  };

  public request = async <T = any, E = any>({
    body,
    secure,
    path,
    type,
    query,
    format,
    baseUrl,
    cancelToken,
    ...params
  }: FullRequestParams): Promise<HttpResponse<T, E>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.baseApiParams.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const queryString = query && this.toQueryString(query);
    const payloadFormatter = this.contentFormatters[type || ContentType.Json];
    const responseFormat = format || requestParams.format;

    return this.customFetch(
      `${baseUrl || this.baseUrl || ""}${path}${queryString ? `?${queryString}` : ""}`,
      {
        ...requestParams,
        headers: {
          ...(requestParams.headers || {}),
          ...(type && type !== ContentType.FormData
            ? { "Content-Type": type }
            : {}),
        },
        signal:
          (cancelToken
            ? this.createAbortSignal(cancelToken)
            : requestParams.signal) || null,
        body:
          typeof body === "undefined" || body === null
            ? null
            : payloadFormatter(body),
      }
    ).then(async (response) => {
      const r = response.clone() as HttpResponse<T, E>;
      r.data = null as unknown as T;
      r.error = null as unknown as E;

      const data = !responseFormat
        ? r
        : await response[responseFormat]()
            .then((data) => {
              if (r.ok) {
                r.data = data;
              } else {
                r.error = data;
              }
              return r;
            })
            .catch((e) => {
              r.error = e;
              return r;
            });

      if (cancelToken) {
        this.abortControllers.delete(cancelToken);
      }

      if (!response.ok) throw data;
      return data;
    });
  };
}

/**
 * @title Recommendations App
 * @version 1.0
 * @contact
 *
 * API for generating media recommendations using AI
 */
export class Api<
  SecurityDataType extends unknown,
> extends HttpClient<SecurityDataType> {
  auth = {
    /**
     * No description
     *
     * @tags auth
     * @name AuthControllerSignUp
     * @request POST:/auth/signup
     */
    authControllerSignUp: (data: SignUpDto, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/auth/signup`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags auth
     * @name AuthControllerLogin
     * @request POST:/auth/login
     */
    authControllerLogin: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/auth/login`,
        method: "POST",
        ...params,
      }),

    /**
     * No description
     *
     * @tags auth
     * @name AuthControllerLogout
     * @summary Log out the current user
     * @request POST:/auth/logout
     */
    authControllerLogout: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/auth/logout`,
        method: "POST",
        ...params,
      }),

    /**
     * No description
     *
     * @tags auth
     * @name AuthControllerProfile
     * @request GET:/auth/profile
     */
    authControllerProfile: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/auth/profile`,
        method: "GET",
        ...params,
      }),
  };
  users = {
    /**
     * No description
     *
     * @tags Users
     * @name UsersControllerGetProfile
     * @request GET:/users/profile
     */
    usersControllerGetProfile: (params: RequestParams = {}) =>
      this.request<any, UserProfileDto>({
        path: `/users/profile`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Users
     * @name UsersControllerUpdateCursor
     * @request PATCH:/users/cursor
     */
    usersControllerUpdateCursor: (
      data: UpdateCursorDto,
      params: RequestParams = {}
    ) =>
      this.request<any, UpdateCursorDto>({
        path: `/users/cursor`,
        method: "PATCH",
        body: data,
        type: ContentType.Json,
        ...params,
      }),
  };
  snippets = {
    /**
     * No description
     *
     * @tags Snippets
     * @name SnippetsControllerGetSnippets
     * @request GET:/snippets
     */
    snippetsControllerGetSnippets: (
      query?: {
        /**
         * Page number (starts from 1)
         * @default 1
         */
        page?: number;
        /**
         * Number of items per page
         * @default 12
         */
        pageSize?: number;
        /** Filter snippets by query */
        query?: string;
      },
      params: RequestParams = {}
    ) =>
      this.request<any, ListSnippetDto[]>({
        path: `/snippets`,
        method: "GET",
        query: query,
        ...params,
      }),
  };
  feed = {
    /**
     * No description
     *
     * @tags Feed
     * @name FeedControllerGetFeed
     * @request GET:/feed
     */
    feedControllerGetFeed: (
      query?: {
        /** Get snippets starting from this snippet id */
        cursor?: number;
        /** Direction of the feed */
        direction?: string;
      },
      params: RequestParams = {}
    ) =>
      this.request<any, SnippetDto[]>({
        path: `/feed`,
        method: "GET",
        query: query,
        ...params,
      }),
  };
  favorites = {
    /**
     * No description
     *
     * @tags Favorites
     * @name FavoritesControllerGetFavoriteSnippets
     * @request GET:/favorites
     */
    favoritesControllerGetFavoriteSnippets: (params: RequestParams = {}) =>
      this.request<any, FavoriteSnippetDto[]>({
        path: `/favorites`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Favorites
     * @name FavoritesControllerToggleFavoriteSnippet
     * @request PUT:/favorites/snippets/{id}
     */
    favoritesControllerToggleFavoriteSnippet: (
      id: string,
      params: RequestParams = {}
    ) =>
      this.request<any, ToggleFavoriteSnippetResponseDto[]>({
        path: `/favorites/snippets/${id}`,
        method: "PUT",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Favorites
     * @name FavoritesControllerFavoriteSnippet
     * @request POST:/favorites/snippets/{id}
     */
    favoritesControllerFavoriteSnippet: (
      id: string,
      params: RequestParams = {}
    ) =>
      this.request<void, any>({
        path: `/favorites/snippets/${id}`,
        method: "POST",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Favorites
     * @name FavoritesControllerUnfavoriteSnippet
     * @request DELETE:/favorites/snippets/{id}
     */
    favoritesControllerUnfavoriteSnippet: (
      id: string,
      params: RequestParams = {}
    ) =>
      this.request<void, any>({
        path: `/favorites/snippets/${id}`,
        method: "DELETE",
        ...params,
      }),
  };
  works = {
    /**
     * No description
     *
     * @tags Works
     * @name WorksControllerGetWorks
     * @request GET:/works
     */
    worksControllerGetWorks: (
      query?: {
        /**
         * Page number (starts from 1)
         * @default 1
         */
        page?: number;
        /**
         * Number of items per page
         * @default 12
         */
        pageSize?: number;
      },
      params: RequestParams = {}
    ) =>
      this.request<any, WorkDto[]>({
        path: `/works`,
        method: "GET",
        query: query,
        ...params,
      }),
  };
}
