'use client';
import {useDebouncedCallback} from 'use-debounce'

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';

export default function Search({ placeholder }: { placeholder: string }) {
  const searchParams = useSearchParams(); // 返回一个只读的 params 对象
  const pathname = usePathname(); // /dashboard/invoices
  const {replace} = useRouter();

  const handleSearch = useDebouncedCallback((term) => {
    // 用 URLSearchParams 来生成格式话的params字符串
    // searchParams 是用 useSearchParams 生成的一个对象, 包含已有的params
    const params = new URLSearchParams(searchParams);
    params.set('page', '1');
    // params = ?query=3
    if (term) {
      params.set('query', term)
    } else {
      params.delete('query')
    }
    replace(`${pathname}?${params.toString()}`)
  }, 300)

  return (
    <div className="relative flex flex-1 flex-shrink-0">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input
        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
        placeholder={placeholder}
        onChange={(e) => { handleSearch(e.target.value)}}
        defaultValue={searchParams.get('query')?.toString()}
      />
      <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
    </div>
  );
}
