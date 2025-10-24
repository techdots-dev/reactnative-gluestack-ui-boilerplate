// src/hooks/provider/posthog.ts
import { PostHog } from "posthog-react-native";
import Constants from "expo-constants";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { POSTHOG_KEY } = Constants.expoConfig?.extra || {};

let posthog: PostHog | null = null;
let initializing: Promise<PostHog> | null = null;

// Storage keys
const ANALYTICS_KEY = "analyticsEnabled";
const SESSION_REPLAY_KEY = "sessionReplayEnabled";

export const getAnalyticsPreference = async (): Promise<boolean> => {
  try {
    const preference = await AsyncStorage.getItem(ANALYTICS_KEY);
    return preference !== "false";
  } catch (error) {
    console.error("Error reading analytics preference:", error);
    return true;
  }
};

export const setAnalyticsPreference = async (enabled: boolean): Promise<void> => {
  try {
    await AsyncStorage.setItem(ANALYTICS_KEY, enabled ? "true" : "false");
  } catch (error) {
    console.error("Error saving analytics preference:", error);
  }
};

export const getSessionReplayPreference = async (): Promise<boolean> => {
  try {
    const preference = await AsyncStorage.getItem(SESSION_REPLAY_KEY);
    return preference === "true";
  } catch (error) {
    console.error("Error reading session replay preference:", error);
    return false;
  }
};

export const setSessionReplayPreference = async (enabled: boolean): Promise<void> => {
  try {
    await AsyncStorage.setItem(SESSION_REPLAY_KEY, enabled ? "true" : "false");
  } catch (error) {
    console.error("Error saving session replay preference:", error);
  }
};

export const initPosthog = async (): Promise<PostHog> => {
  if (posthog) {
    return posthog;
  }

  if (initializing) {
    return initializing;
  }

  initializing = (async () => {
    try {
      // Check if PostHog key is valid - if not, throw error to be caught below
      if (!POSTHOG_KEY || POSTHOG_KEY === '' || POSTHOG_KEY.includes('mock')) {
        throw new Error('PostHog disabled - invalid key');
      }

      const [enableSessionReplay, enableAnalytics] = await Promise.all([
        getSessionReplayPreference(),
        getAnalyticsPreference(),
      ]);

      const instance = new PostHog(POSTHOG_KEY, {
        host: "https://us.i.posthog.com",
        enableSessionReplay,
        defaultOptIn: false,
      });

      if (enableAnalytics) {
        instance.optIn();
      } else {
        instance.optOut();
      }

      posthog = instance;
      return posthog;
    } catch (error) {
      console.log("Failed to initialize PostHog:", error);
      // Create a mock PostHog instance that has captureException method
      const mockPostHog = {
        capture: () => {},
        captureException: () => {},
        identify: () => {},
        reset: () => {},
        optIn: () => {},
        optOut: () => {},
        debug: () => {}, // Add this method
        // Add any other methods your app uses
      } as any as PostHog;
      
      posthog = mockPostHog;
      return posthog;
    } finally {
      initializing = null;
    }
  })();

  return initializing;
};

export { posthog };