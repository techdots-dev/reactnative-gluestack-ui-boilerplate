import { initPosthog, posthog } from "./posthog";

export async function setupErrorTracking() {
  try {
    const defaultHandler = (ErrorUtils as any).getGlobalHandler?.();

    (ErrorUtils as any).setGlobalHandler((error: any, isFatal?: boolean) => {
      try {
        // Now captureException should work with the mock
        posthog?.captureException?.(error, {
          severity: isFatal ? 'fatal' : 'error',
          extra: {
            isFatal: isFatal ?? false,
          },
        });
      } catch (posthogError) {
        console.error('Failed to capture exception in global handler:', posthogError);
      }

      if (defaultHandler) {
        defaultHandler(error, isFatal);
      }
    });
  } catch (error) {
    console.error('Failed to setup error tracking:', error);
  }
}

export function patchConsoleForErrors() {
  try {
    const originalError = console.error;
    console.error = (...args) => {
      try {
        initPosthog().then(client => {
          try {
            args.forEach(arg => {
              if (arg instanceof Error) {
                client?.captureException?.(arg, {
                  severity: 'error',
                  extra: { source: 'console.error' },
                });
              } else {
                client?.captureException?.(new Error(String(arg)), {
                  severity: 'error',
                  extra: { source: 'console.error', raw: arg },
                });
              }
            });
          } catch (captureError) {
            console.error('Failed to capture console error:', captureError);
          }
        }).catch(initError => {
          console.error('Failed to initialize PostHog for console error:', initError);
        });
      } catch (error) {
        console.error('Error in console.error patch:', error);
      }
      originalError(...args);
    };

    const originalWarn = console.warn;
    console.warn = (...args) => {
      try {
        initPosthog().then(client => {
          try {
            args.forEach(arg => {
              if (arg instanceof Error) {
                client?.captureException?.(arg, {
                  severity: 'warning',
                  extra: { source: 'console.warn' },
                });
              } else {
                client?.captureException?.(new Error(String(arg)), {
                  severity: 'warning',
                  extra: { source: 'console.warn', raw: arg },
                });
              }
            });
          } catch (captureError) {
            console.error('Failed to capture console warn:', captureError);
          }
        }).catch(initError => {
          console.error('Failed to initialize PostHog for console warn:', initError);
        });
      } catch (error) {
        console.error('Error in console.warn patch:', error);
      }
      originalWarn(...args);
    };
  } catch (error) {
    console.error('Failed to patch console for errors:', error);
  }
}