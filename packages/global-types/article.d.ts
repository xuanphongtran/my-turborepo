import { Banner } from './common'
export type Article = {
  ar_id: number
  ar_type: ArticleType
  ar_name: string
  ar_is_home: string
  ar_icon: string
  ar_sub_icon?: string
  ar_icon_active: string
  ar_thumbnail: string
  ar_keyword: string
  ar_title: string
  ar_meta_keyword: string
  ar_meta_description: string
  ar_meta_image: string
  ar_summary: string
  ar_content: string
  ar_insert_time: number
  ar_update_time: number
  banners: Array<Banner>
  ar_content_replace: string
  related: Array<Article>
  ar_sub_summary?: string
  faq_relate?: Article[]
  ar_author: string
}

export type ArticleType = {
  type_id: number
  type_parent: number
  type_name: string
  type_keyword: string
  type_title: string
  type_icon: string
  type_meta_keyword: string
  type_meta_description: string
  type_meta_image: string
  parent?: ArticleType | null
  children?: Array<ArticleType>
  article_list?: Array<Article>
}

export type ArticleQueryParams = {
  is_featured?: boolean
  page?: number
  per_page?: number
  order?: string
  is_home?: boolean
  token?: string
  limit_articles?: number
}

export type ArticleDetailQueryParams = {
  get_faq?: boolean
  limit_faq?: number
  get_related?: boolean
  limit_related?: number
  preview?: string
  token?: string
}

export type ArticleMetaType = {
  metaTitle: string
  metaDescription: string
  metaKeyword: string
  metaImage: string
}
