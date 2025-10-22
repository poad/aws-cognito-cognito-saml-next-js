'use client';

import { JSX } from 'react';
import { Button, View } from '@aws-amplify/ui-react';
import AuthButton from '../features/auth/components/AuthButton';
import useAuth from '../features/auth/hooks/useAuth';
import { StorageBrowser } from '../features/storage-browser/components/StorageBrowser';

function Home(): JSX.Element {
  const auth = useAuth();

  return auth?.token ? (
    auth?.user ? (
      <>
        <View width='20rem' marginTop="3rem">
          <Button onClick={auth.signOut}>Sign Out</Button>
          <StorageBrowser />
        </View>
        <View color='#2d2d2d' whiteSpace='pre-wrap'>
          {auth.attributes?.name}
        </View>
        <View color='#2d2d2d' whiteSpace='pre-wrap'>
          {auth.attributes?.email}
        </View>
      </>
    ) : (
      <></>
    )
  ) : (
    <>
      <View width='20rem' marginTop="3rem">
        <AuthButton />
      </View>
    </>
  );
}

export default Home;
