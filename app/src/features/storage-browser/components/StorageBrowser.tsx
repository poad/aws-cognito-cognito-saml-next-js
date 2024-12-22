import {
  createAmplifyAuthAdapter,
  createStorageBrowser,
} from '@aws-amplify/ui-react-storage/browser';
import '@aws-amplify/ui-react-storage/styles.css';
import appConfig from '../../../app-config';

export const { StorageBrowser } = createStorageBrowser({
  config: {
    ...createAmplifyAuthAdapter(),
    listLocations: async ({ options }) => {
      return {
        items: [
          {
            id: 'root',
            bucket: appConfig.Storage?.S3.bucket ?? '',
            permissions: ['delete', 'get', 'list', 'write'],
            prefix: '',
            type: 'BUCKET',
          },
        ],
        nextToken: options?.nextToken,
      };
    },
  },
});
