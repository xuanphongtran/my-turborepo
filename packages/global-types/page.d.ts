import { Banner } from './common'

export type PageData = {
  page_id: number
  page_name: string
  page_title: string
  page_keyword: string
  page_meta_keyword: string
  page_meta_description: string
  page_meta_image: string
  page_content: string
  page_content_replace: string | Record<string, unknown>
  page_content_mobile: string
  banners: Banner[]
  page_location_country_code: string
  page_url_available: string
}
