'use client'

import ChevronDownIcon from '@/components/icons/ChevronDownIcon'
import { COOKIES_KEY, PAGE_KEYWORD } from '@/constants/common'
import { NEXT_PUBLIC_SITE_NAME } from '@/constants/configGlobal'
import { getUserApi } from '@/lib/api/client/getUserClient.api'
import { useMounted } from '@/lib/hooks/useMounted'
import useDataUser from '@/lib/store/clients/dataInfoUser'
import useChangeLoginRegister from '@/lib/store/clients/useChangeLoginRegister'
import { getAssetS3, getMenuPath } from '@/lib/utils/utilFuncs'
import { deleteCookie, getCookie } from 'cookies-next'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect } from 'react'
import DropdownMyAccount from '../DropdownMyAccount'
import HeaderSearch from '../HeaderSearch'

const HeaderAvatar = dynamic(() => import('../HeaderAvatar'), { ssr: false })

type Props = {
  menuHeaderData: Array<Menu> | undefined
  configList: { [key: string]: string }
}

export default function HeaderDesktop({ menuHeaderData, configList }: Props) {
  const tokenUser = getCookie(COOKIES_KEY.USER_TOKEN) as string

  const isClient = useMounted()

  const { updateIsChangeLoginRegister } = useChangeLoginRegister()

  const { updateUser } = useDataUser()

  useEffect(() => {
    const handleGetUser = async () => {
      const userData = await getUserApi(tokenUser)

      if (!userData?.success) {
        deleteCookie(COOKIES_KEY.USER_TOKEN)
        updateUser(undefined)
      }
    }

    handleGetUser()
  }, [])

  return (
    <>
      <div className='border-b border-gray-6'>
        <div className='container flex h-20 items-center justify-between'>
          <div className='flex items-center gap-[88px]'>
            <Link href='/' target='_self' title={NEXT_PUBLIC_SITE_NAME}>
              <Image
                src={getAssetS3('/assets/logo.svg')}
                title={NEXT_PUBLIC_SITE_NAME}
                alt={NEXT_PUBLIC_SITE_NAME}
                width={322}
                height={55}
                priority={true}
                className='h-[55px] w-auto'
              />
            </Link>
            <HeaderSearch configList={configList} />
          </div>
          <div className='flex items-center gap-3'>
            <HeaderAvatar configList={configList} />
            {isClient && tokenUser ? (
              <DropdownMyAccount configList={configList} />
            ) : (
              <Link
                href={`/${PAGE_KEYWORD.LOGIN}`}
                onClick={() => updateIsChangeLoginRegister('login')}
                target='_self'
                title={configList?.txt_login}
                className='border-l border-gray-4 pl-3 font-bold text-primary hover:text-primary-2'
              >
                {configList?.txt_login}
              </Link>
            )}
          </div>
        </div>
      </div>
      <header className='sticky top-0 z-40 hidden bg-dark-blue-1 shadow-1 lg:block'>
        <div className='container flex h-full items-center justify-between gap-5 py-2'>
          <nav>
            <ul className='flex flex-wrap items-center justify-start'>
              {menuHeaderData?.map((menuParentItem) => {
                return menuParentItem?.children?.length ? (
                  <li key={menuParentItem?.menu_id} className='group relative text-white'>
                    {menuParentItem?.menu_element_keyword ? (
                      <Link
                        className='flex items-center gap-2 rounded-[20px] px-6 py-2 group-hover:bg-white/10'
                        href={`/${menuParentItem?.menu_element_keyword ?? '#'}`}
                        title={menuParentItem?.menu_name}
                        target={menuParentItem?.menu_new_tab === 'Y' ? '_blank' : '_self'}
                      >
                        <span>{menuParentItem?.menu_name}</span>
                        <ChevronDownIcon
                          size={22}
                          className=' fill-white duration-300 group-hover:block group-hover:rotate-180'
                        />
                      </Link>
                    ) : (
                      <div
                        className='flex items-center gap-2 rounded-[20px] px-6 py-2 group-hover:bg-white/10'
                        title={menuParentItem?.menu_name}
                      >
                        <span>{menuParentItem?.menu_name}</span>
                        <ChevronDownIcon
                          size={22}
                          className='fill-white duration-300 group-hover:block group-hover:rotate-180'
                        />
                      </div>
                    )}
                    <div className='nav-dropdown'>
                      <ul>
                        {menuParentItem?.children?.map((menuChildItem) => {
                          return (
                            <li key={menuChildItem?.menu_id}>
                              <Link
                                className='flex w-full items-center justify-start rounded-xl p-3 text-gray-1 hover:bg-blue-2/5'
                                href={getMenuPath(menuChildItem)}
                                title={menuChildItem?.menu_name}
                                target={menuChildItem?.menu_new_tab === 'Y' ? '_blank' : '_self'}
                              >
                                <span dangerouslySetInnerHTML={{ __html: menuChildItem?.menu_name ?? '' }} />
                              </Link>
                            </li>
                          )
                        })}
                      </ul>
                    </div>
                  </li>
                ) : (
                  <li key={menuParentItem?.menu_id} className='group text-white'>
                    <Link
                      href={getMenuPath(menuParentItem)}
                      className='flex rounded-[20px] px-6 py-2 group-hover:bg-white/10'
                      title={menuParentItem?.menu_name}
                      target={menuParentItem?.menu_new_tab === 'Y' ? '_blank' : '_self'}
                    >
                      {menuParentItem?.menu_name}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </nav>
          <div className='flex-shrink-0'>
            <Link
              href={`/${PAGE_KEYWORD?.APPLY_VISA}?action=step1`}
              title={configList?.txt_apply_now}
              target='_self'
              className='btn-secondary !min-w-[120px] !font-bold lg:h-10 lg:text-16'
            >
              {configList?.txt_apply_now}
            </Link>
          </div>
        </div>
      </header>
    </>
  )
}
