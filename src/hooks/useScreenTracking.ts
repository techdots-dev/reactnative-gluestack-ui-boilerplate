import { useEffect } from "react";
import { usePathname } from "expo-router";
import posthog from "./provider/posthog";

export function useScreenTracking() {
  const pathname = usePathname();

  useEffect(() => {
    if (!pathname) return;

    try {
      posthog.capture("$screen", { screen_name: pathname });
    } catch (e) {
      console.warn("PostHog capture failed", e);
    }
  }, [pathname]);
}
