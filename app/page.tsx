"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { X, Bot, Bookmark, BookmarkCheck, Check, Plus } from "lucide-react";
import { getSuggestedTokens } from "@/components/memecoin/utils";
import { mockMemecoins, Memecoin } from "@/components/memecoin/types";
import MemecoinCard from "@/components/memecoin/MemecoinCard";
import SuggestionsView from "@/components/memecoin/SuggestionsView";
import BuyDialog from "@/components/memecoin/BuyDialog";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import CreateCoinDialog from "@/components/memecoin/CreateCoinDialog";
import Loader from "@/components/ui/Loader";

const colorPalette = [
  "from-pink-400 to-purple-500",
  "from-yellow-400 to-orange-500",
  "from-green-400 to-lime-500",
  "from-blue-400 to-cyan-500",
  "from-indigo-400 to-blue-500",
  "from-red-400 to-pink-500",
  "from-purple-400 to-indigo-500",
];

function assignColorToCoin(coin: Memecoin, index: number): Memecoin {
  const key = coin.id || String(index);
  let hash = 0;
  for (let i = 0; i < key.length; i++) hash += key.charCodeAt(i);
  const color = colorPalette[hash % colorPalette.length];
  return { ...coin, color };
}

export default function MemecoinSwiper() {
  // All hooks at the top, always called
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [memecoins, setMemecoins] = useState<Memecoin[]>([]);
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
  const [showBuyDialog, setShowBuyDialog] = useState(false);
  const [buyAmount, setBuyAmount] = useState("");
  const [showStamp, setShowStamp] = useState<
    "buy" | "pass" | "bookmark" | null
  >(null);
  const [exitAnimation, setExitAnimation] = useState<{
    direction: "left" | "right";
  } | null>(null);
  const [showSplash, setShowSplash] = useState(true);
  const [showCreateDialog, setShowCreateDialog] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    // Fetch real memecoins data from API
    const fetchMemecoins = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/getcoinstop");
        if (!res.ok) throw new Error("Failed to fetch memecoins");
        const data = await res.json();
        setMemecoins(
          Array.isArray(data.coins) ? data.coins.map(assignColorToCoin) : []
        );
      } catch (err) {
        console.error(err);
        setMemecoins(mockMemecoins); // fallback to mock if error
      } finally {
        setLoading(false);
      }
    };
    fetchMemecoins();
  }, []);

  useEffect(() => {
    // Only show splash on mobile
    if (window.innerWidth < 768) {
      const timer = setTimeout(() => setShowSplash(false), 1500);
      return () => clearTimeout(timer);
    } else {
      setShowSplash(false);
    }
  }, []);

  // Show loader until both hydration and data loading are complete
  if (!mounted || loading) {
    return <Loader />;
  }

  const currentCoin = memecoins[currentIndex];
  const suggestedTokens = getSuggestedTokens(currentCoin?.id || "1", memecoins);

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
        setShowBuyDialog(true);
        setIsAnimating(false);
        setShowStamp(null);
      }, 800);
    }
  };

  const completeSwipe = () => {
    setCurrentIndex((prev) => (prev + 1) % memecoins.length);
    setIsAnimating(false);
    setShowStamp(null);
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
    const coinIndex = memecoins.findIndex((coin) => coin.id === coinId);
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

  const cardHeight = isExpanded || showSuggestions ? "660px" : "580px";

  // Splash screen for mobile
  if (showSplash) {
    return (
      <div className=" md:hidden h-screen w-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center relative overflow-hidden">
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
        {/* ZWIPE Logo */}
        <div className="w-full text-center z-10">
          <h1
            className="text-5xl text-white mb-2 drop-shadow-2xl"
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
        </div>
        <style jsx>{`
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

  return (
    <div className="h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Connect Button at top right */}
      <div className="absolute top-4 right-4 z-50">
        <ConnectButton />
      </div>
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
        <div className="text-center mb-6 hidden md:block relative flex items-center justify-center">
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
          {/* Create Button */}
          <button
            onClick={() => setShowCreateDialog(true)}
            className="absolute right-0 top-1/2 -translate-y-1/2 rounded-full p-2 border-2 border-white transition-all duration-300 hover:scale-125 focus:outline-none group bg-gradient-to-br from-lime-400 to-green-500"
            title="Create Coin"
            style={{ marginLeft: 16 }}
          >
            <span className="relative block">
              {/* Plus Icon with funky animation */}
              <Plus
                className="w-7 h-7 z-10 relative text-white transition-transform duration-300 group-hover:rotate-180 group-hover:scale-125"
                strokeWidth={3}
              />
            </span>
          </button>
        </div>

        {/* Card Stack */}
        <div className="relative mb-4" style={{ height: cardHeight }}>
          {/* Background cards for stack effect - only show when not expanded or showing suggestions */}
          {!isExpanded &&
            !showSuggestions &&
            memecoins
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
            <SuggestionsView
              suggestedTokens={suggestedTokens}
              bookmarkedCoins={bookmarkedCoins}
              onSuggestionClick={handleSuggestionClick}
              onBack={toggleSuggestions}
            />
          )}

          {/* Main card - only show when not showing suggestions */}
          {!showSuggestions && (
            <MemecoinCard
              coin={currentCoin}
              isExpanded={isExpanded}
              getCardStyle={getCardStyle}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              onToggleExpanded={toggleExpanded}
            />
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
          <div className="flex justify-center items-center gap-3 md:gap-6">
            {/* CoinCierge Button */}
            <button
              onClick={toggleSuggestions}
              className="w-14 h-14 md:w-20 md:h-20 rounded-full border-6 border-white bg-gradient-to-br from-purple-500 to-purple-700 hover:from-purple-600 hover:to-purple-800 backdrop-blur-sm transition-all duration-200 shadow-2xl transform hover:scale-110 flex items-center justify-center relative overflow-hidden"
              title="CoinCierge AI Suggestions"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400/20 to-pink-400/20 animate-pulse"></div>
              <Bot
                className="w-7 h-7 md:w-8 md:h-8 text-white mx-auto relative z-10 drop-shadow-lg"
                strokeWidth={3}
              />
            </button>

            {/* Pass Button */}
            <Button
              size="lg"
              className="w-14 h-14 md:w-20 md:h-20 rounded-full border-6 border-white bg-gradient-to-br from-red-500 to-red-700 hover:from-red-600 hover:to-red-800 text-white shadow-2xl transform hover:scale-110 transition-all duration-200 flex items-center justify-center p-0 relative overflow-hidden"
              onClick={() => handleSwipe("left")}
              disabled={isAnimating}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-red-400/20 to-orange-400/20 animate-pulse"></div>
              <X
                className="w-7 h-7 md:w-full md:h-full z-10 drop-shadow-lg scale-110 md:scale-125 mx-auto my-auto"
                strokeWidth={4}
              />
            </Button>

            {/* Buy Button */}
            <Button
              size="lg"
              className="w-14 h-14 md:w-20 md:h-20 rounded-full border-6 border-white bg-gradient-to-br from-lime-400 to-green-500 hover:from-lime-300 hover:to-green-400 text-black shadow-2xl transform hover:scale-110 transition-all duration-200 flex items-center justify-center p-0 relative overflow-hidden"
              onClick={() => handleSwipe("right")}
              disabled={isAnimating}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-300/30 to-lime-300/30 animate-pulse"></div>
              <Check
                className="w-7 h-7 md:w-full md:h-full z-10 drop-shadow-lg scale-110 md:scale-125 mx-auto my-auto"
                strokeWidth={4}
              />
            </Button>

            {/* Bookmark Button */}
            <button
              onClick={toggleBookmark}
              className={`w-14 h-14 md:w-20 md:h-20 rounded-full border-6 border-white backdrop-blur-sm transition-all duration-200 shadow-2xl transform hover:scale-110 flex items-center justify-center relative overflow-hidden ${
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
                  className="w-7 h-7 md:w-8 md:h-8 text-white relative z-10 drop-shadow-lg"
                  strokeWidth={3}
                />
              ) : (
                <Bookmark
                  className="w-7 h-7 md:w-8 md:h-8 text-white relative z-10 drop-shadow-lg"
                  strokeWidth={3}
                />
              )}
            </button>
          </div>
        )}

        {/* Buy Amount Dialog */}
        <BuyDialog
          open={showBuyDialog}
          onOpenChange={setShowBuyDialog}
          coin={currentCoin}
          buyAmount={buyAmount}
          onBuyAmountChange={(e) => setBuyAmount(e.target.value)}
          onBuyConfirm={handleBuyConfirm}
          onBuyCancel={handleBuyCancel}
        />

        {/* Create Coin Dialog */}
        <CreateCoinDialog
          open={showCreateDialog}
          onOpenChange={setShowCreateDialog}
        />
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
