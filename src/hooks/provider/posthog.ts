// src/providers/posthog.ts
import { PostHog } from "posthog-react-native";
import Constants from "expo-constants";

const { POSTHOG_KEY } = Constants.expoConfig?.extra || {};

const posthog = new PostHog(POSTHOG_KEY, {
  host: "https://us.i.posthog.com",
 enableSessionReplay: false,
});

export default posthog;
