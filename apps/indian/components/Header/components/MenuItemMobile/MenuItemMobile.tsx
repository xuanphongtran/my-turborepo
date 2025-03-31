'use client'

import ChevronDownIcon from '@/components/icons/ChevronDownIcon'
import ChevronNextIcon from '@/components/icons/ChevronNextIcon'
import { COOKIES_KEY, PAGE_KEYWORD } from '@/constants/common'
import logOutClient from '@/lib/api/client/logOutClient.api'
import { useMounted } from '@/lib/hooks/useMounted'
import { getAssetS3, getMenuPath } from '@/lib/utils/utilFuncs'
import classNames from 'classnames'
import { getCookie } from 'cookies-next'
import Image from 'next/image'
import Link from 'next/link'

type Props = {
  menuItem: Menu
  isActiveParentMenu: boolean
  setActiveParentMenuId: (id: number) => void
  pathNamePart: string
  closeMenu: () => void
  configList: { [key: string]: string }
}

export default function MenuItemMobile({
  menuItem,
  isActiveParentMenu,
  setActiveParentMenuId,
  pathNamePart,
  closeMenu,
  configList
}: Props) {
  const isClient = useMounted()
  const tokenUser = getCookie(COOKIES_KEY.USER_TOKEN) as string

  const handleLogOut = () => {
    logOutClient()
  }

  if (!menuItem?.children?.length) {
    return (
      <li>
        <Link
          onClick={() => {
            closeMenu()
          }}
          className={classNames(
            'flex w-full items-center justify-start gap-3 rounded-2xl p-3 text-16 leading-1-5 text-gray-1 hover:bg-primary-2/5',
            {
              'text-primary': pathNamePart === menuItem?.menu_element_keyword
            }
          )}
          href={getMenuPath(menuItem)}
          title={menuItem?.menu_name}
          target={menuItem?.menu_new_tab === 'Y' ? '_blank' : '_self'}
        >
          {menuItem?.menu_name}
        </Link>
      </li>
    )
  }

  return (
    <li className='group'>
      <div
        onClick={() => {
          setActiveParentMenuId(menuItem?.menu_id || -1)
        }}
        className='flex w-full items-center justify-start gap-3 rounded-2xl p-3 text-16 leading-1-5 text-gray-1 hover:bg-primary-2/5'
      >
        <span>{menuItem?.menu_name}</span>
        <span className='flex h-[22px] w-[22px] items-center justify-center'>
          <ChevronDownIcon
            size={22}
            className={classNames('fill-gray-1', {
              'rotate-180 fill-primary': isActiveParentMenu
            })}
          />
        </span>
      </div>
      <div
        className={classNames('absolute top-[112px] z-10 min-h-screen bg-gray-8 px-4 pt-[52px]', {
          hidden: !isActiveParentMenu,
          'right-0 block w-full': isActiveParentMenu
        })}
      >
        <div
          className='text-black mb-2 flex items-center gap-2 text-18 font-bold text-gray-1'
          onClick={() => {
            setActiveParentMenuId(-1)
          }}
        >
          <ChevronNextIcon size={22} className='rotate-180 fill-gray-1' />
          {menuItem.menu_name}
        </div>
        <ul className='rounded-xl bg-white p-3'>
          {menuItem?.children?.map((menuChildItem) => {
            return (
              <li key={menuChildItem?.menu_id}>
                <Link
                  onClick={() => {
                    closeMenu()
                  }}
                  className={classNames(
                    'hover:bg-primary-4 flex w-full items-center justify-start gap-3 rounded-xl p-3 text-16 leading-1-5 text-gray-1',
                    {
                      'bg-primary-4':
                        pathNamePart[pathNamePart?.length - 1] === menuChildItem?.menu_element_keyword_replace
                    }
                  )}
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
              className={`flex cursor-pointer items-center justify-center rounded-xl border border-primary px-5 py-2.5 text-primary hover:bg-primary hover:text-white`}
              onClick={() => handleLogOut()}
            >
              <Image
                src={getAssetS3('assets/icon-log-out.svg')}
                width={22}
                height={22}
                alt='Show/Hide'
                title='Show/Hide'
                loading='lazy'
                className='active-svg mr-2 h-[22px] w-[22px] fill-primary'
              />
              <p className='text-16 font-medium leading-1-5 text-primary'>Log Out</p>
            </div>
          </div>
        )}
      </div>
    </li>
  )
}
