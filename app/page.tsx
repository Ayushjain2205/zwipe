"use client";

import type React from "react";

import { useState, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  X,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Zap,
  Flame,
  ChevronUp,
  ChevronDown,
  Calendar,
  Users,
  Globe,
  BarChart3,
  Bot,
  Bookmark,
  BookmarkCheck,
  ArrowLeft,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface Memecoin {
  id: string;
  name: string;
  symbol: string;
  price: number;
  change24h: number;
  marketCap: string;
  image: string;
  description: string;
  color: string;
  // Additional details for expanded view
  volume24h: string;
  totalSupply: string;
  circulatingSupply: string;
  allTimeHigh: number;
  allTimeLow: number;
  launchDate: string;
  website: string;
  holders: string;
  about: string;
}

const mockMemecoins: Memecoin[] = [
  {
    id: "1",
    name: "DogeCoin",
    symbol: "DOGE",
    price: 0.08,
    change24h: 5.2,
    marketCap: "$11.2B",
    image: "/placeholder.svg?height=200&width=200",
    description:
      "Much wow, very currency! The original meme coin that started it all. 🚀",
    color: "from-yellow-400 to-orange-500",
    volume24h: "$892M",
    totalSupply: "146.78B DOGE",
    circulatingSupply: "146.78B DOGE",
    allTimeHigh: 0.7376,
    allTimeLow: 0.00008547,
    launchDate: "December 6, 2013",
    website: "dogecoin.com",
    holders: "4.2M+",
    about:
      "Dogecoin started as a joke based on the popular 'Doge' meme featuring a Shiba Inu. Created by Billy Markus and Jackson Palmer, it has become one of the most well-known cryptocurrencies. Despite its humorous origins, Dogecoin has gained serious adoption and is used for tipping, charitable donations, and even accepted by some major companies like Tesla for merchandise purchases.",
  },
  {
    id: "2",
    name: "Shiba Inu",
    symbol: "SHIB",
    price: 0.000008,
    change24h: -2.1,
    marketCap: "$4.7B",
    image: "/placeholder.svg?height=200&width=200",
    description: "The Dogecoin killer with a loyal pack of holders. Woof! 🐕",
    color: "from-orange-400 to-red-500",
    volume24h: "$234M",
    totalSupply: "999.98T SHIB",
    circulatingSupply: "589.29T SHIB",
    allTimeHigh: 0.00008845,
    allTimeLow: 0.000000000056,
    launchDate: "August 1, 2020",
    website: "shibatoken.com",
    holders: "1.3M+",
    about:
      "Shiba Inu is a decentralized meme token that grew into a vibrant ecosystem. The SHIB token is the cornerstone of the Shiba Inu ecosystem, which includes ShibaSwap (DEX), Shibarium (Layer 2), and various NFT projects. The community-driven project aims to be an Ethereum-based alternative to Dogecoin.",
  },
  {
    id: "3",
    name: "Pepe",
    symbol: "PEPE",
    price: 0.000001,
    change24h: 12.8,
    marketCap: "$420M",
    image: "/placeholder.svg?height=200&width=200",
    description: "Feels good man! The rarest pepe in crypto form. 🐸",
    color: "from-green-400 to-emerald-600",
    volume24h: "$89M",
    totalSupply: "420.69T PEPE",
    circulatingSupply: "420.69T PEPE",
    allTimeHigh: 0.000001717,
    allTimeLow: 0.000000027,
    launchDate: "April 17, 2023",
    website: "pepetoken.com",
    holders: "216K+",
    about:
      "PEPE is a deflationary memecoin launched on Ethereum. The currency was created as a tribute to the Pepe the Frog internet meme, created by Matt Furie, which gained popularity in the early 2000s. The project aims to capitalize on the popularity of meme coins, like Shiba Inu and Dogecoin, and strives to establish itself as one of the top meme-based cryptocurrencies.",
  },
  {
    id: "4",
    name: "Floki",
    symbol: "FLOKI",
    price: 0.00015,
    change24h: 8.4,
    marketCap: "$1.4B",
    image: "/placeholder.svg?height=200&width=200",
    description: "Named after Elon's dog, ready to go to Valhalla! ⚔️",
    color: "from-purple-400 to-pink-500",
    volume24h: "$67M",
    totalSupply: "10T FLOKI",
    circulatingSupply: "9.6T FLOKI",
    allTimeHigh: 0.00034026,
    allTimeLow: 0.000000356,
    launchDate: "June 25, 2021",
    website: "floki.com",
    holders: "485K+",
    about:
      "Floki Inu is a meme coin inspired by Elon Musk's Shiba Inu named Floki. The project has evolved beyond a simple meme coin to include utility features like Valhalla (NFT gaming metaverse), FlokiFi (DeFi ecosystem), and FlokiPlaces (NFT and merchandise marketplace). The project aims to be the most known and most used cryptocurrency in the world.",
  },
  {
    id: "5",
    name: "SafeMoon",
    symbol: "SAFEMOON",
    price: 0.0003,
    change24h: -15.2,
    marketCap: "$180M",
    image: "/placeholder.svg?height=200&width=200",
    description: "To the moon safely! Reflections for diamond hands. 💎🙌",
    color: "from-blue-400 to-cyan-500",
    volume24h: "$12M",
    totalSupply: "1T SAFEMOON",
    circulatingSupply: "585B SAFEMOON",
    allTimeHigh: 0.00001399,
    allTimeLow: 0.0000002,
    launchDate: "March 8, 2021",
    website: "safemoon.net",
    holders: "2.9M+",
    about:
      "SafeMoon is a DeFi token that encourages holding through its tokenomics. Every transaction incurs a 10% fee: 5% is redistributed to existing holders, and 5% is added to the liquidity pool. This mechanism rewards long-term holders while penalizing sellers. The project also includes SafeMoon Wallet, SafeMoon Exchange, and various other ecosystem products.",
  },
];

// Mock suggested tokens based on current coin
const getSuggestedTokens = (currentCoinId: string): Memecoin[] => {
  const suggestions: { [key: string]: string[] } = {
    "1": ["2", "4"], // DOGE -> SHIB, FLOKI
    "2": ["1", "3"], // SHIB -> DOGE, PEPE
    "3": ["2", "5"], // PEPE -> SHIB, SAFEMOON
    "4": ["1", "2"], // FLOKI -> DOGE, SHIB
    "5": ["3", "4"], // SAFEMOON -> PEPE, FLOKI
  };

  const suggestedIds = suggestions[currentCoinId] || ["1", "2"];
  return mockMemecoins.filter((coin) => suggestedIds.includes(coin.id));
};

export default function MemecoinSwiper() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [bookmarkedCoins, setBookmarkedCoins] = useState<Set<string>>(
    new Set()
  );
  const cardRef = useRef<HTMLDivElement>(null);

  const [showBuyDialog, setShowBuyDialog] = useState(false);
  const [buyAmount, setBuyAmount] = useState("");
  const [showStamp, setShowStamp] = useState<
    "buy" | "pass" | "bookmark" | null
  >(null);
  const [pendingAction, setPendingAction] = useState<"buy" | "pass" | null>(
    null
  );
  const [exitAnimation, setExitAnimation] = useState<{
    direction: "left" | "right";
  } | null>(null);

  const currentCoin = mockMemecoins[currentIndex];
  const suggestedTokens = getSuggestedTokens(currentCoin?.id || "1");

  const handleSwipe = (direction: "left" | "right") => {
    if (isAnimating || isExpanded || showSuggestions) return;

    setIsAnimating(true);
    setShowStamp(direction === "right" ? "buy" : "pass");

    if (direction === "left") {
      setTimeout(() => {
        setExitAnimation({ direction: "left" });
        setTimeout(() => {
          console.log(`Passed on ${currentCoin.symbol}`);
          completeSwipe();
        }, 600);
      }, 800);
    } else {
      setTimeout(() => {
        setPendingAction("buy");
        setShowBuyDialog(true);
        setIsAnimating(false);
        setShowStamp(null);
      }, 800);
    }
  };

  const completeSwipe = () => {
    setCurrentIndex((prev) => (prev + 1) % mockMemecoins.length);
    setIsAnimating(false);
    setShowStamp(null);
    setPendingAction(null);
    setExitAnimation(null);
    setDragOffset({ x: 0, y: 0 });
    setIsExpanded(false);
    setShowSuggestions(false);
  };

  const handleBuyConfirm = () => {
    if (!buyAmount || Number.parseFloat(buyAmount) <= 0) return;

    console.log(`Buying $${buyAmount} worth of ${currentCoin.symbol}!`);
    setShowBuyDialog(false);
    setBuyAmount("");
    completeSwipe();
  };

  const handleBuyCancel = () => {
    setShowBuyDialog(false);
    setBuyAmount("");
    setIsAnimating(false);
    setShowStamp(null);
    setPendingAction(null);
    setDragOffset({ x: 0, y: 0 });
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (isExpanded || showSuggestions) return;
    setIsDragging(true);
    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || isExpanded || showSuggestions) return;

    const deltaX = e.clientX - dragStart.x;
    const deltaY = e.clientY - dragStart.y;
    setDragOffset({ x: deltaX, y: deltaY });
  };

  const handleMouseUp = () => {
    if (!isDragging || isExpanded || showSuggestions) return;

    setIsDragging(false);

    if (Math.abs(dragOffset.x) > 100) {
      handleSwipe(dragOffset.x > 0 ? "right" : "left");
    } else {
      setDragOffset({ x: 0, y: 0 });
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (isExpanded || showSuggestions) return;
    const touch = e.touches[0];
    setIsDragging(true);
    setDragStart({ x: touch.clientX, y: touch.clientY });
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || isExpanded || showSuggestions) return;

    const touch = e.touches[0];
    const deltaX = touch.clientX - dragStart.x;
    const deltaY = touch.clientY - dragStart.y;
    setDragOffset({ x: deltaX, y: deltaY });
  };

  const handleTouchEnd = () => {
    if (!isDragging || isExpanded || showSuggestions) return;

    setIsDragging(false);

    if (Math.abs(dragOffset.x) > 100) {
      handleSwipe(dragOffset.x > 0 ? "right" : "left");
    } else {
      setDragOffset({ x: 0, y: 0 });
    }
  };

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  const toggleSuggestions = () => {
    setShowSuggestions(!showSuggestions);
    setIsExpanded(false); // Close expanded view when showing suggestions
  };

  const handleSuggestionClick = (coinId: string) => {
    const coinIndex = mockMemecoins.findIndex((coin) => coin.id === coinId);
    if (coinIndex !== -1) {
      setCurrentIndex(coinIndex);
      setShowSuggestions(false);
      setIsExpanded(true); // Open expanded view for the selected coin
    }
  };

  const toggleBookmark = () => {
    const newBookmarks = new Set(bookmarkedCoins);
    if (newBookmarks.has(currentCoin.id)) {
      newBookmarks.delete(currentCoin.id);
      console.log(`Removed ${currentCoin.symbol} from bookmarks`);
    } else {
      newBookmarks.add(currentCoin.id);
      console.log(`Added ${currentCoin.symbol} to bookmarks`);

      // Show bookmark stamp
      setShowStamp("bookmark");
      setTimeout(() => {
        setShowStamp(null);
      }, 1500);
    }
    setBookmarkedCoins(newBookmarks);
  };

  if (!currentCoin) return null;

  const getCardStyle = () => {
    if (exitAnimation) {
      return {
        transform: `translateX(${
          exitAnimation.direction === "left" ? "-100vw" : "100vw"
        }) rotate(${exitAnimation.direction === "left" ? "-30deg" : "30deg"})`,
        opacity: 0,
        transition: "all 0.6s ease-out",
        zIndex: 20,
      };
    }

    if (isDragging && !isExpanded && !showSuggestions) {
      return {
        transform: `translateX(${dragOffset.x}px) translateY(${
          dragOffset.y
        }px) rotate(${dragOffset.x * 0.1}deg)`,
        zIndex: 20,
      };
    }

    return {
      transform: "none",
      zIndex: 20,
    };
  };

  const cardHeight =
    isExpanded || showSuggestions ? "calc(100vh - 120px)" : "580px";

  return (
    <div className="h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Grid Background */}
      <div className="absolute inset-0 opacity-20">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
        linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
        linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
      `,
            backgroundSize: "50px 50px",
            animation: "grid-move 20s linear infinite",
          }}
        ></div>
      </div>

      {/* Neon Glow Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-20 right-20 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-cyan-500/15 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-1/4 left-10 w-2 h-2 bg-blue-400 rounded-full animate-bounce"
          style={{ animationDelay: "0s", animationDuration: "3s" }}
        ></div>
        <div
          className="absolute top-1/3 right-16 w-1 h-1 bg-purple-400 rounded-full animate-bounce"
          style={{ animationDelay: "1s", animationDuration: "4s" }}
        ></div>
        <div
          className="absolute bottom-1/4 left-1/4 w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce"
          style={{ animationDelay: "2s", animationDuration: "5s" }}
        ></div>
        <div
          className="absolute bottom-1/3 right-1/3 w-1 h-1 bg-indigo-400 rounded-full animate-bounce"
          style={{ animationDelay: "3s", animationDuration: "3.5s" }}
        ></div>
      </div>

      <div className="w-full max-w-sm mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-6">
          <h1
            className="text-4xl text-white mb-2 drop-shadow-2xl"
            style={{
              fontFamily: "Slackey, cursive",
              textShadow: "0 0 20px rgba(59, 130, 246, 0.5)",
            }}
          >
            Z
            <span
              className="text-blue-400"
              style={{ textShadow: "0 0 20px rgba(59, 130, 246, 0.8)" }}
            >
              WIPE
            </span>
          </h1>
          <div className="flex items-center justify-center gap-2 text-blue-100 font-medium">
            <Zap className="w-4 h-4 text-blue-400" />
            <span style={{ fontFamily: "Slackey, cursive" }}>
              {showSuggestions
                ? "AI Suggestions for you"
                : "Swipe right to buy, left to pass"}
            </span>
            <Flame className="w-4 h-4 text-purple-400" />
          </div>
        </div>

        {/* Card Stack */}
        <div className="relative mb-4" style={{ height: cardHeight }}>
          {/* Background cards for stack effect - only show when not expanded or showing suggestions */}
          {!isExpanded &&
            !showSuggestions &&
            mockMemecoins
              .slice(currentIndex + 1, currentIndex + 3)
              .map((coin, index) => (
                <Card
                  key={coin.id}
                  className="absolute inset-0 border-4 border-white/20 transition-all duration-500 ease-out shadow-2xl"
                  style={{
                    transform: `scale(${0.95 - index * 0.05}) translateY(${
                      index * 12
                    }px)`,
                    zIndex: 10 - index,
                    background: `linear-gradient(135deg, ${
                      coin.color.split(" ")[1]
                    } 0%, ${coin.color.split(" ")[3]} 100%)`,
                    opacity: 0.7 - index * 0.2,
                  }}
                >
                  <CardContent className="p-0 h-full">
                    <div className="h-full flex flex-col">
                      <div className="flex-1 bg-black/10 rounded-t-lg"></div>
                    </div>
                  </CardContent>
                </Card>
              ))}

          {/* Suggestions View */}
          {showSuggestions && (
            <Card className="absolute inset-0 border-4 border-white shadow-2xl bg-white">
              <CardContent className="p-0 h-full">
                <div className="h-full flex flex-col">
                  {/* Header */}

                  <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-4 text-white">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={toggleSuggestions}
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
                      {suggestedTokens.map((coin, index) => (
                        <div
                          key={coin.id}
                          onClick={() => handleSuggestionClick(coin.id)}
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
                              variant={
                                coin.change24h > 0 ? "default" : "destructive"
                              }
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
          )}

          {/* Main card - only show when not showing suggestions */}
          {!showSuggestions && (
            <Card
              ref={cardRef}
              className="absolute inset-0 border-4 border-white cursor-grab active:cursor-grabbing shadow-2xl transition-all duration-300"
              style={{
                ...getCardStyle(),
                background: `linear-gradient(135deg, ${
                  currentCoin.color.split(" ")[1]
                } 0%, ${currentCoin.color.split(" ")[3]} 100%)`,
                cursor: isExpanded ? "default" : "grab",
              }}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
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
                    <img
                      src={currentCoin.image || "/placeholder.svg"}
                      alt={currentCoin.name}
                      className={`${
                        isExpanded ? "w-24 h-24" : "w-40 h-40"
                      } rounded-full border-6 border-white shadow-2xl relative z-10 transition-all duration-300`}
                    />
                    <div className="absolute top-4 right-4 z-10">
                      <Badge
                        variant={
                          currentCoin.change24h > 0 ? "default" : "destructive"
                        }
                        className={`text-lg px-3 py-1 ${
                          currentCoin.change24h > 0
                            ? "bg-lime-400 text-black hover:bg-lime-300"
                            : "bg-red-500 text-white hover:bg-red-600"
                        }`}
                        style={{ fontFamily: "Slackey, cursive" }}
                      >
                        {currentCoin.change24h > 0 ? (
                          <TrendingUp className="w-4 h-4 mr-1" />
                        ) : (
                          <TrendingDown className="w-4 h-4 mr-1" />
                        )}
                        {currentCoin.change24h > 0 ? "+" : ""}
                        {currentCoin.change24h}%
                      </Badge>
                    </div>

                    {/* Expand/Collapse Button */}
                    <button
                      onClick={toggleExpanded}
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
                          {currentCoin.name}
                        </h2>
                        <p
                          className={`${
                            isExpanded ? "text-lg" : "text-xl"
                          } text-gray-600 transition-all duration-300`}
                          style={{ fontFamily: "Slackey, cursive" }}
                        >
                          {currentCoin.symbol}
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
                            ${currentCoin.price}
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
                            {currentCoin.marketCap}
                          </p>
                        </div>
                      </div>

                      <p
                        className="text-gray-700 text-center leading-relaxed"
                        style={{ fontFamily: "Slackey, cursive" }}
                      >
                        {currentCoin.description}
                      </p>

                      {/* Expanded Details */}
                      {isExpanded && (
                        <div className="space-y-6 mt-6">
                          {/* Additional Stats */}
                          <div className="grid grid-cols-2 gap-4">
                            <div className="bg-blue-50 rounded-xl p-4 text-center">
                              <BarChart3 className="w-5 h-5 text-blue-600 mx-auto mb-2" />
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
                                {currentCoin.volume24h}
                              </p>
                            </div>
                            <div className="bg-purple-50 rounded-xl p-4 text-center">
                              <Users className="w-5 h-5 text-purple-600 mx-auto mb-2" />
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
                                {currentCoin.holders}
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
                                  ${currentCoin.allTimeHigh}
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
                                  ${currentCoin.allTimeLow}
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
                                  {currentCoin.totalSupply}
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
                                  {currentCoin.circulatingSupply}
                                </span>
                              </div>
                            </div>
                          </div>

                          {/* Project Info */}
                          <div className="bg-yellow-50 rounded-xl p-4">
                            <div className="flex items-center gap-2 mb-3">
                              <Calendar className="w-5 h-5 text-yellow-600" />
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
                                  {currentCoin.launchDate}
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
                                    {currentCoin.website}
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
                              About {currentCoin.name}
                            </h3>
                            <p
                              className="text-sm text-gray-700 leading-relaxed"
                              style={{ fontFamily: "Slackey, cursive" }}
                            >
                              {currentCoin.about}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Swipe indicators - only show when not expanded and not showing suggestions */}
          {isDragging && !isExpanded && !showSuggestions && (
            <>
              <div
                className="absolute top-20 left-8 bg-red-500 text-white px-6 py-3 rounded-full text-lg transform -rotate-12 transition-opacity shadow-lg border-4 border-white"
                style={{
                  opacity: dragOffset.x < -50 ? 1 : 0,
                  fontFamily: "Slackey, cursive",
                }}
              >
                NOPE!
              </div>
              <div
                className="absolute top-20 right-8 bg-lime-400 text-black px-6 py-3 rounded-full text-lg transform rotate-12 transition-opacity shadow-lg border-4 border-white"
                style={{
                  opacity: dragOffset.x > 50 ? 1 : 0,
                  fontFamily: "Slackey, cursive",
                }}
              >
                BUY!
              </div>
            </>
          )}

          {/* Stamp Effects */}
          {showStamp && (
            <div
              className="absolute inset-0 flex items-center justify-center pointer-events-none z-30"
              style={{
                opacity: exitAnimation ? 0 : 1,
                transition: exitAnimation ? "opacity 0.6s ease-out" : "none",
              }}
            >
              <div
                className={`
        text-7xl px-12 py-6 border-8 rounded-2xl transform rotate-12 animate-pulse shadow-2xl
        ${
          showStamp === "buy"
            ? "text-lime-400 border-lime-400 bg-lime-50"
            : showStamp === "pass"
            ? "text-red-500 border-red-500 bg-red-50"
            : "text-yellow-500 border-yellow-500 bg-yellow-50"
        }
      `}
                style={{
                  fontFamily: "Slackey, cursive",
                  textShadow: "4px 4px 0px rgba(0,0,0,0.3)",
                  animation: "stamp 0.8s ease-out",
                }}
              >
                {showStamp === "buy"
                  ? "BOUGHT!"
                  : showStamp === "pass"
                  ? "PASSED!"
                  : "SAVED!"}
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons - only show when not expanded and not showing suggestions */}
        {!isExpanded && !showSuggestions && (
          <div className="flex justify-center items-center gap-6">
            {/* CoinCierge Button */}
            <button
              onClick={toggleSuggestions}
              className="w-20 h-20 rounded-full border-6 border-white bg-gradient-to-br from-purple-500 to-purple-700 hover:from-purple-600 hover:to-purple-800 backdrop-blur-sm transition-all duration-200 shadow-2xl transform hover:scale-110 flex items-center justify-center relative overflow-hidden"
              title="CoinCierge AI Suggestions"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400/20 to-pink-400/20 animate-pulse"></div>
              <Bot
                className="w-8 h-8 text-white mx-auto relative z-10 drop-shadow-lg"
                strokeWidth={3}
              />
            </button>

            {/* Pass Button */}
            <Button
              size="lg"
              className="w-20 h-20 rounded-full border-6 border-white bg-gradient-to-br from-red-500 to-red-700 hover:from-red-600 hover:to-red-800 text-white shadow-2xl transform hover:scale-110 transition-all duration-200 flex items-center justify-center p-0 relative overflow-hidden"
              onClick={() => handleSwipe("left")}
              disabled={isAnimating}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-red-400/20 to-orange-400/20 animate-pulse"></div>
              <X
                className="w-8 h-8 relative z-10 drop-shadow-lg"
                strokeWidth={4}
              />
            </Button>

            {/* Buy Button */}
            <Button
              size="lg"
              className="w-20 h-20 rounded-full border-6 border-white bg-gradient-to-br from-lime-400 to-green-500 hover:from-lime-300 hover:to-green-400 text-black shadow-2xl transform hover:scale-110 transition-all duration-200 flex items-center justify-center p-0 relative overflow-hidden"
              onClick={() => handleSwipe("right")}
              disabled={isAnimating}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-300/30 to-lime-300/30 animate-pulse"></div>
              <DollarSign
                className="w-8 h-8 relative z-10 drop-shadow-lg"
                strokeWidth={4}
              />
            </Button>

            {/* Bookmark Button */}
            <button
              onClick={toggleBookmark}
              className={`w-20 h-20 rounded-full border-6 border-white backdrop-blur-sm transition-all duration-200 shadow-2xl transform hover:scale-110 flex items-center justify-center relative overflow-hidden ${
                bookmarkedCoins.has(currentCoin.id)
                  ? "bg-gradient-to-br from-yellow-400 to-orange-500 hover:from-yellow-300 hover:to-orange-400"
                  : "bg-gradient-to-br from-gray-600 to-gray-800 hover:from-gray-500 hover:to-gray-700"
              }`}
              title={
                bookmarkedCoins.has(currentCoin.id)
                  ? "Remove from bookmarks"
                  : "Save for later"
              }
            >
              <div
                className={`absolute inset-0 animate-pulse ${
                  bookmarkedCoins.has(currentCoin.id)
                    ? "bg-gradient-to-r from-yellow-300/20 to-orange-300/20"
                    : "bg-gradient-to-r from-gray-400/20 to-gray-600/20"
                }`}
              ></div>
              {bookmarkedCoins.has(currentCoin.id) ? (
                <BookmarkCheck
                  className="w-8 h-8 text-white relative z-10 drop-shadow-lg"
                  strokeWidth={3}
                />
              ) : (
                <Bookmark
                  className="w-8 h-8 text-white relative z-10 drop-shadow-lg"
                  strokeWidth={3}
                />
              )}
            </button>
          </div>
        )}

        {/* Buy Amount Dialog */}
        <Dialog open={showBuyDialog} onOpenChange={setShowBuyDialog}>
          <DialogContent className="sm:max-w-md bg-white border-4 border-gray-200">
            <DialogHeader>
              <DialogTitle
                className="flex items-center gap-3 text-2xl"
                style={{ fontFamily: "Slackey, cursive" }}
              >
                <img
                  src={currentCoin?.image || "/placeholder.svg"}
                  alt={currentCoin?.name}
                  className="w-10 h-10 rounded-full border-2 border-gray-300"
                />
                BUY {currentCoin?.name}
              </DialogTitle>
            </DialogHeader>

            <div className="space-y-6 py-4">
              <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-4 rounded-xl border-2 border-gray-200">
                <div className="flex justify-between items-center mb-3">
                  <span
                    className="text-sm text-gray-600 uppercase tracking-wide"
                    style={{ fontFamily: "Slackey, cursive" }}
                  >
                    Current Price:
                  </span>
                  <span
                    className="text-xl"
                    style={{ fontFamily: "Slackey, cursive" }}
                  >
                    ${currentCoin?.price}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span
                    className="text-sm text-gray-600 uppercase tracking-wide"
                    style={{ fontFamily: "Slackey, cursive" }}
                  >
                    24h Change:
                  </span>
                  <span
                    className={`text-xl ${
                      currentCoin?.change24h && currentCoin.change24h > 0
                        ? "text-lime-600"
                        : "text-red-600"
                    }`}
                    style={{ fontFamily: "Slackey, cursive" }}
                  >
                    {currentCoin?.change24h && currentCoin.change24h > 0
                      ? "+"
                      : ""}
                    {currentCoin?.change24h}%
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                <Label
                  htmlFor="amount"
                  className="text-lg text-gray-700"
                  style={{ fontFamily: "Slackey, cursive" }}
                >
                  Amount to invest (USD)
                </Label>
                <Input
                  id="amount"
                  type="number"
                  placeholder="Enter amount..."
                  value={buyAmount}
                  onChange={(e) => setBuyAmount(e.target.value)}
                  min="0"
                  step="0.01"
                  className="text-lg border-2 border-gray-300 rounded-xl p-4 focus:border-lime-400"
                  style={{ fontFamily: "Slackey, cursive" }}
                />
                {buyAmount &&
                  Number.parseFloat(buyAmount) > 0 &&
                  currentCoin && (
                    <p
                      className="text-sm text-gray-600 bg-lime-50 p-3 rounded-lg border border-lime-200"
                      style={{ fontFamily: "Slackey, cursive" }}
                    >
                      You'll get approximately{" "}
                      <span className="text-lime-700">
                        {(
                          Number.parseFloat(buyAmount) / currentCoin.price
                        ).toLocaleString()}
                      </span>{" "}
                      <span>{currentCoin.symbol}</span>
                    </p>
                  )}
              </div>
            </div>

            <DialogFooter className="gap-3">
              <Button
                variant="outline"
                onClick={handleBuyCancel}
                className="border-2 border-gray-300 hover:bg-gray-100 bg-transparent"
                style={{ fontFamily: "Slackey, cursive" }}
              >
                Cancel
              </Button>
              <Button
                onClick={handleBuyConfirm}
                disabled={!buyAmount || Number.parseFloat(buyAmount) <= 0}
                className="bg-lime-400 hover:bg-lime-300 text-black border-2 border-lime-500"
                style={{ fontFamily: "Slackey, cursive" }}
              >
                BUY ${buyAmount || "0"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      <style jsx>{`
        @keyframes stamp {
          0% {
            transform: scale(0) rotate(12deg);
            opacity: 0;
          }
          50% {
            transform: scale(1.2) rotate(12deg);
            opacity: 1;
          }
          100% {
            transform: scale(1) rotate(12deg);
            opacity: 1;
          }
        }
        @keyframes grid-move {
          0% {
            transform: translate(0, 0);
          }
          100% {
            transform: translate(50px, 50px);
          }
        }
      `}</style>
    </div>
  );
}
