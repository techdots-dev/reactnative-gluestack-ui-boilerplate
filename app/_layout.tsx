import "@/global.css";
import { Slot } from "expo-router";
import { useEffect, useState } from "react";
import Constants from "expo-constants";
import * as Sentry from "@sentry/react-native";
import { QueryClientProvider } from "@tanstack/react-query";
import { SafeAreaView } from "@gluestack-ui/themed";
import { GluestackUIProvider } from "@gluestack-ui/themed";

import { queryClient } from "@/src/api/queryClient";
import { AuthProvider } from "@/src/contexts/AuthContext";
import { LoadingProvider } from "@/src/contexts/LoadingContext";
import { GlobalLoader } from "@/src/components/GlobalLoader";
import { PostHogProvider } from "posthog-react-native";
import { initPosthog } from "@/src/hooks/provider/posthog";
import { useScreenTracking } from "@/src/hooks/useScreenTracking";
import { useOTAUpdates } from "@/src/hooks/useOTAUpdates";
import {
  patchConsoleForErrors,
  setupErrorTracking,
} from "@/src/hooks/provider/errorTracking";
import { config, gluestackUIConfig } from "@gluestack-ui/config";

// 🔐 SAFE Sentry Initialization - MUST BE BEFORE Sentry.wrap
const { SENTRY_DSN } = Constants.expoConfig?.extra || {};
if (SENTRY_DSN && SENTRY_DSN !== '' && !SENTRY_DSN.includes('mock')) {
  Sentry.init({
    dsn: SENTRY_DSN,
    sendDefaultPii: true,
  });
} else {
  console.log('Sentry disabled - no valid DSN');
}

// 🌐 Providers for PostHog + Gluestack + Global Loading
function Providers({ children }: { children: React.ReactNode }) {
  const [client, setClient] = useState<any>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const instance = await initPosthog();
        setClient(instance);
        setupErrorTracking();
        patchConsoleForErrors();
      } catch (error) {
        console.error('Failed to initialize providers:', error);
        // Create proper mock with all methods
        setClient({
          capture: () => {},
          captureException: () => {},
          identify: () => {},
          reset: () => {},
          optIn: () => {},
          optOut: () => {},
          debug: () => {}, // Add missing debug method
        });
      } finally {
        setIsReady(true);
      }
    })();
  }, []);

  useScreenTracking(client);

  if (!isReady) {
    return (
      <GluestackUIProvider colorMode="light" config={config}>
        <SafeAreaView className="flex-1 justify-center items-center">
        <LoadingProvider>
          {children}
          <GlobalLoader />
        </LoadingProvider>
        </SafeAreaView>
      </GluestackUIProvider>
    );
  }

  return (
    <PostHogProvider
      client={client}
      autocapture={{
        captureScreens: false,
      }}
    >
      <GluestackUIProvider colorMode="light" config={config}>
        <LoadingProvider>
          {children}
          <GlobalLoader />
        </LoadingProvider>
      </GluestackUIProvider>
    </PostHogProvider>
  );
}

// 🧭 Root Layout
export default Sentry.wrap(function RootLayout() {
  useOTAUpdates();

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Providers>
          <SafeAreaView className="flex-1">
            <Slot screenOptions={{ headerShown: false }} />
          </SafeAreaView>
        </Providers>
      </AuthProvider>
    </QueryClientProvider>
  );
});