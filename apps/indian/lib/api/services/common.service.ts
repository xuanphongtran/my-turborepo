import { useFetch, useGenerateMetadata } from '@lib/utils/util-funcs'

const commonService = {
  async generatePageMetaData(
    pageKeyword: string,
    lang: string,
    location: string,
    customPageKeyword?: string,
    params?: Record<string, string>
  ): Promise<object | boolean> {
    const searchParams = new URLSearchParams(params).toString()

    const response = await useFetch(`page/${pageKeyword}?${searchParams}`, lang, location)

    if (!response.success) return false

    return await useGenerateMetadata({
      current_url: customPageKeyword ? customPageKeyword : pageKeyword || '',
      page_meta_description: response?.data?.page_meta_description || '',
      page_meta_image: response?.data?.page_meta_image || '',
      page_meta_keyword: response?.data?.page_meta_keyword || '',
      title: response?.data?.page_title || '',
      page_name: response?.data?.page_name || '',
      lang: lang,
      location: location
    })
  },
  async generateArticleMetaData(
    pageKeyword: string,
    lang: string,
    location: string,
    customPageKeyword?: string,
    queryParams?: ArticleDetailQueryParams
  ): Promise<object | boolean> {
    const response = await useFetch(
      `article/get-article${queryParams ? '?' + formatQueryParams(queryParams) : ''}`,
      lang,
      location
    )

    if (!response.success) return false

    return await useGenerateMetadata({
      current_url: customPageKeyword ? customPageKeyword : pageKeyword || '',
      page_meta_description: response?.data?.ar_meta_description || '',
      page_meta_image: response?.data?.ar_meta_image || '',
      page_meta_keyword: response?.data?.ar_meta_keyword || '',
      title: response?.data?.ar_title || '',
      page_name: response?.data?.ar_name || '',
      lang: lang,
      location: location
    })
  },
  async generateTypeArticleMetaData(
    type: string,
    params: Record<string, string>,
    lang: string,
    location: string,
    customPageKeyword?: string
  ): Promise<object | boolean> {
    const searchParams = new URLSearchParams(params).toString()

    const response = await useFetch(`article/type/${type}?${searchParams}`, lang, location)

    if (!response.success) return false

    return await useGenerateMetadata({
      current_url: customPageKeyword ? `${customPageKeyword}/${type}` : type || '',
      page_meta_description: response?.data?.type_meta_description || '',
      page_meta_image: response?.data?.type_meta_image || '',
      page_meta_keyword: response?.data?.type_meta_keyword || '',
      title: response?.data?.type_title || '',
      page_name: response?.data?.type_name || '',
      lang: lang,
      location: location
    })
  },
  async generateCheckRequirementsMetaData(
    requirement: string,
    lang: string,
    location: string,
    customPageKeyword?: string,
    queryParams?: ArticleDetailQueryParams
  ): Promise<object | boolean> {
    const response = await useFetch(
      `check-requirements/${requirement}${queryParams ? '?' + formatQueryParams(queryParams) : ''}`,
      lang,
      location
    )

    if (!response.success) return false

    return await useGenerateMetadata({
      current_url: customPageKeyword ? customPageKeyword : requirement || '',
      page_meta_description: response?.data?.ar_meta_description || '',
      page_meta_image: response?.data?.ar_meta_image || '',
      page_meta_keyword: response?.data?.ar_meta_keyword || '',
      title: response?.data?.ar_title || '',
      page_name: response?.data?.ar_name || '',
      lang: lang,
      location: location
    })
  },
  async generateBlogMetaData(
    blogKeyword: string,
    lang: string,
    location: string,
    customKeyword?: string
  ): Promise<object | boolean> {
    const response = await useFetch(`blog/blog-detail/${blogKeyword}`, lang, location)

    if (!response.success) return false

    return await useGenerateMetadata({
      current_url: customKeyword ? customKeyword : blogKeyword || '',
      page_meta_description: response?.data?.blog_meta_description || '',
      page_meta_image: response?.data?.blog_meta_image || '',
      page_meta_keyword: response?.data?.blog_meta_keyword || '',
      title: response?.data?.blog_title || '',
      page_name: response?.data?.blog_name || '',
      lang: lang,
      location: location
    })
  },
  async generateBlogTypeMetaData(
    typeKeyword: string,
    lang: string,
    location: string,
    customKeyword?: string
  ): Promise<object | boolean> {
    const response = await useFetch(`blog/type/${typeKeyword}`, lang, location)

    if (!response.success) return false

    return await useGenerateMetadata({
      current_url: customKeyword ? customKeyword : typeKeyword || '',
      page_meta_description: response?.data?.type_meta_description || '',
      page_meta_image: response?.data?.type_meta_image || '',
      page_meta_keyword: response?.data?.type_meta_keyword || '',
      title: response?.data?.type_title || '',
      page_name: response?.data?.type_name || '',
      lang: lang,
      location: location
    })
  },
  async generateFaqMetaData(
    faqKeyword: string,
    lang: string,
    location: string,
    customKeyword?: string
  ): Promise<object | boolean> {
    const response = await useFetch(`faq/faq-detail/${faqKeyword}`, lang, location)

    if (!response.success) return false

    return await useGenerateMetadata({
      current_url: customKeyword ? customKeyword : faqKeyword || '',
      page_meta_description: response?.data?.faq_meta_description || '',
      page_meta_image: response?.data?.faq_meta_image || '',
      page_meta_keyword: response?.data?.faq_meta_keyword || '',
      title: response?.data?.faq_title || '',
      page_name: response?.data?.faq_name || '',
      lang: lang,
      location: location
    })
  },
  async generateFaqTypeMetaData(
    typeKeyword: string,
    lang: string,
    location: string,
    customKeyword?: string
  ): Promise<object | boolean> {
    const response = await useFetch(`faq/type/${typeKeyword}`, lang, location)

    if (!response.success) return false

    return await useGenerateMetadata({
      current_url: customKeyword ? customKeyword : typeKeyword || '',
      page_meta_description: response?.data?.type_meta_description || '',
      page_meta_image: response?.data?.type_meta_image || '',
      page_meta_keyword: response?.data?.type_meta_keyword || '',
      title: response?.data?.type_title || '',
      page_name: response?.data?.type_name || '',
      lang: lang,
      location: location
    })
  }
}

export default commonService
