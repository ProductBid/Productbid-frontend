import { SWRConfiguration } from "swr";

export const defaultSWRConfig: SWRConfiguration = {
  revalidateOnFocus: true,
  revalidateOnReconnect: true,
  refreshInterval: 15000,
  shouldRetryOnError: false,
};
