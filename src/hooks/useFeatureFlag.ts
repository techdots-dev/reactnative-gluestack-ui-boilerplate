// src/hooks/useFeatureFlag.ts
import { useEffect, useState } from "react";
import { initPosthog } from "./provider/posthog";

/**
 * Generic hook to use feature flags from PostHog
 * @param flagKey - The key of the feature flag in PostHog
 * @param defaultValue - fallback if flag not loaded or undefined
 */
export function useFeatureFlag(flagKey: string, defaultValue = false) {
  const [enabled, setEnabled] = useState<boolean>(defaultValue);

  useEffect(() => {
    const fetchFlag = async () => {
      try {
        // wait for PostHog to initialize (reads AsyncStorage)
        const client = await initPosthog();

        // use the initialized client
        const isEnabled = await client.isFeatureEnabled(flagKey);
        setEnabled(!!isEnabled); // coerce undefined → false
      } catch (err) {
        setEnabled(defaultValue);
      }
    };

    fetchFlag();
  }, [flagKey, defaultValue]);

  return enabled;
}
