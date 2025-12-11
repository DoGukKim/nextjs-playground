import FetchClientError from "./fetchClientError";
import {
  bodySerializer,
  buildUrl,
  getContentType,
  mergeConfig,
  parseResponse,
} from "./helpers";
import HookRunner from "./hookRunner";
import {
  FetchClientConfig,
  FetchClientRequestConfig,
  MergedFetchClientConfig,
} from "./types";

class FetchClient {
  private readonly config: FetchClientConfig;
  private readonly hooks: HookRunner;

  constructor(config: FetchClientConfig = {}) {
    this.config = config;
    this.hooks = new HookRunner(config.hooks);
  }

  static create(config: FetchClientConfig = {}): FetchClient {
    return new FetchClient(config);
  }

  private async request<TBody = unknown, TResponse = unknown>(
    url: string,
    requestConfig: FetchClientRequestConfig<TBody>
  ): Promise<TResponse> {
    const baseConfig = mergeConfig<TBody>(this.config, requestConfig);
    let hookConfig: MergedFetchClientConfig<TBody> = baseConfig;

    try {
      hookConfig = await this.hooks.runBeforeRequest<TBody>(baseConfig);

      const {
        baseUrl,
        body,
        responseType = "json",
        params,
        qsStringifyOptions,
        headers,
        ...requestInit
      } = hookConfig;

      const fullUrl = buildUrl({
        url,
        baseUrl,
        params,
        qsStringifyOptions,
      });

      const requestHeaders = new Headers(headers);
      const contentType = getContentType<TBody>(body, requestHeaders);
      if (contentType) {
        requestHeaders.set("Content-Type", contentType);
      }

      const requestBody = bodySerializer<TBody>(body, contentType);

      const rawResponse = await fetch(fullUrl, {
        ...requestInit,
        body: requestBody,
        headers: requestHeaders,
      });

      const hookResponse = await this.hooks.runAfterResponse(
        rawResponse.clone(),
        hookConfig
      );

      const data = (await parseResponse(
        hookResponse,
        responseType
      )) as TResponse;

      if (!hookResponse.ok) {
        throw new FetchClientError({ response: hookResponse, data });
      }

      return data;
    } catch (error) {
      if (error instanceof FetchClientError) {
        await this.hooks.runOnResponseError(error, error.response, hookConfig);
      } else if (error instanceof Error) {
        await this.hooks.runOnRequestError(error, hookConfig);
      }

      throw error;
    }
  }

  async get<TResponse = unknown>(
    url: string,
    config?: Omit<FetchClientRequestConfig<never>, "body" | "method">
  ): Promise<TResponse> {
    return this.request<never, TResponse>(url, {
      ...config,
      method: "GET",
    });
  }

  async post<TBody, TResponse = unknown>(
    url: string,
    body: TBody,
    config?: Omit<FetchClientRequestConfig<TBody>, "body" | "method">
  ): Promise<TResponse> {
    return this.request<TBody, TResponse>(url, {
      ...config,
      body,
      method: "POST",
    });
  }

  async put<TBody, TResponse = unknown>(
    url: string,
    body: TBody,
    config?: Omit<FetchClientRequestConfig<TBody>, "body" | "method">
  ): Promise<TResponse> {
    return this.request<TBody, TResponse>(url, {
      ...config,
      body,
      method: "PUT",
    });
  }

  async patch<TBody, TResponse = unknown>(
    url: string,
    body: TBody,
    config?: Omit<FetchClientRequestConfig<TBody>, "body" | "method">
  ): Promise<TResponse> {
    return this.request<TBody, TResponse>(url, {
      ...config,
      body,
      method: "PATCH",
    });
  }

  async delete<TResponse = unknown>(
    url: string,
    config?: Omit<FetchClientRequestConfig<never>, "body" | "method">
  ): Promise<TResponse> {
    return this.request<never, TResponse>(url, {
      ...config,
      method: "DELETE",
    });
  }
}

export default FetchClient;
