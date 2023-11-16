import { Amplify, Auth } from 'aws-amplify';
import appConfig from './app-config';

Amplify.configure({
  Auth: appConfig.auth,
});

export default appConfig;

// // You can get the current config object
// const awsconfig = Auth.configure();
// export default awsconfig;
