'use client'

import '@/app/[locale]/(my-account)/_component/MenuAccount/styles.css'
import { COOKIES_KEY, PAGE_KEYWORD } from '@/constants/common'
import logOutClient from '@/lib/api/client/logOutClient.api'
import { useMounted } from '@/lib/hooks/useMounted'
import useChangeLoginRegister from '@/lib/store/clients/useChangeLoginRegister'
import { getAssetS3 } from '@/lib/utils/utilFuncs'
import classNames from 'classnames'
import { getCookie } from 'cookies-next'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import HeaderSearch from '../HeaderSearch'
import MenuItemMobile from '../MenuItemMobile'
import MenuSidebarAccountMobile from '../MenuSidebarAccountMobile'

const HeaderAvatar = dynamic(() => import('../HeaderAvatar'), { ssr: false })

type Props = {
  menuHeaderData: Array<Menu> | undefined
  configList: { [key: string]: string }
  isOpenMenu: boolean
  closeMenu: () => void
}

export default function DrawerMobile({ menuHeaderData, configList, isOpenMenu, closeMenu }: Props) {
  const pathName = usePathname()
  const [activeParentMenuId, setActiveParentMenuId] = useState(-1)
  const isClient = useMounted()
  const tokenUser = getCookie(COOKIES_KEY.USER_TOKEN) as string

  const { updateIsChangeLoginRegister } = useChangeLoginRegister()

  const handleLogOut = () => {
    logOutClient()
  }

  return (
    <div
      className={classNames('fixed bottom-0 top-0 z-50 w-full bg-white text-gray-1 shadow-1 duration-300 ease-in-out', {
        '-right-[110%]': !isOpenMenu,
        'right-0': isOpenMenu
      })}
    >
      <div className='relative flex h-28 items-start justify-between bg-dark-blue-1 px-4 pt-4'>
        <div className='flex items-center gap-3'>
          <HeaderAvatar configList={configList} />
          <div>
            {isClient && !tokenUser && (
              <Link
                href={`/${PAGE_KEYWORD.LOGIN}`}
                onClick={() => updateIsChangeLoginRegister('login')}
                target='_self'
                title={configList?.txt_login}
                className='border-l border-gray-10 pl-3 text-18 font-bold leading-[26px] text-white'
              >
                {configList?.txt_login}
              </Link>
            )}
          </div>
        </div>
        <div className='ml-4 h-9 w-9 flex-shrink-0' />
        <div className='absolute -bottom-8 left-0 z-20 w-full px-4'>
          <div className='rounded-xl bg-white p-2.5'>
            <HeaderSearch configList={configList} className='w-full' />
          </div>
        </div>
      </div>

      <div className='h-[calc(100%-112px)] overflow-auto bg-gray-8 px-4 pb-5 pt-[52px]'>
        <nav>
          {isClient && tokenUser && <MenuSidebarAccountMobile closeMenu={closeMenu} configList={configList} />}
          <span
            className='mb-2 inline-block text-18 font-bold text-gray-4'
            dangerouslySetInnerHTML={{ __html: configList?.txt_menu }}
          />
          <ul className='rounded-xl bg-white p-3'>
            {menuHeaderData?.map((menuParentItem) => {
              return (
                <MenuItemMobile
                  key={menuParentItem?.menu_id}
                  menuItem={menuParentItem}
                  isActiveParentMenu={activeParentMenuId === menuParentItem?.menu_id}
                  setActiveParentMenuId={(id) => {
                    if (id === activeParentMenuId) {
                      setActiveParentMenuId(-1)
                    } else {
                      setActiveParentMenuId(id)
                    }
                  }}
                  pathNamePart={pathName?.slice(1)}
                  closeMenu={closeMenu}
                  configList={configList}
                />
              )
            })}
          </ul>
        </nav>
        <Link
          href={`/${PAGE_KEYWORD.CHECK_STATUS}`}
          target='_self'
          className='block pt-5 text-primary underline hover:text-primary-2'
        >
          {configList?.txt_check_status}
        </Link>
        {isClient && tokenUser && (
          <div className='pt-5'>
            <div
              className='group flex cursor-pointer items-center justify-center rounded-xl border border-primary px-5 py-2.5 text-primary hover:bg-primary hover:text-white'
              onClick={() => handleLogOut()}
            >
              <Image
                src={getAssetS3('assets/icon-log-out.svg')}
                width={22}
                height={22}
                alt='Show/Hide'
                title='Show/Hide'
                loading='lazy'
                className='active-svg mr-2 h-[22px] w-[22px] group-hover:brightness-0 group-hover:invert-[1]'
              />
              <p className='text-16 font-medium leading-1-5'>{configList?.txt_logout}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
