// src/providers/posthog.ts
import { PostHog } from "posthog-react-native";
import Constants from "expo-constants";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { POSTHOG_KEY } = Constants.expoConfig?.extra || {};

let posthog: PostHog | null = null;
let initializing: Promise<PostHog> | null = null; // prevent race conditions

export const getSessionReplayPreference = async (): Promise<boolean> => {
  try {
    const preference = await AsyncStorage.getItem("sessionReplayEnabled");
    return preference === "true"; // default false
  } catch (error) {
    console.error("Error reading session replay preference:", error);
    return false;
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
    const enableSessionReplay = await getSessionReplayPreference();

    console.log("session replay    ", enableSessionReplay)

    posthog = new PostHog(POSTHOG_KEY, {
      host: "https://us.i.posthog.com",
      enableSessionReplay,
      defaultOptIn: false,
    });

    posthog.optIn()

    return posthog;
  })();

  return initializing;
};

// Consumers should always `await initPosthog()`
// No default export of `null` to avoid confusion
export { posthog };
