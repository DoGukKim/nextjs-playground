export type ResponseType =
  | "json"
  | "text"
  | "blob"
  | "arraybuffer"
  | "formdata";

export interface FetchClientConfig
  extends Omit<RequestInit, "body" | "method" | "signal"> {
  baseUrl?: string;
  responseType?: ResponseType;
  qsStringifyOptions?: qs.IStringifyOptions;
  hooks?: FetchClientHooks;
}

export interface FetchClientRequestConfig<TBody>
  extends Omit<FetchClientConfig, "baseUrl" | "hooks">,
    Pick<RequestInit, "method" | "signal"> {
  body?: TBody | BodyInit | null;
  params?: URLSearchParams | Record<string, unknown>;
}

export interface MergedFetchClientConfig<TBody>
  extends FetchClientRequestConfig<TBody>,
    Pick<FetchClientConfig, "baseUrl"> {}

export interface BuildUrlParams
  extends Pick<
    MergedFetchClientConfig<never>,
    "baseUrl" | "params" | "qsStringifyOptions"
  > {
  url: string;
}

type BeforeRequestHook = <TBody = unknown>(
  config: MergedFetchClientConfig<TBody>
) => MergedFetchClientConfig<TBody> | Promise<MergedFetchClientConfig<TBody>>;

type AfterResponseHook = <TBody = unknown>(
  response: Response,
  config: MergedFetchClientConfig<TBody>
) => Response | Promise<Response>;

type OnResponseErrorHook = (
  error: Error,
  response: Response,
  config: MergedFetchClientConfig<unknown>
) => void | Promise<void>;

type OnRequestErrorHook = (
  error: Error,
  config: MergedFetchClientConfig<unknown>
) => void | Promise<void>;

export interface FetchClientHooks {
  beforeRequest?: BeforeRequestHook[];
  afterResponse?: AfterResponseHook[];
  onResponseError?: OnResponseErrorHook[];
  onRequestError?: OnRequestErrorHook[];
}

export interface FetchClientErrorConfig {
  response: Response;
  data: unknown;
}
