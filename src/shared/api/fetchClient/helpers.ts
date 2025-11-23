import qs from "qs";
import {
  BuildUrlParams,
  FetchClientConfig,
  FetchClientRequestConfig,
  MergedFetchClientConfig,
  ResponseType,
} from "./types";

function mergeHeaders(...headersList: (HeadersInit | undefined)[]) {
  const mergedHeaders = new Headers();

  for (const headers of headersList) {
    if (!headers) continue;

    if (headers instanceof Headers) {
      headers.forEach((value, key) => {
        mergedHeaders.set(key, value);
      });
    } else if (Array.isArray(headers)) {
      headers.forEach(([key, value]) => {
        mergedHeaders.set(key, value);
      });
    } else {
      Object.entries(headers).forEach(([key, value]) => {
        mergedHeaders.set(key, value);
      });
    }
  }

  return mergedHeaders;
}

export function mergeConfig<TBody>(
  config: FetchClientConfig,
  requestConfig: FetchClientRequestConfig<TBody>
): MergedFetchClientConfig<TBody> {
  return {
    ...config,
    ...requestConfig,
    headers: mergeHeaders(config.headers, requestConfig.headers),
  };
}

function isAbsoluteUrl(url: string) {
  return url.startsWith("http://") || url.startsWith("https://");
}

export function buildUrl({
  url,
  baseUrl,
  params,
  qsStringifyOptions,
}: BuildUrlParams): URL {
  const fullUrl = isAbsoluteUrl(url)
    ? new URL(url)
    : new URL(url, baseUrl ?? location.origin);

  if (params) {
    if (params instanceof URLSearchParams) {
      fullUrl.search = params.toString();
    } else {
      fullUrl.search = qs.stringify(params, qsStringifyOptions);
    }
  }

  return fullUrl;
}

export function getContentType<TBody>(
  body: MergedFetchClientConfig<TBody>["body"],
  headers: Headers
): string | null {
  if (headers.has("Content-Type") || body == null || body instanceof FormData) {
    return null;
  }

  if (body instanceof URLSearchParams)
    return "application/x-www-form-urlencoded;charset=UTF-8";
  if (body instanceof Blob) return body.type || "application/octet-stream";
  if (
    body instanceof ArrayBuffer ||
    body instanceof ReadableStream ||
    ArrayBuffer.isView(body)
  ) {
    return "application/octet-stream";
  }
  if (typeof body === "string") return "text/plain;charset=UTF-8";
  if (typeof body === "object") return "application/json";

  return null;
}

export function bodySerializer<TBody>(
  body: MergedFetchClientConfig<TBody>["body"],
  contentType: string | null
) {
  if (body == null) return null;

  if (
    body instanceof FormData ||
    body instanceof URLSearchParams ||
    body instanceof Blob ||
    body instanceof ArrayBuffer ||
    ArrayBuffer.isView(body) ||
    typeof body === "string"
  ) {
    return body;
  }

  if (contentType === "application/json") {
    return JSON.stringify(body);
  }

  return null;
}

export async function parseResponse(
  response: Response,
  responseType: ResponseType
): Promise<unknown> {
  const contentLength = response.headers.get("content-length");
  if (response.status === 204 || contentLength === "0") {
    return null;
  }

  switch (responseType) {
    case "json": {
      const text = await response.text();
      if (!text) {
        return null;
      }
      try {
        return JSON.parse(text);
      } catch {
        throw new Error(`Failed to parse JSON response: ${text.slice(0, 100)}`);
      }
    }
    case "text":
      return await response.text();
    case "blob":
      return await response.blob();
    case "arraybuffer":
      return await response.arrayBuffer();
    case "formdata":
      return await response.formData();
    default: {
      const defaultText = await response.text();
      if (!defaultText) {
        return null;
      }
      try {
        return JSON.parse(defaultText);
      } catch {
        throw new Error(
          `Failed to parse JSON response: ${defaultText.slice(0, 100)}`
        );
      }
    }
  }
}
