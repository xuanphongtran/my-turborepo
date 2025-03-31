'use client'
import { COOKIES_KEY } from '@/constants/common'
import { NEXT_PUBLIC_SITE_NAME } from '@/constants/configGlobal'
import useDataUser from '@/lib/store/clients/dataInfoUser'
import { useReverseModifyObject } from '@/lib/utils/cryptr'
import { getAssetS3 } from '@/lib/utils/utilFuncs'
import { getCookie } from 'cookies-next'
import Image from 'next/image'

type Props = {
  configList: { [key: string]: string }
}

export default function HeaderAvatar({ configList }: Props) {
  const tokenUser = getCookie(COOKIES_KEY.USER_TOKEN) as string

  const { userInfo } = useDataUser()

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const userInfoModify: any = useReverseModifyObject(userInfo, false)
  return (
    <>
      <Image
        src={getAssetS3('/assets/avatar.svg')}
        title={NEXT_PUBLIC_SITE_NAME}
        alt={NEXT_PUBLIC_SITE_NAME}
        width={48}
        height={48}
        className='h-12 w-12 lg:h-10 lg:w-10'
        priority={true}
      />
      <div className='text-18 leading-[26px] text-gray-7 lg:text-16 lg:leading-1-5 lg:text-gray-2'>
        {configList.txt_hello}:{' '}
        <span className='font-bold text-white lg:text-gray-1'>
          {tokenUser ? userInfoModify.user_name : configList?.txt_guest}
        </span>
      </div>
    </>
  )
}
