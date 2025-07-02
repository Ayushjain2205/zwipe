import React from "react";
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
import { Memecoin } from "./types";

interface BuyDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  coin: Memecoin;
  buyAmount: string;
  onBuyAmountChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBuyConfirm: () => void;
  onBuyCancel: () => void;
}

const BuyDialog: React.FC<BuyDialogProps> = ({
  open,
  onOpenChange,
  coin,
  buyAmount,
  onBuyAmountChange,
  onBuyConfirm,
  onBuyCancel,
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-white border-4 border-gray-200">
        <DialogHeader>
          <DialogTitle
            className="flex items-center gap-3 text-2xl"
            style={{ fontFamily: "Slackey, cursive" }}
          >
            <img
              src={coin?.image || "/placeholder.svg"}
              alt={coin?.name}
              className="w-10 h-10 rounded-full border-2 border-gray-300"
            />
            BUY {coin?.name}
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
                ${coin?.price}
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
                  coin?.change24h && coin.change24h > 0
                    ? "text-lime-600"
                    : "text-red-600"
                }`}
                style={{ fontFamily: "Slackey, cursive" }}
              >
                {coin?.change24h && coin.change24h > 0 ? "+" : ""}
                {coin?.change24h}%
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
              onChange={onBuyAmountChange}
              min="0"
              step="0.01"
              className="text-lg border-2 border-gray-300 rounded-xl p-4 focus:border-lime-400"
              style={{ fontFamily: "Slackey, cursive" }}
            />
            {buyAmount && Number.parseFloat(buyAmount) > 0 && coin && (
              <p
                className="text-sm text-gray-600 bg-lime-50 p-3 rounded-lg border border-lime-200"
                style={{ fontFamily: "Slackey, cursive" }}
              >
                You'll get approximately{" "}
                <span className="text-lime-700">
                  {(Number.parseFloat(buyAmount) / coin.price).toLocaleString()}
                </span>{" "}
                <span>{coin.symbol}</span>
              </p>
            )}
          </div>
        </div>

        <DialogFooter className="gap-3">
          <Button
            variant="outline"
            onClick={onBuyCancel}
            className="border-2 border-gray-300 hover:bg-gray-100 bg-transparent"
            style={{ fontFamily: "Slackey, cursive" }}
          >
            Cancel
          </Button>
          <Button
            onClick={onBuyConfirm}
            disabled={!buyAmount || Number.parseFloat(buyAmount) <= 0}
            className="bg-lime-400 hover:bg-lime-300 text-black border-2 border-lime-500"
            style={{ fontFamily: "Slackey, cursive" }}
          >
            BUY ${buyAmount || "0"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default BuyDialog;
