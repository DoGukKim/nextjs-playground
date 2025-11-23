import { FetchClientHooks, MergedFetchClientConfig } from "./types";

class HookRunner {
  private readonly hooks: FetchClientHooks;

  constructor(hooks: FetchClientHooks = {}) {
    this.hooks = hooks;
  }

  async runBeforeRequest<TBody = unknown>(
    config: MergedFetchClientConfig<TBody>
  ) {
    const hooks = this.hooks.beforeRequest;
    if (!hooks) return config;

    let interceptedConfig: MergedFetchClientConfig<TBody> = config;
    for (const hook of hooks) {
      interceptedConfig = await hook(interceptedConfig);
    }
    return interceptedConfig;
  }

  async runAfterResponse<TBody = unknown>(
    response: Response,
    config: MergedFetchClientConfig<TBody>
  ) {
    const hooks = this.hooks.afterResponse;
    if (!hooks) return response;

    let interceptedResponse = response;
    for (const hook of hooks) {
      interceptedResponse = await hook(interceptedResponse, config);
    }
    return interceptedResponse;
  }

  async runOnRequestError(
    error: Error,
    config: MergedFetchClientConfig<unknown>
  ): Promise<void> {
    if (this.hooks.onRequestError) {
      for (const hook of this.hooks.onRequestError) {
        await hook(error, config);
      }
    }
  }

  async runOnResponseError(
    error: Error,
    response: Response,
    config: MergedFetchClientConfig<unknown>
  ): Promise<void> {
    if (this.hooks.onResponseError) {
      for (const hook of this.hooks.onResponseError) {
        await hook(error, response, config);
      }
    }
  }
}

export default HookRunner;
