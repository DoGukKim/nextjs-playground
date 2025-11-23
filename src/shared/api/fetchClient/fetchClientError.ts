import { FetchClientErrorConfig } from "./types";

class FetchClientError extends Error {
  readonly status: number;
  readonly statusText: string;
  readonly url: string;
  readonly response: Response;
  readonly data: unknown;

  constructor({ response, data }: FetchClientErrorConfig) {
    super(`HTTP ${response.status}: ${response.statusText}`);
    this.name = "FetchClientError";
    this.status = response.status;
    this.statusText = response.statusText;
    this.url = response.url;
    this.response = response;
    this.data = data;
  }
}

export default FetchClientError;
