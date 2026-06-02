/**
 * Generic API client wrapping axios.
 * Provides: baseURL, auth headers, timeout, exponential-back-off retry,
 * and helper utilities for Promise.all / Promise.allSettled patterns.
 */

import axios, {
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosResponse,
} from 'axios'

// ------------------------------------------------------------------
// Config
// ------------------------------------------------------------------

const BASE_URL = import.meta.env['VITE_API_BASE_URL'] ?? '/api'
const DEFAULT_TIMEOUT_MS = 10_000
const MAX_RETRIES = 2

// ------------------------------------------------------------------
// Axios instance
// ------------------------------------------------------------------

export const apiClient: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: DEFAULT_TIMEOUT_MS,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
})

// ------------------------------------------------------------------
// Retry interceptor — exponential back-off on 5xx / network errors
// ------------------------------------------------------------------

apiClient.interceptors.response.use(
  (response) => response,
  async (error: unknown) => {
    const axiosError = error as {
      config?: AxiosRequestConfig & { _retryCount?: number }
      response?: AxiosResponse
    }

    const config = axiosError.config
    if (!config) return Promise.reject(error)

    config._retryCount = (config._retryCount ?? 0) + 1

    const isServerError =
      axiosError.response == null || axiosError.response.status >= 500

    if (isServerError && config._retryCount <= MAX_RETRIES) {
      // Exponential back-off: 400ms, 800ms
      const delay = 200 * Math.pow(2, config._retryCount)
      await new Promise((resolve) => setTimeout(resolve, delay))
      return apiClient(config)
    }

    return Promise.reject(error)
  },
)

// ------------------------------------------------------------------
// Typed request helper
// ------------------------------------------------------------------

export async function request<T>(config: AxiosRequestConfig): Promise<T> {
  const response = await apiClient<T>(config)
  return response.data
}

// ------------------------------------------------------------------
// Promise utilities
// ------------------------------------------------------------------

/**
 * Parallel fetch of multiple endpoints — all must succeed.
 * Use when every piece of data is required to render the page.
 */
export async function fetchAll<T extends readonly unknown[]>(
  promises: [...{ [K in keyof T]: Promise<T[K]> }],
): Promise<T> {
  return Promise.all(promises) as Promise<T>
}

/**
 * Parallel fetch where individual failures are tolerated.
 * Use for "nice-to-have" data like optional widgets or secondary panels.
 * Returns the raw PromiseSettledResult array so callers can inspect each outcome.
 */
export async function fetchAllSettled<T>(
  promises: Array<Promise<T>>,
): Promise<Array<PromiseSettledResult<T>>> {
  return Promise.allSettled(promises)
}
