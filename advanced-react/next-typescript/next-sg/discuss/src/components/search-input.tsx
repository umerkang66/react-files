'use client';

import { Input } from '@nextui-org/react';
import { useSearchParams } from 'next/navigation';
import * as actions from '@/actions';

function SearchInput() {
  const searchParams = useSearchParams();

  return (
    <form action={actions.search}>
      <Input defaultValue={searchParams.get('term') ?? ''} name="term" />
    </form>
  );
}

export default SearchInput;
