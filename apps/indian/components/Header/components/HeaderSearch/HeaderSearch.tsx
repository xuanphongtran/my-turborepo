'use client'

import CloseIcon from '@/components/icons/CloseIcon'
import SearchIcon from '@/components/icons/SearchIcon'
import { PAGE_KEYWORD } from '@/constants/common'
import { useSearchParams } from 'next/navigation'
import { useEffect, type HTMLAttributes } from 'react'
import { useForm } from 'react-hook-form'

type Props = {
  configList: { [key: string]: string }
} & HTMLAttributes<HTMLFormElement>

export default function HeaderSearch({ configList, ...props }: Props) {
  const searchParams = useSearchParams()

  const { register, handleSubmit, setValue, watch, reset } = useForm<{ q: string }>({
    defaultValues: {
      q: ''
    }
  })

  const searchValue = watch('q')

  const onSubmitSearch = handleSubmit((data: { q: string }) => {
    const searchValue = data.q.trim()
    if (!searchValue || searchParams.get('q') === searchValue) return

    const currentSearchParams = new URLSearchParams()
    currentSearchParams.append('q', searchValue)

    window.location.href = '/' + PAGE_KEYWORD.SEARCH + '?' + currentSearchParams.toString()
  })

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const searchQuery = params.get('q') ?? ''
    setValue('q', searchQuery)
  }, [setValue])

  return (
    <form onSubmit={onSubmitSearch} {...props} className={`relative ${props.className ? props.className : null}`}>
      <SearchIcon size={20} className='absolute left-3 top-2.5 flex h-6 w-6 fill-gray-3' />

      <input
        className='h-11 w-full rounded-xl bg-gray-8 pl-10 pr-28 text-16 leading-1-5 text-gray-1 placeholder:text-16 placeholder:leading-1-5 placeholder:text-gray-5 focus:outline-primary lg:w-[440px]'
        placeholder={configList?.txt_type_your_keywords}
        type='text'
        {...register('q')}
        maxLength={255}
      />

      <div
        className={`${searchValue ? 'block' : 'hidden'} absolute right-20 top-1/2 flex h-12 w-12 -translate-y-2/4 cursor-pointer items-center justify-center`}
        onClick={() => reset()}
      >
        <CloseIcon />
      </div>

      <button
        type='submit'
        aria-label='search'
        className='group absolute right-1 top-1 h-9 items-center justify-center rounded-[10px] border border-primary-2 px-4 font-medium text-primary hover:bg-primary-2 hover:text-white'
      >
        {configList?.txt_search}
      </button>
    </form>
  )
}
