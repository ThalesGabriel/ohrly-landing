export {};

declare global {
  interface MetaFbq {
    (...args: unknown[]): void;
    callMethod?: (...args: unknown[]) => void;
    queue?: unknown[][];
    loaded?: boolean;
    version?: string;
  }

  interface Window {
    fbq?: MetaFbq;
    _fbq?: MetaFbq;
  }
}
