export type Banner = {
  banner_id: number
  banner_title: string
  banner_subtitle: string
  banner_content: string
  banner_link: string
  banner_image: string
  banner_image_mobile: string
  banner_start_time: number
  banner_end_time: number
  banner_link_replace: string
  banner_content_replace: string
  banner_sub_image: string
}

export interface MetadataParams {
  title: string
  page_meta_description: string
  page_meta_keyword: string
  page_meta_image: string
  current_url: string
  locale?: string
  lang: string
  location: string
  page_name: string
}
