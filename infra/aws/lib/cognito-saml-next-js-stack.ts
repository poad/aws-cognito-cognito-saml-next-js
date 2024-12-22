import * as cdk from 'aws-cdk-lib';
import * as cognito from 'aws-cdk-lib/aws-cognito';
import * as iam from 'aws-cdk-lib/aws-iam';
import { Construct } from 'constructs';
import * as ssm from 'aws-cdk-lib/aws-ssm';

interface CognitoSamlNextJsStackProps extends cdk.StackProps {
  environment: string;
  domain: string;
  identityProviderMetadataURL?: string;
  callbackUrls?: string[];
  logoutUrls?: string[];
}

export class CognitoSamlNextJsStack extends cdk.Stack {
  constructor(
    scope: Construct,
    id: string,
    props: CognitoSamlNextJsStackProps
  ) {
    super(scope, id, props);

    const {
      environment,
      domain,
      identityProviderMetadataURL,
      callbackUrls,
      logoutUrls,
    } = props;

    const userPool = new cognito.UserPool(this, 'CognitoSamlUserPool', {
      userPoolName: `${environment}-cognito-saml-user-pool`,
      signInAliases: {
        username: false,
        email: true,
        preferredUsername: false,
        phone: false,
      },
      autoVerify: {
        email: true,
      },
      standardAttributes: {
        email: {
          required: true,
        },
        preferredUsername: {
          required: false,
        },
        phoneNumber: {
          required: false,
        },
      },
      mfa: cognito.Mfa.OFF,
      passwordPolicy: {
        minLength: 8,
      },
      accountRecovery: cognito.AccountRecovery.EMAIL_ONLY,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    });

    userPool.addDomain('UserPoolDomain', {
      cognitoDomain: {
        domainPrefix: domain,
      },
    });

    if (identityProviderMetadataURL) {
      new cognito.UserPoolIdentityProviderSaml(this, 'CognitoSamlIdPAzureAD', {
        name: 'AzureAD',
        metadata: {
          metadataType: cognito.UserPoolIdentityProviderSamlMetadataType.URL,
          metadataContent: identityProviderMetadataURL,
        },
        attributeMapping: {
          email: cognito.ProviderAttribute.other(
            'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'
          ),
          custom: {
            name: cognito.ProviderAttribute.other(
              'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'
            ),
            email_verified: cognito.ProviderAttribute.other(
              'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/email_verified'
            ),
          },
          familyName: cognito.ProviderAttribute.other(
            'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/surname'
          ),
          givenName: cognito.ProviderAttribute.other(
            'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/givenname'
          ),
          preferredUsername: cognito.ProviderAttribute.other(
            'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'
          ),
        },
        userPool,
      });
    }

    const client = new cognito.UserPoolClient(this, 'CognitoSamlAppClient', {
      userPool: userPool,
      userPoolClientName: `${environment}-cognito-saml`,
      authFlows: {
        adminUserPassword: true,
        userSrp: true,
        userPassword: true,
      },
      oAuth: {
        callbackUrls,
        logoutUrls,
        flows: {
          authorizationCodeGrant: true,
          implicitCodeGrant: true,
        },
        scopes: [
          cognito.OAuthScope.COGNITO_ADMIN,
          cognito.OAuthScope.EMAIL,
          cognito.OAuthScope.OPENID,
          cognito.OAuthScope.PROFILE,
        ],
      },
      readAttributes: new cognito.ClientAttributes().withStandardAttributes({
        email: true,
        familyName: true,
        givenName: true,
        fullname: true,
        preferredUsername: true,
        emailVerified: true,
        profilePage: true,
      }),
      writeAttributes: new cognito.ClientAttributes().withStandardAttributes({
        email: true,
        familyName: true,
        givenName: true,
        fullname: true,
        preferredUsername: true,
        profilePage: true,
      }),
    });

    const identityPoolProvider = {
      clientId: client.userPoolClientId,
      providerName: userPool.userPoolProviderName,
    };
    const identityPool = new cognito.CfnIdentityPool(
      this,
      'CognitoSamlIdPool',
      {
        allowUnauthenticatedIdentities: false,
        allowClassicFlow: true,
        cognitoIdentityProviders: [identityPoolProvider],
        identityPoolName: `${environment} Cognito SAML idp`,
      }
    );

    const unauthenticatedRole = new iam.Role(
      this,
      'CognitoDefaultUnauthenticatedRole',
      {
        roleName: `${environment}-saml-next-js-unauth-role`,
        assumedBy: new iam.FederatedPrincipal(
          'cognito-identity.amazonaws.com',
          {
            StringEquals: {
              'cognito-identity.amazonaws.com:aud': identityPool.ref,
            },
            'ForAnyValue:StringLike': {
              'cognito-identity.amazonaws.com:amr': 'unauthenticated',
            },
          },
          'sts:AssumeRoleWithWebIdentity'
        ),
        maxSessionDuration: cdk.Duration.hours(12),
      }
    );

    unauthenticatedRole.addToPolicy(
      new iam.PolicyStatement({
        effect: iam.Effect.ALLOW,
        actions: ['cognito-sync:*', 'cognito-identity:*'],
        resources: ['*'],
      })
    );
    unauthenticatedRole.addToPolicy(
      new iam.PolicyStatement({
        effect: iam.Effect.ALLOW,
        actions: ['sts:*'],
        resources: ['*'],
      })
    );

    const authenticatedRole = new iam.Role(
      this,
      'CognitoDefaultAuthenticatedRole',
      {
        roleName: `${environment}-saml-next-js-auth-role`,
        assumedBy: new iam.FederatedPrincipal(
          'cognito-identity.amazonaws.com',
          {
            StringEquals: {
              'cognito-identity.amazonaws.com:aud': identityPool.ref,
            },
            'ForAnyValue:StringLike': {
              'cognito-identity.amazonaws.com:amr': 'authenticated',
            },
          },
          'sts:AssumeRoleWithWebIdentity'
        ).withSessionTags(),
        maxSessionDuration: cdk.Duration.hours(12),
        inlinePolicies: {
          'CognitoSamlIdPoolAuthRolePolicy': new iam.PolicyDocument({
            statements: [
              new iam.PolicyStatement({
                effect: iam.Effect.ALLOW,
                actions: [
                  'cognito-sync:*',
                  'cognito-identity:*',
                  'sts:*',
                ],
                resources: ['*'],
              }),
            ],
          }),
          'StorageBrowserForAmazonS3Policy': new iam.PolicyDocument({
            statements: [
              new iam.PolicyStatement({
                effect: iam.Effect.ALLOW,
                actions: [
                  's3:*',
                ],
                resources: [
                  'arn:aws:s3:::storage-browser-s3-store',
                  'arn:aws:s3:::storage-browser-s3-store/*',
                ],
              }),
            ],
          }),
        },
      }
    );

    new cognito.CfnIdentityPoolRoleAttachment(
      this,
      'CognitoSamlIdPoolRoleAttachment',
      {
        identityPoolId: identityPool.ref,
        roles: {
          authenticated: authenticatedRole.roleArn,
          unauthenticated: unauthenticatedRole.roleArn,
        },
      }
    );

    new ssm.StringParameter(this, 'CognitoDomainUrl', {
      parameterName: `/${environment}/cognito-saml-next-js/CognitoDomainUrl`,
      stringValue: `https://${domain}.auth.${this.region}.amazoncognito.com`,
    });

    new ssm.StringParameter(this, 'CognitoAppClientIdl', {
      parameterName: `/${environment}/cognito-saml-next-js/CognitoAppClientId`,
      stringValue: client.userPoolClientId,
    });
  }
}
