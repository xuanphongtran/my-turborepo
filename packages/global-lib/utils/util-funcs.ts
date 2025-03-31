export const formatQueryParams = (queryParams: ArticleQueryParams | ArticleDetailQueryParams): string => {
  const params: string[] = []

  for (const key in queryParams) {
    if (Object.prototype.hasOwnProperty.call(queryParams, key) && queryParams[key] !== undefined) {
      params.push(`${encodeURIComponent(key)}=${encodeURIComponent(queryParams[key])}`)
    }
  }

  return params.join('&')
}
