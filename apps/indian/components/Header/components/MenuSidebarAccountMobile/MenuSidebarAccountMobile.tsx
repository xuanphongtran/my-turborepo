'use client'

import { dataMenuProfile } from '@/constants/listMenuAccount'
import useActiveLink from '@/lib/hooks/useActiveLink'
import { decodeHtmlEntities } from '@/lib/utils/utilFuncs'
import classNames from 'classnames'
import Image from 'next/image'
import Link from 'next/link'

type Props = {
  closeMenu: () => void
  configList: { [key: string]: string }
}

export default function MenuSidebarAccountMobile({ closeMenu, configList }: Props) {
  const isActive = useActiveLink()

  return (
    <div className='mb-5'>
      <span
        className='mb-2 inline-block text-18 font-bold text-gray-4'
        dangerouslySetInnerHTML={{ __html: configList?.txt_my_account }}
      />
      <div className='rounded-xl bg-white p-3'>
        <ul>
          {dataMenuProfile?.map((item, index) => {
            return (
              <li key={item?.title}>
                <Link
                  onClick={() => {
                    closeMenu()
                  }}
                  className={classNames(
                    'flex w-full items-center justify-start gap-3 rounded-2xl p-3 text-16 leading-1-5 text-gray-1 hover:bg-primary-2/5',
                    { 'text-primary': isActive === index }
                  )}
                  href={`${item?.link}`}
                  title={`${item?.title}`}
                  target={'_self'}
                >
                  {item?.icon && (
                    <Image
                      src={item?.icon || ''}
                      width={22}
                      height={22}
                      alt={decodeHtmlEntities(item?.title)}
                      title={decodeHtmlEntities(item?.title)}
                      className={`${isActive === index && 'active-svg'}`}
                    />
                  )}
                  <span dangerouslySetInnerHTML={{ __html: item?.title ?? '' }} />
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}
