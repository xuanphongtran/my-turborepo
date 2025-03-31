'use client'

import { PAGE_KEYWORD } from '@/constants/common'
import classNames from 'classnames'
import { usePathname } from 'next/navigation'

/**
 * This component render Reserve a Place for PaymentDetails in mobile
 *
 * @return {JSX.Element} The rendered ReservePlaceFooter component.
 */
export default function ReservePlaceFooter() {
  const pathName = usePathname()

  return (
    <div
      className={classNames('hidden', {
        'max-lg:!block max-lg:!pt-[110px]': pathName.split('/').includes(PAGE_KEYWORD.MAKE_PAYMENT)
      })}
    />
  )
}
