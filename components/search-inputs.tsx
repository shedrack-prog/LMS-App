'use client';

import qs from 'query-string';

import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useEffect, useState } from 'react';
import { useDebounce } from '@/hooks/use-debounce';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export const SearchInput = () => {
  const [value, setValue] = useState('');
  const debounceValue = useDebounce(value);

  const searchParams = useSearchParams();
  const pathName = usePathname();
  const router = useRouter();

  const currentCategoryId = searchParams.get('categoryId');

  useEffect(() => {
    const url = qs.stringifyUrl(
      {
        url: pathName,
        query: {
          categoryId: currentCategoryId,
          title: debounceValue,
        },
      },
      { skipEmptyString: true, skipNull: true }
    );
    router.push(url);
  }, [debounceValue, router, pathName, currentCategoryId]);

  return (
    <div className="relative">
      <Search className="w-4 h-4 top-3 left-3 text-slate-600 absolute" />
      <Input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="w-full md:w-[300] pl-9 rounded-full text-slate-500 focus-visible:ring-slate-200"
        placeholder="Search for a course"
      />
    </div>
  );
};
