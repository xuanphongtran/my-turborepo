'use client'

import { PAGE_KEYWORD } from '@/constants/common'
import { NEXT_PUBLIC_SITE_NAME } from '@/constants/configGlobal'
import { getAssetS3 } from '@/lib/utils/utilFuncs'
import classNames from 'classnames'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import DrawerMobile from '../DrawerMobile'
import './styles.css'

type Props = {
  menuHeaderData: Array<Menu> | undefined
  configList: { [key: string]: string }
}

export default function HeaderMobile({ menuHeaderData, configList }: Props) {
  const [isOpenMenu, setIsOpenMenu] = useState(false)

  const handleOpenMenu = () => {
    setIsOpenMenu(!isOpenMenu)
  }

  return (
    <header className='sticky top-0 z-50 block bg-white shadow-2 lg:hidden'>
      <div className='container flex'>
        <div className='flex h-16 w-full items-center justify-between'>
          <Link href='/' target='_self' title={NEXT_PUBLIC_SITE_NAME}>
            <Image
              src={getAssetS3('/assets/logo.svg')}
              title={NEXT_PUBLIC_SITE_NAME}
              alt={NEXT_PUBLIC_SITE_NAME}
              width={158}
              height={26}
              priority={true}
              className='h-[26px] w-auto'
            />
          </Link>
          <div className='flex items-center gap-3'>
            <Link
              href={`/${PAGE_KEYWORD.APPLY_VISA}?action=step1`}
              title={configList?.txt_apply_now}
              target='_self'
              className='btn-secondary !min-w-[92px] !px-3 !text-14 !font-bold !leading-[20px] max-md:!h-9'
            >
              {configList?.txt_apply_now}
            </Link>
            <div className='h-9 w-9 flex-shrink-0'></div>
          </div>

          <button
            onClick={handleOpenMenu}
            aria-label='Touch menu'
            className={classNames('fixed right-4 top-[14px] z-[100] flex h-9 w-9 items-center justify-center', {
              'top-[22px]': isOpenMenu
            })}
          >
            <div
              className={classNames('hamburger-icon', {
                open: isOpenMenu
              })}
            >
              <span></span>
              <span></span>
              <span></span>
            </div>
          </button>
        </div>
      </div>

      <DrawerMobile
        menuHeaderData={menuHeaderData}
        configList={configList}
        isOpenMenu={isOpenMenu}
        closeMenu={() => {
          setIsOpenMenu(false)
        }}
      />
    </header>
  )
}
