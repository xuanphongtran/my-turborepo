import Footer from '@components/Footer'
import Header from '@components/Header'
import menuServerApi from '@lib/api/server/menu.api'
import { useQueryParams } from 'middleware'

type Props = {
  children: React.ReactNode
  params: { locale: string }
}

const configKeys = [
  'txt_contact_us',
  'txt_login',
  'txt_search',
  'html_header_contact',
  'txt_connect_with_us',
  'txt_see_more',
  'html_footer_socials',
  'html_footer_get_in_touch',
  'html_footer_payment_protected',
  'html_footer_content',
  'txt_menu',
  'txt_my_account',
  'txt_logout',
  'txt_hi',
  'txt_apply_now',
  'txt_hello',
  'txt_guest',
  'txt_type_your_keywords',
  'txt_check_status',
  'txt_ads_code_step1'
] as const

export type ExtractedConfigDefaultLayoutDataType = Record<(typeof configKeys)[number], string>

export default async function CommonLayout({ children, params }: Props) {
  const [lang, location] = useQueryParams(params.locale)

  const [menuHeaderResponse, menuFooterResponse, configList] = await Promise.all([
    menuServerApi.getMenu('header', lang, location),
    menuServerApi.getMenu('footer', lang, location),
    commonServerApi.extractConfigData<ExtractedConfigDefaultLayoutDataType>(configKeys, lang, location)
  ])

  return (
    <>
      <Header menuHeaderData={menuHeaderResponse} configList={configList} />
      <main>{children}</main>
      <Footer menuFooterData={menuFooterResponse} configList={configList} />
    </>
  )
}
