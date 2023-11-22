import { Button } from '@nextui-org/react';
import * as actions from '@/actions';
import { auth } from '@/auth';
import Profile from '@/components/profile';

async function Home() {
  const session = await auth();

  return (
    <div>
      <form action={actions.signIn}>
        <Button type="submit">Sign In</Button>
      </form>

      <form action={actions.signOut}>
        <Button type="submit">Sign Out</Button>
      </form>

      {session?.user ? (
        <pre>{JSON.stringify(session.user, null, 2)}</pre>
      ) : (
        <div>Signed Out</div>
      )}

      <Profile />
    </div>
  );
}

export default Home;
