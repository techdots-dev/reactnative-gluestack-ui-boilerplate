// src/hooks/provider/posthog.ts
import { PostHog } from "posthog-react-native";
import Constants from "expo-constants";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { POSTHOG_KEY } = Constants.expoConfig?.extra || {};

let posthog: PostHog | null = null;
let initializing: Promise<PostHog> | null = null; // prevent race conditions

// Storage keys
const ANALYTICS_KEY = "analyticsEnabled";
const SESSION_REPLAY_KEY = "sessionReplayEnabled";

export const getAnalyticsPreference = async (): Promise<boolean> => {
  try {
    const preference = await AsyncStorage.getItem(ANALYTICS_KEY);
    return preference !== "false"; // default true
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
    return preference === "true"; // default false
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
    // already initialized, return existing instance
    return posthog;
  }

  if (initializing) {
    // another call is in progress — wait for it
    return initializing;
  }

  initializing = (async () => {
    const [enableSessionReplay, enableAnalytics] = await Promise.all([
      getSessionReplayPreference(),
      getAnalyticsPreference(),
    ]);

    posthog = new PostHog(POSTHOG_KEY, {
      host: "https://us.i.posthog.com",
      enableSessionReplay,
      defaultOptIn: false,
    });

    // Respect analytics preference
    if (enableAnalytics) {
      posthog.optIn();
    } else {
      posthog.optOut();
    }

    return posthog;
  })();

  return initializing;
};

// Consumers should always `await initPosthog()`
// No default export of `null` to avoid confusion
export { posthog };
