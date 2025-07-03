import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  TrendingUp,
  TrendingDown,
  ChevronUp,
  ChevronDown,
  User,
} from "lucide-react";
import type { Memecoin } from "./types";

interface MemecoinCardProps {
  coin: Memecoin;
  isExpanded: boolean;
  getCardStyle: () => React.CSSProperties;
  onMouseDown: (e: React.MouseEvent) => void;
  onMouseMove: (e: React.MouseEvent) => void;
  onMouseUp: (e: React.MouseEvent) => void;
  onMouseLeave: (e: React.MouseEvent) => void;
  onTouchStart: (e: React.TouchEvent) => void;
  onTouchMove: (e: React.TouchEvent) => void;
  onTouchEnd: (e: React.TouchEvent) => void;
  onToggleExpanded: () => void;
}

// Helper to map tailwind gradient string to actual color values
const colorMap: Record<string, string> = {
  "from-pink-400": "#f472b6",
  "to-purple-500": "#a78bfa",
  "from-yellow-400": "#facc15",
  "to-orange-500": "#f97316",
  "from-green-400": "#4ade80",
  "to-lime-500": "#84cc16",
  "from-blue-400": "#60a5fa",
  "to-cyan-500": "#06b6d4",
  "from-indigo-400": "#818cf8",
  "to-blue-500": "#3b82f6",
  "from-red-400": "#f87171",
  "to-pink-500": "#ec4899",
  "from-purple-400": "#a78bfa",
  "to-indigo-500": "#6366f1",
};

function getGradientFromColorString(colorString: string) {
  const [from, to] = colorString.split(" ");
  const fromColor = colorMap[from] || "#f472b6";
  const toColor = colorMap[to] || "#a78bfa";
  return `linear-gradient(135deg, ${fromColor} 0%, ${toColor} 100%)`;
}

const MemecoinCard: React.FC<MemecoinCardProps> = ({
  coin,
  isExpanded,
  getCardStyle,
  onMouseDown,
  onMouseMove,
  onMouseUp,
  onMouseLeave,
  onTouchStart,
  onTouchMove,
  onTouchEnd,
  onToggleExpanded,
}) => {
  return (
    <Card
      className="absolute inset-0 border-4 border-white cursor-grab active:cursor-grabbing shadow-2xl transition-all duration-300"
      style={{
        ...getCardStyle(),
        background: `linear-gradient(135deg, ${coin.color.split(" ")[1]} 0%, ${
          coin.color.split(" ")[3]
        } 100%)`,
        cursor: isExpanded ? "default" : "grab",
      }}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseLeave}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      <CardContent className="p-0 h-full">
        <div className="h-full flex flex-col text-white">
          {/* Coin Image */}
          <div
            className={`${
              isExpanded ? "flex-none" : "flex-1"
            } flex items-center justify-center p-8 relative`}
          >
            <div
              className="absolute inset-0 rounded-t-lg"
              style={{
                background: getGradientFromColorString(coin.color),
              }}
            ></div>
            <img
              src={
                coin.creatorProfile?.avatar?.previewImage?.medium ||
                "/placeholder.svg"
              }
              alt={coin.name}
              width={isExpanded ? 96 : 160}
              height={isExpanded ? 96 : 160}
              className={`${
                isExpanded ? "w-24 h-24" : "w-40 h-40"
              } rounded-full border-6 border-white shadow-2xl relative z-10 transition-all duration-300`}
              style={{ objectFit: "cover" }}
            />
            <div className="absolute top-4 right-4 z-10">
              <Badge
                variant={
                  Number(coin.marketCapDelta24h) > 0 ? "default" : "destructive"
                }
                className={`text-lg px-3 py-1 ${
                  Number(coin.marketCapDelta24h) > 0
                    ? "bg-lime-400 text-black hover:bg-lime-300"
                    : "bg-red-500 text-white hover:bg-red-600"
                }`}
                style={{ fontFamily: "Slackey, cursive" }}
              >
                {Number(coin.marketCapDelta24h) > 0 ? (
                  <TrendingUp className="w-4 h-4 mr-1" />
                ) : (
                  <TrendingDown className="w-4 h-4 mr-1" />
                )}
                {Number(coin.marketCapDelta24h) > 0 ? "+" : ""}
                {Math.floor(Number(coin.marketCapDelta24h))}%
              </Badge>
            </div>
            {/* Expand/Collapse Button */}
            <button
              onClick={onToggleExpanded}
              className="absolute bottom-4 right-4 z-10 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-full p-2 transition-all duration-200"
            >
              {isExpanded ? (
                <ChevronDown className="w-6 h-6 text-white" />
              ) : (
                <ChevronUp className="w-6 h-6 text-white" />
              )}
            </button>
          </div>

          {/* Coin Name and Ticker (restore above stat rows) */}
          <div className="text-center px-2">
            <h2
              className={`${
                isExpanded ? "text-2xl" : "text-3xl"
              } mb-1 transition-all duration-300 text-gray-900 break-words max-w-full`}
              style={{ fontFamily: "Slackey, cursive" }}
            >
              {coin.name}
            </h2>
            <p
              className={`${
                isExpanded ? "text-lg" : "text-xl"
              } text-gray-600 transition-all duration-300 truncate`}
              style={{ fontFamily: "Slackey, cursive" }}
            >
              ${coin.symbol}
            </p>
          </div>

          {/* Coin Info */}
          <div
            className={`bg-white/95 backdrop-blur-sm text-gray-900 rounded-b-lg ${
              isExpanded ? "flex-1 overflow-hidden" : ""
            }`}
          >
            <div
              className={`${
                isExpanded ? "h-full overflow-y-auto" : ""
              } p-6 py-2 space-y-4`}
            >
              {/* Market Cap and Holders Row (first row) */}
              <div className="grid grid-cols-2 gap-4 mb-2">
                <div className="bg-gray-100 rounded-xl p-4 text-center">
                  <p
                    className="text-sm text-gray-500 uppercase tracking-wide"
                    style={{ fontFamily: "Slackey, cursive" }}
                  >
                    Market Cap
                  </p>
                  <p
                    className="text-2xl text-gray-900"
                    style={{ fontFamily: "Slackey, cursive" }}
                  >
                    {coin.marketCap}
                  </p>
                </div>
                <div className="bg-purple-50 rounded-xl p-4 text-center">
                  <p
                    className="text-sm text-purple-400 uppercase tracking-wide"
                    style={{ fontFamily: "Slackey, cursive" }}
                  >
                    Holders
                  </p>
                  <p
                    className="text-2xl text-purple-600"
                    style={{ fontFamily: "Slackey, cursive" }}
                  >
                    {coin.uniqueHolders}
                  </p>
                </div>
              </div>

              {/* 24h Volume and Token Address Row (second row) */}
              <div className="grid grid-cols-2 gap-4 mb-3">
                <div className="bg-blue-50 rounded-xl p-4 text-center">
                  <p
                    className="text-sm text-blue-600 uppercase tracking-wide"
                    style={{ fontFamily: "Slackey, cursive" }}
                  >
                    24h Volume
                  </p>
                  <p
                    className="text-2xl text-blue-900"
                    style={{ fontFamily: "Slackey, cursive" }}
                  >
                    {coin.volume24h}
                  </p>
                </div>
                <div className="bg-yellow-50 rounded-xl p-4 text-center">
                  <p
                    className="text-sm text-yellow-600 uppercase tracking-wide"
                    style={{ fontFamily: "Slackey, cursive" }}
                  >
                    Address
                  </p>
                  <a
                    href={`https://basescan.org/address/${coin.address}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-base text-yellow-800 font-mono hover:underline"
                    style={{ fontFamily: "Slackey, cursive" }}
                  >
                    {coin.address
                      ? `${coin.address.slice(0, 6)}...${coin.address.slice(
                          -4
                        )}`
                      : "-"}
                  </a>
                </div>
              </div>

              {/* Creator Section - smaller, icon instead of avatar */}
              <div
                className="flex items-center gap-2 mb-1 cursor-pointer hover:bg-gray-50 rounded p-1 transition"
                style={{ maxWidth: 180 }}
                onClick={() => {
                  if (coin.creatorAddress) {
                    window.open(
                      `https://basescan.org/address/${coin.creatorAddress}`,
                      "_blank"
                    );
                  }
                }}
              >
                <User className="w-5 h-5 text-gray-400" />
                <div>
                  <div
                    className="text-xs text-gray-400"
                    style={{ fontFamily: "Slackey, cursive" }}
                  >
                    Created by
                  </div>
                  <div
                    className="text-sm text-gray-700 font-semibold"
                    style={{ fontFamily: "Slackey, cursive" }}
                  >
                    {coin.creatorProfile?.handle || "Unknown"}
                  </div>
                </div>
              </div>

              {/* Expanded Details */}
              {isExpanded && (
                <div className="space-y-6 mt-6">
                  {/* Combined Supply and Project Details Section */}
                  <div className="bg-gray-50 rounded-xl p-4">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span
                          className="text-sm text-gray-600"
                          style={{ fontFamily: "Slackey, cursive" }}
                        >
                          Total Supply:
                        </span>
                        <span
                          className="text-sm"
                          style={{ fontFamily: "Slackey, cursive" }}
                        >
                          {coin.totalSupply}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span
                          className="text-sm text-gray-600"
                          style={{ fontFamily: "Slackey, cursive" }}
                        >
                          Date Created:
                        </span>
                        <span
                          className="text-sm"
                          style={{ fontFamily: "Slackey, cursive" }}
                        >
                          {coin.createdAt
                            ? new Date(coin.createdAt).toLocaleDateString(
                                undefined,
                                {
                                  year: "numeric",
                                  month: "short",
                                  day: "numeric",
                                }
                              )
                            : "-"}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* About Section */}
                  <div className="bg-indigo-50 rounded-xl p-4">
                    <h3
                      className="text-lg mb-3"
                      style={{ fontFamily: "Slackey, cursive" }}
                    >
                      About {coin.name}
                    </h3>
                    <p
                      className="text-sm text-gray-700 leading-relaxed"
                      style={{ fontFamily: "Slackey, cursive" }}
                    >
                      {coin.description}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MemecoinCard;
