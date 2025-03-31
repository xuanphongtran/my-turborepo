'use client'

import { useDisplay } from '@/lib/hooks/useDisplay'
import HeaderDesktop from './components/HeaderDesktop'
import HeaderMobile from './components/HeaderMobile'

type Props = {
  menuHeaderData: Array<Menu> | undefined
  configList: { [key: string]: string }
}

export default function Header({ menuHeaderData, configList }: Props) {
  const isMobile = useDisplay(1024)

  return isMobile ? (
    <HeaderMobile menuHeaderData={menuHeaderData} configList={configList} />
  ) : (
    <HeaderDesktop menuHeaderData={menuHeaderData} configList={configList} />
  )
}
