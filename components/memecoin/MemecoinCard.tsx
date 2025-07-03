import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  TrendingUp,
  TrendingDown,
  ChevronUp,
  ChevronDown,
  Globe,
} from "lucide-react";
import { Memecoin } from "./types";
import Image from "next/image";

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
            <div className="absolute inset-0 bg-black/10 rounded-t-lg"></div>
            <Image
              src={coin.image || "/placeholder.svg"}
              alt={coin.name}
              width={isExpanded ? 96 : 160}
              height={isExpanded ? 96 : 160}
              className={`${
                isExpanded ? "w-24 h-24" : "w-40 h-40"
              } rounded-full border-6 border-white shadow-2xl relative z-10 transition-all duration-300`}
            />
            <div className="absolute top-4 right-4 z-10">
              <Badge
                variant={coin.change24h > 0 ? "default" : "destructive"}
                className={`text-lg px-3 py-1 ${
                  coin.change24h > 0
                    ? "bg-lime-400 text-black hover:bg-lime-300"
                    : "bg-red-500 text-white hover:bg-red-600"
                }`}
                style={{ fontFamily: "Slackey, cursive" }}
              >
                {coin.change24h > 0 ? (
                  <TrendingUp className="w-4 h-4 mr-1" />
                ) : (
                  <TrendingDown className="w-4 h-4 mr-1" />
                )}
                {coin.change24h > 0 ? "+" : ""}
                {coin.change24h}%
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

          {/* Coin Info */}
          <div
            className={`bg-white/95 backdrop-blur-sm text-gray-900 rounded-b-lg ${
              isExpanded ? "flex-1 overflow-hidden" : ""
            }`}
          >
            <div
              className={`${
                isExpanded ? "h-full overflow-y-auto" : ""
              } p-6 space-y-4`}
            >
              <div className="text-center">
                <h2
                  className={`${
                    isExpanded ? "text-2xl" : "text-3xl"
                  } mb-1 transition-all duration-300`}
                  style={{ fontFamily: "Slackey, cursive" }}
                >
                  {coin.name}
                </h2>
                <p
                  className={`${
                    isExpanded ? "text-lg" : "text-xl"
                  } text-gray-600 transition-all duration-300`}
                  style={{ fontFamily: "Slackey, cursive" }}
                >
                  {coin.symbol}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-100 rounded-xl p-4 text-center">
                  <p
                    className="text-sm text-gray-500 uppercase tracking-wide"
                    style={{ fontFamily: "Slackey, cursive" }}
                  >
                    Price
                  </p>
                  <p
                    className="text-2xl text-gray-900"
                    style={{ fontFamily: "Slackey, cursive" }}
                  >
                    ${coin.price}
                  </p>
                </div>
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
              </div>

              <p
                className="text-gray-700 text-center leading-relaxed"
                style={{ fontFamily: "Slackey, cursive" }}
              >
                {coin.description}
              </p>

              {/* Expanded Details */}
              {isExpanded && (
                <div className="space-y-6 mt-6">
                  {/* Additional Stats */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-blue-50 rounded-xl p-4 text-center">
                      <svg className="w-5 h-5 text-blue-600 mx-auto mb-2">
                        <use href="#bar-chart-3" />
                      </svg>
                      <p
                        className="text-xs text-blue-600 uppercase tracking-wide"
                        style={{ fontFamily: "Slackey, cursive" }}
                      >
                        24h Volume
                      </p>
                      <p
                        className="text-lg text-blue-900"
                        style={{ fontFamily: "Slackey, cursive" }}
                      >
                        {coin.volume24h}
                      </p>
                    </div>
                    <div className="bg-purple-50 rounded-xl p-4 text-center">
                      <svg className="w-5 h-5 text-purple-600 mx-auto mb-2">
                        <use href="#users" />
                      </svg>
                      <p
                        className="text-xs text-purple-600 uppercase tracking-wide"
                        style={{ fontFamily: "Slackey, cursive" }}
                      >
                        Holders
                      </p>
                      <p
                        className="text-lg text-purple-900"
                        style={{ fontFamily: "Slackey, cursive" }}
                      >
                        {coin.holders}
                      </p>
                    </div>
                  </div>

                  {/* Price History */}
                  <div className="bg-gradient-to-r from-green-50 to-red-50 rounded-xl p-4">
                    <h3
                      className="text-lg mb-3 text-center"
                      style={{ fontFamily: "Slackey, cursive" }}
                    >
                      Price History
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center">
                        <p
                          className="text-xs text-green-600 uppercase tracking-wide"
                          style={{ fontFamily: "Slackey, cursive" }}
                        >
                          All Time High
                        </p>
                        <p
                          className="text-lg text-green-900"
                          style={{ fontFamily: "Slackey, cursive" }}
                        >
                          ${coin.allTimeHigh}
                        </p>
                      </div>
                      <div className="text-center">
                        <p
                          className="text-xs text-red-600 uppercase tracking-wide"
                          style={{ fontFamily: "Slackey, cursive" }}
                        >
                          All Time Low
                        </p>
                        <p
                          className="text-lg text-red-900"
                          style={{ fontFamily: "Slackey, cursive" }}
                        >
                          ${coin.allTimeLow}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Supply Info */}
                  <div className="bg-gray-50 rounded-xl p-4">
                    <h3
                      className="text-lg mb-3 text-center"
                      style={{ fontFamily: "Slackey, cursive" }}
                    >
                      Supply Information
                    </h3>
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
                          Circulating:
                        </span>
                        <span
                          className="text-sm"
                          style={{ fontFamily: "Slackey, cursive" }}
                        >
                          {coin.circulatingSupply}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Project Info */}
                  <div className="bg-yellow-50 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <svg className="w-5 h-5 text-yellow-600">
                        <use href="#calendar" />
                      </svg>
                      <h3
                        className="text-lg"
                        style={{ fontFamily: "Slackey, cursive" }}
                      >
                        Project Details
                      </h3>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span
                          className="text-sm text-gray-600"
                          style={{ fontFamily: "Slackey, cursive" }}
                        >
                          Launch Date:
                        </span>
                        <span
                          className="text-sm"
                          style={{ fontFamily: "Slackey, cursive" }}
                        >
                          {coin.launchDate}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span
                          className="text-sm text-gray-600"
                          style={{ fontFamily: "Slackey, cursive" }}
                        >
                          Website:
                        </span>
                        <div className="flex items-center gap-1">
                          <Globe className="w-4 h-4 text-blue-600" />
                          <span
                            className="text-sm text-blue-600"
                            style={{ fontFamily: "Slackey, cursive" }}
                          >
                            {coin.website}
                          </span>
                        </div>
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
                      {coin.about}
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
