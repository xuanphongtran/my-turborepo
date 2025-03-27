import type { ApiResponse } from "@repo/global-types/api.d";
import {
  BASE_API_PUBLIC_KEY,
  BASE_API_URL,
  NEXT_PUBLIC_DEFAULT_LANG,
  NEXT_PUBLIC_DEFAULT_LOCATION,
  NEXT_PUBLIC_SITE_ID,
} from "../../constants/env";

export const useFetch = async <T>(
  endpoint: string,
  lang: string = NEXT_PUBLIC_DEFAULT_LANG,
  location: string = NEXT_PUBLIC_DEFAULT_LOCATION,
  method = "GET",
  data: Record<string, any> = {},
  cache: boolean = true,
  headerOptions: Record<string, any> = {},
  request: Record<string, any> = {},
  tagName: string = "all"
): Promise<
  | ApiResponse<T>
  | { success: boolean; data: null; pagination?: null; statusCode?: number }
> => {
  try {
    const isFormData = headerOptions["isForm"];

    // Create default headers with language and location
    const customHeaders: Record<string, string> = {
      Accept: "application/json",
      "language-code": lang,
      "location-code": location,
      "api-site-id": NEXT_PUBLIC_SITE_ID,
      ...headerOptions,
    };

    if (!isFormData) {
      customHeaders["Content-Type"] = "application/json";
    }

    // Add public key if available
    if (BASE_API_PUBLIC_KEY) {
      customHeaders["api-public-key"] = BASE_API_PUBLIC_KEY;
    }

    // Create request options
    const requestOptions: RequestInit & { body?: string | BodyInit | null } = {
      method: method,
      headers: customHeaders,
      ...request,
    };

    if (!cache) {
      requestOptions.cache = "no-store";
    } else {
      requestOptions.next = { tags: [tagName] };
    }

    if (method === "POST") {
      requestOptions.body = isFormData
        ? (data as BodyInit)
        : JSON.stringify(data);
    }

    // Construct the full URL
    const url = endpoint.startsWith("http")
      ? endpoint
      : `${BASE_API_URL}/${endpoint}`;

    // Perform the fetch request
    const response = await fetch(url, requestOptions);

    // Handle HTTP status
    if (response.status === 429) {
      return {
        success: false,
        data: null,
      };
    }

    const res = await response.json();

    res.statusCode = response.status;

    try {
      return res ? res : await response.json();
    } catch (error) {
      return res;
    }
  } catch (error) {
    return {
      success: false,
      data: null,
    };
  }
};
