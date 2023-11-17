import React, { useEffect } from 'react';
import {
  fetchAuthSession,
  AuthUser,
  getCurrentUser,
  FetchUserAttributesOutput,
  fetchUserAttributes,
} from 'aws-amplify/auth';
import { AuthEventData } from '@aws-amplify/ui';
import { useAuthenticator } from '@aws-amplify/ui-react';

const useAuth = (): {
  user?: AuthUser;
  token?: string;
  attributes?: FetchUserAttributesOutput;
  signOut: (data?: AuthEventData | undefined) => void;
} => {
  const [user, setUser] = React.useState<AuthUser | undefined>();
  const [token, setToken] = React.useState<string | undefined>(undefined);
  const [attributes, setAttributes] = React.useState<
    FetchUserAttributesOutput | undefined
  >();
  const {
    signOut,
  } = useAuthenticator((context) => [
    context.signOut,
  ]);

  const handleAuth = async () => {
    try {
      const { idToken } = (await fetchAuthSession()).tokens ?? {};
      setToken(idToken?.toString());

      await getCurrentUser().then((currentUser) => {
        setUser(currentUser);
      });

      await fetchUserAttributes().then((attr) => {
        setAttributes(attr);
      });
    } catch (e) {
      setToken(undefined);
      setUser(undefined);
      setAttributes(undefined);
    }
  };

  useEffect(() => {
    handleAuth();
  }, []);

  return {
    user,
    token,
    attributes,
    signOut,
  };
};

export default useAuth;
