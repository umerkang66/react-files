'use client';

import { useSession } from 'next-auth/react';

function Profile() {
  const { data: session } = useSession();

  if (session?.user) {
    return <div>From Client: user is signed in</div>;
  }

  return <div>From client: user is NOT signed in</div>;
}

export default Profile;
