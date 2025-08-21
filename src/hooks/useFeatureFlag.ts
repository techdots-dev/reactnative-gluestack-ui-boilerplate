// src/hooks/useFeatureFlag.ts
import { useEffect, useState } from "react";
import posthog from "./provider/posthog";

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
        const isEnabled = await posthog.isFeatureEnabled(flagKey);
        setEnabled(!!isEnabled); // coerce undefined to false
      } catch (err) {
        setEnabled(defaultValue);
      }
    };

    fetchFlag();
  }, [flagKey, defaultValue]);

  return enabled;
}
