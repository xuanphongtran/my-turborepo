'use client'

import ChevronDownIcon from '@/components/icons/ChevronDownIcon'
import { dataMenuProfile } from '@/constants/listMenuAccount'
import logOutClient from '@/lib/api/client/logOutClient.api'
import useActiveLink from '@/lib/hooks/useActiveLink'
import { decodeHtmlEntities, getAssetS3 } from '@/lib/utils/utilFuncs'
import classNames from 'classnames'
import Image from 'next/image'
import Link from 'next/link'

type Props = {
  configList: { [key: string]: string }
}

export default function DropdownMyAccount({ configList }: Props) {
  const isActive = useActiveLink()

  const handleLogOut = () => {
    logOutClient()
  }

  return (
    <div className='group relative !z-[60]'>
      <div className='flex cursor-pointer items-center gap-2'>
        <ChevronDownIcon size={22} className='fill-gray-1 duration-300 group-hover:rotate-180' />
      </div>
      <div className='absolute !right-0 top-[calc(100%+10px)] block h-0 w-auto min-w-[298px] overflow-hidden rounded-2xl bg-white px-3 opacity-0 shadow-1 transition-all duration-300 group-hover:h-auto group-hover:overflow-visible group-hover:py-3 group-hover:opacity-100'>
        <ul>
          {dataMenuProfile?.map((item, index) => (
            <li key={item?.title}>
              <Link
                className={classNames(
                  'flex w-full items-center justify-start gap-3 rounded-2xl p-3 text-16 leading-1-5 text-gray-1 hover:bg-primary-2/5',
                  { 'text-primary': isActive === index }
                )}
                href={item?.link}
                title={item?.title}
                target='_self'
              >
                {item?.icon && (
                  <Image
                    src={item?.icon || ''}
                    width={24}
                    height={24}
                    alt={decodeHtmlEntities(item?.title)}
                    title={decodeHtmlEntities(item?.title)}
                    className={`${isActive === index && 'active-svg'}`}
                  />
                )}
                <span dangerouslySetInnerHTML={{ __html: item?.title ?? '' }} />
              </Link>
            </li>
          ))}
          <li
            onClick={() => handleLogOut()}
            className='flex w-full cursor-pointer items-center justify-start gap-3 rounded-2xl p-3 text-16 leading-1-5 text-gray-1 hover:bg-primary-2/5'
          >
            <Image
              src={getAssetS3('assets/icon-log-out.svg')}
              width={24}
              height={24}
              alt={configList?.txt_logout}
              title={configList?.txt_logout}
              loading='lazy'
            />
            <span>{configList?.txt_logout}</span>
          </li>
        </ul>
      </div>
    </div>
  )
}
