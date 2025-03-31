export const generateMetadata = async ({ params }: { params: { locale: string } }) => {
  const [lang, location] = useQueryParams(params.locale)

  const metaData = await commonService.generatePageMetaData(PAGE_KEYWORD.HOME, lang, location)

  if (!metaData) useNotFound()

  return metaData
}

const configPageKey = [
  'txt_check_to_prepare_your_india_trip',
  'txt_choose_your_nationality',
  'btn_check_requirement',
  'section_trust_cerf'
] as const

export type ExtractedConfigHomePageDataType = Record<(typeof configPageKey)[number], string>

export default async function IndexPage({ params }: { params: { locale: string } }) {
  const [lang, location, device] = useQueryParams(params.locale)

  const isMobile = device === 'mobile'

  const [contentPageResponse, listRequirements, listCheckRequirements, listNews, t] = await Promise.all([
    pageServerApi.getPage(PAGE_KEYWORD.HOME, lang, location),
    checkRequirementServerApi.getListRequirements(lang, location),
    checkRequirementServerApi.getListRequirements(lang, location, {
      page: 1,
      per_page: isMobile ? 2 : 3,
      order_by: ORDER_BY.INSERT_TIME,
      order: ORDER.DESC
    }),
    blogServerApi.getListBlogByTypeKeyword(ARTICLE_TYPE_KEYWORD.NEWS, lang, location, {
      page: 1,
      per_page: isMobile ? 2 : 3,
      order_by: BLOG_ORDER_BY.INSERT_TIME,
      order: ORDER.DESC
    }),
    commonServerApi.extractConfigData<ExtractedConfigHomePageDataType>(configPageKey, lang, location)
  ])

  if (!contentPageResponse) return

  const getClass = extractAllClassesFromHTML(`${contentPageResponse.page_content} ${t?.section_trust_cerf}`)

  const style = await useGetStyles(getClass, new Date().getMilliseconds().toString())

  return (
    <>
      <HTMLToReact
        html={contentPageResponse.page_content}
        components={[
          {
            tag: 'form-check-requirement',
            component: () => <FormCheckRequirement listRequirement={listRequirements?.data} t={t} />
          },
          {
            tag: 'trust-cerf',
            component: () => <HTMLToReact html={t?.section_trust_cerf} />
          },
          {
            tag: 'check-requirements-list',
            component: () => (
              <>
                {listCheckRequirements?.data?.map((article) => (
                  <ArticleCard
                    key={article.ar_id}
                    typeKeyword={ARTICLE_TYPE_KEYWORD.CHECK_REQUIREMENTS}
                    article={article}
                  />
                ))}
              </>
            )
          },
          {
            tag: 'news-list',
            component: () => (
              <>
                {listNews?.data?.map((blog) => (
                  <ArticleCard
                    key={blog.blog_id}
                    typeKeyword={ARTICLE_TYPE_KEYWORD.NEWS}
                    article={{
                      ar_keyword: blog.blog_keyword,
                      ar_name: blog.blog_name,
                      ar_thumbnail: blog.blog_thumbnail,
                      ar_icon: blog.blog_icon,
                      ar_summary: blog.blog_summary
                    }}
                  />
                ))}
              </>
            )
          }
        ]}
      />
      <StyleBuilder style={style} />
    </>
  )
}
