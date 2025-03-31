import type { ApiResponse } from '@repo/global-types/api.d'
import {
  BASE_API_PUBLIC_KEY,
  BASE_API_URL,
  NEXT_PUBLIC_DEFAULT_LANG,
  NEXT_PUBLIC_DEFAULT_LOCATION,
  NEXT_PUBLIC_SITE_ID
} from '../../constants/env'

export const useFetch = async (
  endpoint: string,
  lang: string,
  location: string,
  method = 'GET',
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: Record<string, any> = {},
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  headerOptions: Record<string, any> = {},
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  request: Record<string, any> = {},
  cache: boolean = true
) => {
  try {
    // Create default headers with language and location
    const customHeaders: Record<string, string> = {
      Accept: 'application/json',
      'language-code': lang || NEXT_PUBLIC_DEFAULT_LANG,
      'location-code': location || NEXT_PUBLIC_DEFAULT_LOCATION,
      ...headerOptions
    }

    const isFormData = headerOptions['isForm']

    if (!isFormData) {
      customHeaders['Content-Type'] = 'application/json'
    }

    // Add public key if available
    if (BASE_API_PUBLIC_KEY) {
      customHeaders['api-public-key'] = BASE_API_PUBLIC_KEY
    }

    if (NEXT_PUBLIC_SITE_ID) {
      customHeaders['api-site-id'] = NEXT_PUBLIC_SITE_ID
    }

    // Create request options
    const requestOptions: RequestInit & { body?: string | BodyInit } = {
      method: method,
      headers: customHeaders,
      next: { tags: ['all'] },
      ...request
    }

    if (!cache) delete requestOptions.next

    if (method === 'POST') {
      requestOptions.body = isFormData ? (data as BodyInit) : JSON.stringify(data)
    }

    // Perform the fetch request
    const url = endpoint.startsWith('http') ? endpoint : `${BASE_API_URL}/${endpoint}`
    const response = await fetch(url, requestOptions)

    // Handle HTTP status
    if (response.ok) {
      return await response.json()
    }
    if (response.status === 429) {
      throw new Error('Rate limit exceeded')
    }
    return await response.json()
  } catch (error) {
    return {
      success: false,
      data: null
    }
  }
}
