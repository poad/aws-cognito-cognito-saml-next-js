import { ResourcesConfig } from '@aws-amplify/core';

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
type AmplifyConfig = {
  aws_cognito_region: string;
  aws_user_pools_id: string;
  aws_cognito_identity_pool_id: string;
  aws_user_pools_web_client_id: string;
  oauth?: {
    domain: string;
    scope: string[];
    redirectSignIn: string;
    redirectSignOut: string;
    responseType: string;
  },
  federationTarget: string;
};

const appConfig = {
  aws_project_region: 'us-west-2',
  aws_cognito_identity_pool_id: process.env.NEXT_PUBLIC_AWS_COGNITO_ID_POOL_ID,
  aws_cognito_region: 'us-west-2',
  aws_user_pools_id: process.env.NEXT_PUBLIC_AWS_COGNITO_USER_POOL_ID,
  aws_user_pools_web_client_id: process.env.NEXT_PUBLIC_AWS_CLIENT_ID,
  identityProviderName: 'AzureAD',
  oauth: {
    domain: process.env.NEXT_PUBLIC_AWS_COGNITO_OAUTH_DOMAIN,
    scope: ['email', 'profile', 'openid', 'aws.cognito.signin.user.admin'],
    redirectSignIn: process.env.NEXT_PUBLIC_AWS_COGNITO_OAUTH_REDIRECT_SIGNIN,
    redirectSignOut:
      process.env.NEXT_PUBLIC_AWS_COGNITO_OAUTH_REDIRECT_SIGNOUT,
    responseType: 'token',
  },
  federationTarget: 'AzureAD',
  Auth: {
    Cognito: {
      // REQUIRED only for Federated Authentication - Amazon Cognito Identity Pool ID
      identityPoolId: process.env.NEXT_PUBLIC_AWS_COGNITO_ID_POOL_ID,

      // OPTIONAL - Amazon Cognito User Pool ID
      userPoolId: process.env.NEXT_PUBLIC_AWS_COGNITO_USER_POOL_ID,

      // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
      userPoolClientId: process.env.NEXT_PUBLIC_AWS_WEB_CLIENT_ID,

      loginWith: {
        oauth: {
          domain: process.env.NEXT_PUBLIC_AWS_COGNITO_OAUTH_DOMAIN,
          scopes: [
            'email',
            'profile',
            'openid',
            'aws.cognito.signin.user.admin',
          ],
          redirectSignIn: [
            process.env.NEXT_PUBLIC_AWS_COGNITO_OAUTH_REDIRECT_SIGNIN,
          ],
          redirectSignOut: [
            process.env.NEXT_PUBLIC_AWS_COGNITO_OAUTH_REDIRECT_SIGNOUT,
          ],
          responseType: 'code',
        },
      },
    },
    // REQUIRED only for Federated Authentication - Amazon Cognito Identity Pool ID
    identityPoolId: process.env.NEXT_PUBLIC_AWS_COGNITO_ID_POOL_ID,

    // REQUIRED - Amazon Cognito Region
    region: 'us-west-2',

    // OPTIONAL - Amazon Cognito Federated Identity Pool Region
    // Required only if it's different from Amazon Cognito Region
    identityPoolRegion: 'us-west-2',

    // OPTIONAL - Amazon Cognito User Pool ID
    userPoolId: process.env.NEXT_PUBLIC_AWS_COGNITO_USER_POOL_ID,

    // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
    userPoolWebClientId: process.env.NEXT_PUBLIC_AWS_WEB_CLIENT_ID,

    // // OPTIONAL - Enforce user authentication prior to accessing AWS resources or not
    // mandatorySignIn: false,

    // // OPTIONAL - Configuration for cookie storage
    // // Note: if the secure flag is set to true, then the cookie transmission requires a secure protocol
    // cookieStorage: {
    // // REQUIRED - Cookie domain (only required if cookieStorage is provided)
    //     domain: '.yourdomain.com',
    // // OPTIONAL - Cookie path
    //     path: '/',
    // // OPTIONAL - Cookie expiration in days
    //     expires: 365,
    // // OPTIONAL - See: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie/SameSite
    //     sameSite: "strict" | "lax",
    // // OPTIONAL - Cookie secure flag
    // // Either true or false, indicating if the cookie transmission requires a secure protocol (https).
    //     secure: true
    // },

    // // OPTIONAL - customized storage object
    // storage: MyStorage,

    // // OPTIONAL - Manually set the authentication flow type. Default is 'USER_SRP_AUTH'
    // authenticationFlowType: 'USER_PASSWORD_AUTH',

    // // OPTIONAL - Manually set key value pairs that can be passed to Cognito Lambda Triggers
    // clientMetadata: { myCustomKey: 'myCustomValue' },

    // OPTIONAL - Hosted UI configuration
    oauth: {
      domain: process.env.NEXT_PUBLIC_AWS_COGNITO_OAUTH_DOMAIN,
      scope: ['email', 'profile', 'openid', 'aws.cognito.signin.user.admin'],
      redirectSignIn: process.env.NEXT_PUBLIC_AWS_COGNITO_OAUTH_REDIRECT_SIGNIN,
      redirectSignOut:
        process.env.NEXT_PUBLIC_AWS_COGNITO_OAUTH_REDIRECT_SIGNOUT,
      responseType: 'token',
    },
  },
} as ResourcesConfig & AmplifyConfig;

export default appConfig;
