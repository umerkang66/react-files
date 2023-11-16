import { useSession } from 'next-auth/react';

export function useUser() {
  const { data, status } = useSession();
  return { user: data?.user, status };
}
