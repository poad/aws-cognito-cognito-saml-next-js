import React from 'react';

import { signInWithRedirect } from 'aws-amplify/auth';

import { Button } from '@mui/material';
import appConfig from '../../app-config';
import crypto from 'crypto';

const AuthButton = (): JSX.Element => {
  const idpName = appConfig.federationTarget;

  const onClick = async (): Promise<void> => {
    const hash = crypto
      .createHash('sha1')
      .update(Buffer.from(new Date().getTime().toString()))
      .digest('hex');

    await signInWithRedirect({
      provider: {
        custom: idpName,
      },
      customState: hash
    });
  };

  return (
    <Button
      onClick={onClick}
      sx={{
        textTransform: 'none',
        bgcolor: '#ff8c00',
        color: '#fff',
        '&:hover': {
          backgroundColor: '#ffd700',
          color: '#2d2d2d',
        },
      }}
    >
      Sign in with {idpName}
    </Button>
  );
};

export default AuthButton;
