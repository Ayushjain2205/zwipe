import { NextRequest, NextResponse } from "next/server";
import { getCoinsNew } from "@zoralabs/coins-sdk";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const count = searchParams.get("count")
    ? parseInt(searchParams.get("count") as string, 10)
    : 20;
  const after = searchParams.get("after") || undefined;

  try {
    const response = await getCoinsNew({ count, after });
    const edges = response.data?.exploreList?.edges || [];
    const coins = edges.map((edge: any) => edge.node);
    const pagination = {
      cursor: response.data?.exploreList?.pageInfo?.endCursor || null,
    };
    return NextResponse.json({ coins, pagination });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Unknown error" },
      { status: 500 }
    );
  }
}
