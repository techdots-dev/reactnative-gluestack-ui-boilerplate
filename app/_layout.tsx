import "@/global.css"
import { Slot } from "expo-router";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { PostHogProvider } from "posthog-react-native";
import * as Sentry from "@sentry/react-native";
import Constants from "expo-constants";
import { useScreenTracking } from "@/src/hooks/useScreenTracking";  
import { LoadingProvider } from "@/src/contexts/LoadingContext";
import { GlobalLoader } from "@/src/components/GlobalLoader";
import { AuthProvider } from "@/src/contexts/AuthContext";
import { SafeAreaView } from "@gluestack-ui/themed";
import { useEffect, useState } from "react";
import { initPosthog } from "@/src/hooks/provider/posthog";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/src/api/queryClient";

const { SENTRY_DSN } = Constants.expoConfig?.extra || {};

// Initialize Sentry
Sentry.init({
  dsn: SENTRY_DSN,
  sendDefaultPii: true,
});

function Providers({ children }: { children: React.ReactNode }) {
  const [client, setClient] = useState<null | any>(null);

  useEffect(() => {
    (async () => {
      const instance = await initPosthog();
      setClient(instance);
    })();
  }, []); // runs once on app reload

  useScreenTracking(client); // 📊 manual PostHog screen tracking

  if (!client) return null; // or splash/loading UI

  return (
    <PostHogProvider
      client={client}
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
