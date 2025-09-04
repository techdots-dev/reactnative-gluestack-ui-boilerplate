import { useEffect } from 'react';
import * as Updates from 'expo-updates';

export const useOTAUpdates = () => {
  useEffect(() => {
    async function checkForUpdates() {
      try {
        const update = await Updates.checkForUpdateAsync();
        if (update.isAvailable) {
          await Updates.fetchUpdateAsync();
          await Updates.reloadAsync();
        }
      } catch (e) {
        console.log('Failed to check OTA updates', e);
      }
    }

    checkForUpdates();
  }, []);
};
