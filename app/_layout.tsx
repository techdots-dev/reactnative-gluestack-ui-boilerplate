import "@/global.css"
import { Slot } from "expo-router";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { PostHogProvider } from "posthog-react-native";
import * as Sentry from "@sentry/react-native";
import Constants from "expo-constants";
import { useScreenTracking } from "@/src/hooks/useScreenTracking";
import posthog from "@/src/hooks/provider/posthog";
import { LoadingProvider } from "@/src/contexts/LoadingContext";
import { GlobalLoader } from "@/src/components/GlobalLoader";

const { SENTRY_DSN } = Constants.expoConfig?.extra || {};

// Initialize Sentry
Sentry.init({
  dsn: SENTRY_DSN,
  sendDefaultPii: true,
});

function Providers({ children }: { children: React.ReactNode }) {
  useScreenTracking(); // 📊 manual PostHog screen tracking

  return (
    <PostHogProvider
      client={posthog}
      autocapture={{
        captureScreens: false, // 🚨 prevent useNavigation crash
      }}
    >
      <GluestackUIProvider mode="light">
        <LoadingProvider>
          {children}
          <GlobalLoader />
        </LoadingProvider>
      </GluestackUIProvider>
    </PostHogProvider>
  );
}

export default Sentry.wrap(function RootLayout() {
  return (
    <Providers>
      <Slot screenOptions={{ headerShown: false }}/>
    </Providers>
  );
});
