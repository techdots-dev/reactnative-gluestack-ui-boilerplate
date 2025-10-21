import { initPosthog, posthog } from "./posthog";


export async function setupErrorTracking() {

  const defaultHandler = (ErrorUtils as any).getGlobalHandler?.();

  (ErrorUtils as any).setGlobalHandler((error: any, isFatal?: boolean) => {
    posthog?.captureException(error, {
      severity: isFatal ? 'fatal' : 'error',
      extra: {
        isFatal: isFatal ?? false,
      },
    });

    if (defaultHandler) {
      defaultHandler(error, isFatal);
    }
  });
}

export function patchConsoleForErrors() {
  const originalError = console.error;
  console.error = (...args) => {
    initPosthog().then(client => {
      args.forEach(arg => {
        if (arg instanceof Error) {
          client?.captureException(arg, {
            severity: 'error',
            extra: { source: 'console.error' },
          });
        } else {
          client?.captureException(new Error(String(arg)), {
            severity: 'error',
            extra: { source: 'console.error', raw: arg },
          });
        }
      });
    });
    originalError(...args);
  };

  const originalWarn = console.warn;
  console.warn = (...args) => {
    initPosthog().then(client => {
      args.forEach(arg => {
        if (arg instanceof Error) {
          client?.captureException(arg, {
            severity: 'warning',
            extra: { source: 'console.warn' },
          });
        } else {
          client?.captureException(new Error(String(arg)), {
            severity: 'warning',
            extra: { source: 'console.warn', raw: arg },
          });
        }
      });
    });
    originalWarn(...args);
  };
}
