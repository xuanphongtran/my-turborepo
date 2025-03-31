'use client'

import { COOKIES_KEY, PAGE_KEYWORD } from '@/constants/common'
import { NEXT_PUBLIC_SITE_NAME } from '@/constants/configGlobal'
import { useDisplay } from '@/lib/hooks/useDisplay'
import { useHideHeaderFooter } from '@/lib/hooks/useHideHeaderFooter'
import useDataUser from '@/lib/store/clients/dataInfoUser'
import useApplyVisaStore from '@/lib/store/clients/order'
import { useReverseModifyObject } from '@/lib/utils/cryptr'
import { getAssetS3, getClientIp, getGaClientId, getMenuPath } from '@/lib/utils/utilFuncs'
import classNames from 'classnames'
import { getCookie } from 'cookies-next'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import ArrowIcon from '../icons/ArrowIcon'
import Livechat from '../Livechat/Livechat'
import './footer-style.css'
import ReservePlaceFooter from './ReservePlaceFooter'

type Props = {
  menuFooterData: Array<Menu> | undefined
  configList: { [key: string]: string }
}

export default function Footer({ menuFooterData, configList }: Props) {
  const isMobile = useDisplay(1024)
  const isHideHeaderFooter = useHideHeaderFooter()
  const [activeMenuId, setActiveMenuId] = useState(-1)
  const { userInfo } = useDataUser()
  const { getDataApplyVisaStep1 } = useApplyVisaStore()
  const { applyVisaStep1Store } = getDataApplyVisaStep1()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const userInfoModify: any = userInfo && useReverseModifyObject(userInfo, false)
  const currentPage = usePathname()
  const searchParams = useSearchParams()

  const handleChangeActiveMenu = (menuId: number) => {
    if (activeMenuId == menuId) {
      setActiveMenuId(-1)
    } else {
      setActiveMenuId(menuId)
    }
  }

  useEffect(() => {
    let pushDataLayer = true
    const controller = currentPage.split('/')[1]
    const action = searchParams.get('action')
    const applyStep1 = controller === 'apply-visa' && action == 'step1'
    const applyStep2 = controller === 'apply-visa' && action == 'step2'
    const applyStepConfirm = controller === 'apply-visa' && action == 'step4Confirm'

    const paymentPage = controller === 'make-payment'
    const paymentConfirm = controller === 'make-payment' && action == 'paymentConfirm'
    const homePage = controller == ''

    const dataLayerObj = {
      client_id: getGaClientId(),
      dynx_userIp: getClientIp(),
      dynx_userID: userInfoModify?.user_id ?? '',
      dynx_userEmail: userInfoModify?.user_email ?? applyVisaStep1Store?.user_email ?? '',
      dynx_userCountry: userInfoModify?.user_country_id ?? '',
      dynx_location: getCookie(COOKIES_KEY.COUNTRY)?.toUpperCase(),
      dynx_pagetype: homePage ? 'index' : controller + (applyStep1 ? '-step1' : ''),
      dynx_orderID: '',
      dynx_faqId: '',
      dynx_transactionId: '',
      dynx_numberOfVisa: '',
      dynx_typeOfVisa: '',
      dynx_processingTime: '',
      dynx_totalvalue: '',
      dynx_servicevalue: '',
      dynx_govvalue: '',
      dynx_paymentMethod: '',
      dynx_currency: '',
      dynx_paymentNote: '',
      dynx_platform: window.innerWidth < 768 ? 'mobile' : 'desktop',
      'Ads-event': paymentPage ? 'Make-Payment' : applyStep1 ? 'Step-1' : 'Info',
      'Ads-code': applyStep1 ? configList?.txt_ads_code_step1 : 'Info'
    }
    if (paymentConfirm || applyStep1 || applyStep2 || applyStepConfirm) {
      pushDataLayer = false
    }
    if (pushDataLayer) {
      window.dataLayer.push(dataLayerObj)
    }
  }, [currentPage])

  return (
    <>
      {!isHideHeaderFooter && (
        <>
          <footer className='bg-dark-blue-1 text-white'>
            <div className='container pb-5 pt-10 lg:pt-[60px]'>
              <div className='flex flex-col justify-between gap-y-10 lg:flex-row lg:gap-x-[60px]'>
                <div className='shrink-0'>
                  <div className='flex'>
                    <Link href='/' target='_self' title={NEXT_PUBLIC_SITE_NAME}>
                      <Image
                        src={getAssetS3('/assets/logo-white.svg')}
                        title={NEXT_PUBLIC_SITE_NAME}
                        alt={NEXT_PUBLIC_SITE_NAME}
                        width={230}
                        height={38}
                        priority={true}
                        className='inline-block h-[38px] w-auto'
                      />
                    </Link>
                  </div>
                  <div className='mt-10 lg:mt-[50px]'>
                    <h2
                      className='text-20 font-bold leading-1-4'
                      dangerouslySetInnerHTML={{ __html: configList?.txt_connect_with_us }}
                    />
                    <div
                      className='mt-5 grid w-fit grid-cols-6 gap-[15px] lg:mt-6 lg:grid-cols-3 lg:gap-x-6 lg:gap-y-4'
                      dangerouslySetInnerHTML={{ __html: configList?.html_footer_socials }}
                    />
                  </div>
                </div>
                <div className='flex flex-col justify-between gap-y-0 lg:flex-row lg:gap-x-[60px]'>
                  {menuFooterData?.length &&
                    menuFooterData?.map((menuParentItem) => {
                      return (
                        <div
                          key={menuParentItem?.menu_id}
                          className='border-b border-white/10 py-4 lg:border-none lg:py-0'
                        >
                          <h2
                            className='flex items-center justify-between text-20 font-bold leading-1-4 lg:mb-6'
                            onClick={() => {
                              handleChangeActiveMenu(menuParentItem?.menu_id)
                            }}
                          >
                            {menuParentItem?.menu_name}
                            {isMobile && (
                              <div
                                className={classNames('toggle-icon shrink-0', {
                                  open: activeMenuId == menuParentItem.menu_id && isMobile
                                })}
                              >
                                <span></span>
                                <span></span>
                              </div>
                            )}
                          </h2>
                          <div
                            className={classNames('grid overflow-hidden', {
                              'grid-rows-[0fr]': activeMenuId !== menuParentItem.menu_id && isMobile,
                              'grid-rows-[1fr]': activeMenuId == menuParentItem.menu_id && isMobile
                            })}
                          >
                            <ul
                              className={classNames('min-h-0 space-y-4 overflow-hidden text-16 text-gray-7', {
                                'mt-0': activeMenuId !== menuParentItem.menu_id && isMobile,
                                'mt-5': activeMenuId == menuParentItem.menu_id && isMobile
                              })}
                            >
                              {menuParentItem?.children.length &&
                                menuParentItem?.children?.map((menuChildItem) => {
                                  return (
                                    <li key={menuChildItem?.menu_id}>
                                      <Link
                                        href={getMenuPath(menuChildItem as never)}
                                        title={menuChildItem?.menu_name}
                                        className='block hover:text-primary'
                                        target={menuChildItem?.menu_new_tab === 'Y' ? '_blank' : '_self'}
                                      >
                                        {menuChildItem?.menu_name}
                                      </Link>
                                    </li>
                                  )
                                })}
                            </ul>
                          </div>
                        </div>
                      )
                    })}
                </div>
                <div className='shrink-0'>
                  <h2
                    className='text-20 font-bold leading-1-4'
                    dangerouslySetInnerHTML={{ __html: configList?.txt_contact_us }}
                  />
                  <div
                    className='mt-5 text-gray-7 lg:mt-6'
                    dangerouslySetInnerHTML={{ __html: configList?.html_footer_get_in_touch }}
                  />
                  <div className='mt-5 lg:mt-6'>
                    <Link
                      href={`/${PAGE_KEYWORD.CONTACT_US}`}
                      title={configList?.txt_see_more}
                      target='_self'
                      className='group flex items-center gap-2 font-medium hover:text-primary'
                    >
                      <span dangerouslySetInnerHTML={{ __html: configList?.txt_see_more }} />
                      <ArrowIcon size={22} className='fill-white group-hover:fill-primary' />
                    </Link>
                  </div>
                </div>
              </div>
              <div
                className='mt-10 flex flex-wrap justify-start gap-[7px] lg:mt-[50px] lg:justify-center lg:gap-4'
                dangerouslySetInnerHTML={{ __html: configList?.html_footer_payment_protected }}
              />
            </div>
            <hr className='border-white/10' />
            <div
              className='container py-5 text-center text-14 leading-[20px] [&>*]:text-gray-7'
              dangerouslySetInnerHTML={{ __html: configList?.html_footer_content }}
            />
            <ReservePlaceFooter />
          </footer>
          <Livechat configList={configList} />
        </>
      )}
    </>
  )
}
