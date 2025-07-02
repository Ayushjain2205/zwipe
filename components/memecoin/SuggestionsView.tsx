import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, BookmarkCheck } from "lucide-react";
import { Memecoin } from "./types";

interface SuggestionsViewProps {
  suggestedTokens: Memecoin[];
  bookmarkedCoins: Set<string>;
  onSuggestionClick: (coinId: string) => void;
  onBack: () => void;
}

const SuggestionsView: React.FC<SuggestionsViewProps> = ({
  suggestedTokens,
  bookmarkedCoins,
  onSuggestionClick,
  onBack,
}) => {
  return (
    <Card className="h-full w-full border-4 border-white shadow-2xl bg-white">
      <CardContent className="p-0 h-full">
        <div className="h-full flex flex-col">
          {/* Header */}
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-4 text-white">
            <div className="flex items-center gap-3">
              <button
                onClick={onBack}
                className="bg-white/20 hover:bg-white/30 rounded-full p-2 transition-all duration-200"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div>
                <h2
                  className="text-xl"
                  style={{ fontFamily: "Slackey, cursive" }}
                >
                  CoinCierge
                </h2>
                <p
                  className="text-purple-100 text-sm"
                  style={{ fontFamily: "Slackey, cursive" }}
                >
                  Best coins for you
                </p>
              </div>
            </div>
          </div>

          {/* Grid Content */}
          <div className="flex-1 overflow-y-auto p-4">
            <div className="grid grid-cols-2 gap-3">
              {suggestedTokens.map((coin) => (
                <div
                  key={coin.id}
                  onClick={() => onSuggestionClick(coin.id)}
                  className="relative aspect-[3/4] rounded-2xl overflow-hidden cursor-pointer transition-all duration-200 hover:scale-105 shadow-lg"
                  style={{
                    background: `linear-gradient(135deg, ${
                      coin.color.split(" ")[1]
                    } 0%, ${coin.color.split(" ")[3]} 100%)`,
                  }}
                >
                  {/* Coin Image Background */}
                  <div className="absolute inset-0 bg-black/20">
                    <img
                      src={coin.image || "/placeholder.svg"}
                      alt={coin.name}
                      className="w-full h-full object-cover opacity-30"
                    />
                  </div>

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                  {/* Price Badge */}
                  <div className="absolute top-3 right-3">
                    <Badge
                      variant={coin.change24h > 0 ? "default" : "destructive"}
                      className={`text-xs px-2 py-1 ${
                        coin.change24h > 0
                          ? "bg-lime-400 text-black"
                          : "bg-red-500 text-white"
                      }`}
                      style={{ fontFamily: "Slackey, cursive" }}
                    >
                      {coin.change24h > 0 ? "+" : ""}
                      {coin.change24h}%
                    </Badge>
                  </div>

                  {/* Coin Info */}
                  <div className="absolute bottom-0 left-0 right-0 p-3 text-white">
                    <h3
                      className="text-lg font-bold mb-1"
                      style={{ fontFamily: "Slackey, cursive" }}
                    >
                      {coin.name}
                    </h3>
                    <p
                      className="text-sm opacity-90"
                      style={{ fontFamily: "Slackey, cursive" }}
                    >
                      ${coin.price} • {coin.marketCap} cap
                    </p>
                  </div>

                  {/* Bookmark indicator if bookmarked */}
                  {bookmarkedCoins.has(coin.id) && (
                    <div className="absolute top-3 left-3">
                      <div className="bg-yellow-500 rounded-full p-1">
                        <BookmarkCheck className="w-4 h-4 text-white" />
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* AI Explanation */}
            <div className="mt-6 bg-gray-100 rounded-xl p-4 text-center">
              <p
                className="text-sm text-gray-600"
                style={{ fontFamily: "Slackey, cursive" }}
              >
                Coins picked just for you
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SuggestionsView;
