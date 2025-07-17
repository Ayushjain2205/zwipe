import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { Memecoin } from "./types";
import { tradeCoin } from "@zoralabs/coins-sdk";
import { parseEther, createWalletClient, custom, type Address } from "viem";
import { useAccount, useWalletClient, usePublicClient } from "wagmi";
import { base } from "viem/chains";

interface BuyDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  coin: Memecoin;
  onBuySuccess: () => void;
}

const BuyDialog: React.FC<BuyDialogProps> = ({
  open,
  onOpenChange,
  coin,
  onBuySuccess,
}) => {
  const [buyAmount, setBuyAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { address } = useAccount();
  const { data: walletClient } = useWalletClient();
  const publicClient = usePublicClient();

  const handleBuy = async () => {
    setError(null);
    if (!buyAmount || Number.parseFloat(buyAmount) <= 0) {
      setError("Please enter a valid amount.");
      return;
    }
    if (!address || !walletClient || !publicClient) {
      setError("Wallet not connected");
      return;
    }
    setLoading(true);
    try {
      const viemWalletClient = createWalletClient({
        chain: base,
        transport: custom(walletClient.transport),
        account: address,
      });
      const tradeParameters = {
        sell: { type: "eth" as const },
        buy: {
          type: "erc20" as const,
          address: coin.address as Address,
        },
        amountIn: parseEther(buyAmount),
        slippage: 0.05,
        sender: address,
      };
      await tradeCoin({
        tradeParameters,
        walletClient: viemWalletClient,
        account: viemWalletClient.account,
        publicClient,
      });
      setLoading(false);
      setBuyAmount("");
      setError(null);
      onBuySuccess();
    } catch (err: any) {
      if (err?.message?.toLowerCase().includes("user rejected")) {
        setError("Transaction rejected by user.");
      } else {
        setError(err?.message || "Transaction failed");
      }
      setLoading(false);
    }
  };

  const handleClose = () => {
    setBuyAmount("");
    setError(null);
    setLoading(false);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md bg-white border-4 border-gray-200">
        <DialogHeader>
          <DialogTitle
            className="flex items-center gap-3 text-2xl"
            style={{ fontFamily: "Slackey, cursive" }}
          >
            <img
              src={
                coin?.creatorProfile?.avatar?.previewImage?.medium ||
                "/placeholder.svg"
              }
              alt={coin?.name}
              className="w-10 h-10 rounded-full border-2 border-gray-300 object-cover"
              width={40}
              height={40}
            />
            BUY {coin?.name}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-4 rounded-xl border-2 border-gray-200">
            <div className="flex justify-between items-center mb-3">
              <span
                className="text-sm text-blue-600 uppercase tracking-wide"
                style={{ fontFamily: "Slackey, cursive" }}
              >
                24h Volume:
              </span>
              <span
                className="text-xl text-blue-900"
                style={{ fontFamily: "Slackey, cursive" }}
              >
                {coin?.volume24h}
              </span>
            </div>
            {/* 24h Change Row (from marketCapDelta24h) */}
            <div className="flex justify-between items-center">
              <span
                className="text-sm text-gray-600 uppercase tracking-wide"
                style={{ fontFamily: "Slackey, cursive" }}
              >
                24h Change:
              </span>
              <span
                className={`text-xl ${
                  Number(coin.marketCapDelta24h) > 0
                    ? "text-lime-600"
                    : "text-red-600"
                }`}
                style={{ fontFamily: "Slackey, cursive" }}
              >
                {Number(coin.marketCapDelta24h) > 0 ? "+" : ""}
                {Math.floor(Number(coin.marketCapDelta24h))}%
              </span>
            </div>
          </div>

          <div className="space-y-3">
            <Label
              htmlFor="amount"
              className="text-lg text-gray-700"
              style={{ fontFamily: "Slackey, cursive" }}
            >
              Amount to invest (ETH)
            </Label>
            <Input
              id="amount"
              type="number"
              placeholder="Enter amount in ETH..."
              value={buyAmount}
              onChange={(e) => setBuyAmount(e.target.value)}
              min="0"
              step="0.0001"
              className="text-lg border-2 border-gray-300 rounded-xl p-4 focus:border-lime-400"
              style={{ fontFamily: "Slackey, cursive" }}
              disabled={loading}
            />
            {/* ETH Quick-select Pills */}
            <div className="flex gap-2 mt-2">
              {["0.001", "0.005", "0.02"].map((amt) => (
                <button
                  key={amt}
                  type="button"
                  onClick={() => setBuyAmount(amt)}
                  className={`px-4 py-1 rounded-full border-2 transition text-base font-semibold focus:outline-none focus:ring-2 focus:ring-lime-400 ${
                    buyAmount === amt
                      ? "bg-lime-400 border-lime-500 text-black"
                      : "bg-white border-gray-300 text-gray-700 hover:bg-gray-100"
                  }`}
                  style={{ fontFamily: "Slackey, cursive" }}
                  disabled={loading}
                >
                  {amt} ETH
                </button>
              ))}
            </div>
          </div>
          {error && (
            <div
              className="text-red-600 text-center font-semibold"
              style={{ fontFamily: "Slackey, cursive" }}
            >
              {error}
            </div>
          )}
        </div>

        <DialogFooter className="gap-3">
          <Button
            variant="outline"
            onClick={handleClose}
            className="border-2 border-gray-300 hover:bg-gray-100 bg-transparent"
            style={{ fontFamily: "Slackey, cursive" }}
            disabled={loading}
          >
            Cancel
          </Button>
          <Button
            onClick={handleBuy}
            disabled={
              loading || !buyAmount || Number.parseFloat(buyAmount) <= 0
            }
            className="bg-lime-400 hover:bg-lime-300 text-black border-2 border-lime-500"
            style={{ fontFamily: "Slackey, cursive" }}
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <span className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-lime-600"></span>
                Buying...
              </span>
            ) : (
              <>BUY {buyAmount || "0"} ETH</>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default BuyDialog;
