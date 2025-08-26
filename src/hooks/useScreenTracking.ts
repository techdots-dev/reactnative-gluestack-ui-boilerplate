// src/hooks/useScreenTracking.ts
import { useEffect } from "react";
import { usePathname } from "expo-router";

export function useScreenTracking(client: any) {
  const pathname = usePathname();

  useEffect(() => {
    if (!pathname || !client) return;

    try {
      client.capture("$screen", { 
        screen_name: pathname
      });
    } catch (e) {
      console.warn("PostHog capture failed", e);
    }
  }, [pathname, client]); // Re-run when pathname OR client changes
}