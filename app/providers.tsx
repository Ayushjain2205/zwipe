"use client";

import { createContext, ReactNode, useState } from "react";
import {
  getDefaultConfig,
  RainbowKitProvider,
  darkTheme,
} from "@rainbow-me/rainbowkit";
import { WagmiProvider, http } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export const Context = createContext<{
  streamPromise?: Promise<ReadableStream>;
  setStreamPromise: (v: Promise<ReadableStream> | undefined) => void;
}>({
  setStreamPromise: () => {},
});

// Base Mainnet config
const baseMainnet = {
  id: 8453,
  name: "Base Mainnet",
  nativeCurrency: {
    name: "Ethereum",
    symbol: "ETH",
    decimals: 18,
  },
  rpcUrls: {
    default: { http: ["https://mainnet.base.org"] },
    public: { http: ["https://mainnet.base.org"] },
  },
  blockExplorers: {
    default: { name: "Basescan", url: "https://basescan.org" },
  },
  testnet: false,
};

const config = getDefaultConfig({
  appName: "ZappForge",
  projectId: "zappforge-base-mainnet", // You can use any string here
  chains: [baseMainnet],
  transports: {
    [baseMainnet.id]: http("https://mainnet.base.org"),
  },
});

const queryClient = new QueryClient();

export default function Providers({ children }: { children: ReactNode }) {
  const [streamPromise, setStreamPromise] = useState<Promise<ReadableStream>>();

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider theme={darkTheme()}>
          <Context.Provider value={{ streamPromise, setStreamPromise }}>
            {children}
          </Context.Provider>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
