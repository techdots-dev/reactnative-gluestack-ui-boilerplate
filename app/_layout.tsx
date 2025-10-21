import "@/global.css";
import { Slot } from "expo-router";
import { useEffect, useState } from "react";
import Constants from "expo-constants";
import * as Sentry from "@sentry/react-native";
import { QueryClientProvider } from "@tanstack/react-query";
import { SafeAreaView, StyledProvider } from "@gluestack-ui/themed";
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
// import { gluestackConfig } from "@/src/gluestackConfig";

// 🔐 Sentry Initialization
const { SENTRY_DSN } = Constants.expoConfig?.extra || {};
Sentry.init({
  dsn: SENTRY_DSN,
  sendDefaultPii: true,
});

// 🌐 Providers for PostHog + Gluestack + Global Loading
function Providers({ children }: { children: React.ReactNode }) {
  const [client, setClient] = useState<null | any>(null);

  useEffect(() => {
    (async () => {
      const instance = await initPosthog();
      setClient(instance);
      setupErrorTracking();
      patchConsoleForErrors();
    })();
  }, []);

  useScreenTracking(client);

  if (!client) return null; // ⏳ can be replaced with a splash screen

  return (
    <PostHogProvider
      client={client}
      autocapture={{
        captureScreens: false, // 🚨 avoids useNavigation crash
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
    <StyledProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <Providers>
            <SafeAreaView className="flex-1">
              <Slot screenOptions={{ headerShown: false }} />
            </SafeAreaView>
          </Providers>
        </AuthProvider>
      </QueryClientProvider>
    </StyledProvider>
  );
});
