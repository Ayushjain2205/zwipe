import { NextRequest, NextResponse } from "next/server";
import { getCoinsTopGainers } from "@zoralabs/coins-sdk";
// Try importing from the main SDK entry, fallback to local type if needed
// import type { GetExploreResponse } from "@zoralabs/coins-sdk/dist/client/types.gen";

type Coin = {
  id: string;
  name: string;
  description: string;
  address: string;
  symbol: string;
  totalSupply: string;
  totalVolume: string;
  volume24h: string;
  createdAt?: string;
  creatorAddress?: string;
  marketCap: string;
  marketCapDelta24h: string;
  chainId: number;
  uniqueHolders: number;
  // ...other fields as needed
};

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const count = searchParams.get("count")
    ? parseInt(searchParams.get("count") as string, 10)
    : 20;
  const after = searchParams.get("after") || undefined;

  try {
    const response = await getCoinsTopGainers({ count, after });
    const edges = response.data?.exploreList?.edges || [];
    let coins = edges.map((edge: { node: Coin }) => edge.node);

    // Read filters from query params
    const marketCap = searchParams.get("marketCap")
      ? parseFloat(searchParams.get("marketCap") as string)
      : undefined;
    const uniqueHolders = searchParams.get("uniqueHolders")
      ? parseInt(searchParams.get("uniqueHolders") as string, 10)
      : undefined;

    // Filter coins
    // TEMP: Log the first coin to inspect structure
    if (coins.length > 0) {
      console.log("First coin:", coins[0]);
    }
    coins = coins.filter((coin: Coin) => {
      let pass = true;
      if (marketCap !== undefined) {
        const coinMarketCap =
          typeof coin.marketCap === "string"
            ? parseFloat(coin.marketCap)
            : coin.marketCap;
        pass = pass && coinMarketCap >= marketCap;
      }
      if (uniqueHolders !== undefined) {
        pass = pass && coin.uniqueHolders >= uniqueHolders;
      }
      return pass;
    });
    const pagination = {
      cursor: response.data?.exploreList?.pageInfo?.endCursor || null,
    };
    return NextResponse.json({ coins, pagination });
  } catch (error: unknown) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}
