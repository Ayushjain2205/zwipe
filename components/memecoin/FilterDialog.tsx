import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

interface FilterDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onApply: (filters: {
    marketCap: number;
    uniqueHolders: number;
    selectedTypes: string[];
    safeScan: boolean;
  }) => void;
}

const minMarketCap = 0;
const maxMarketCap = 10000000;
const minHolders = 0;
const maxHolders = 1000;

const FilterDialog: React.FC<FilterDialogProps> = ({ open, onOpenChange, onApply }) => {
  // Sliders state
  const [marketCap, setMarketCap] = React.useState(1000000);
  const [uniqueHolders, setUniqueHolders] = React.useState(500);
  const tokenTypes = [
    { label: "Meme", value: "meme" },
    { label: "Utility", value: "utility" },
    { label: "Community", value: "community" },
    { label: "Experimental", value: "experimental" },
  ];
  const [selectedTypes, setSelectedTypes] = React.useState<string[]>([]);
  const [safeScan, setSafeScan] = React.useState(false);

  const toggleType = (type: string) => {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const handleApply = () => {
    onApply({
      marketCap,
      uniqueHolders,
      selectedTypes,
      safeScan,
    });
    onOpenChange(false);
  };

  const handleCancel = () => {
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md w-full max-w-full bg-white border-4 border-purple-400 shadow-2xl rounded-2xl overflow-x-hidden p-0">
        <div className="w-full max-w-full px-4 py-2 box-border overflow-x-hidden">
          <DialogHeader>
            <DialogTitle
              className="flex items-center gap-3 text-2xl"
              style={{ fontFamily: "Slackey, cursive" }}
            >
              <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent drop-shadow-lg">
                Preferences
              </span>
            </DialogTitle>
            <DialogDescription
              className="text-gray-600"
              style={{ fontFamily: "Slackey, cursive" }}
            >
              Set your coin discovery preferences: filter by market cap,
              holders, type, and enable SafeScan.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6 mt-4">
            {/* Market Cap Slider */}
            <div>
              <Label
                htmlFor="market-cap"
                className="text-lg"
                style={{ fontFamily: "Slackey, cursive" }}
              >
                Market Cap
              </Label>
              <div className="flex items-center gap-4 mt-2">
                <input
                  id="market-cap"
                  type="range"
                  min={minMarketCap}
                  max={maxMarketCap}
                  step={10000}
                  value={marketCap}
                  onChange={(e) => setMarketCap(Number(e.target.value))}
                  className="w-full accent-purple-500 h-2 rounded-lg appearance-none bg-gradient-to-r from-purple-300 to-blue-300"
                />
                <span
                  className="font-bold text-purple-700 min-w-[90px] text-right"
                  style={{ fontFamily: "Slackey, cursive" }}
                >
                  ${marketCap.toLocaleString()}
                </span>
              </div>
            </div>
            {/* Unique Holders Slider */}
            <div>
              <Label
                htmlFor="unique-holders"
                className="text-lg"
                style={{ fontFamily: "Slackey, cursive" }}
              >
                Unique Holders
              </Label>
              <div className="flex items-center gap-4 mt-2">
                <input
                  id="unique-holders"
                  type="range"
                  min={minHolders}
                  max={maxHolders}
                  step={10}
                  value={uniqueHolders}
                  onChange={(e) => setUniqueHolders(Number(e.target.value))}
                  className="w-full accent-blue-500 h-2 rounded-lg appearance-none bg-gradient-to-r from-blue-300 to-purple-300"
                />
                <span
                  className="font-bold text-blue-700 min-w-[60px] text-right"
                  style={{ fontFamily: "Slackey, cursive" }}
                >
                  {uniqueHolders}
                </span>
              </div>
            </div>
            {/* Token Types Multi-select Tiles */}
            <div className="mt-6">
              <Label
                className="text-lg mb-2 block"
                style={{ fontFamily: "Slackey, cursive" }}
              >
                Token Types
              </Label>
              <div className="grid grid-cols-2 gap-4">
                {tokenTypes.map((type) => (
                  <button
                    key={type.value}
                    type="button"
                    onClick={() => toggleType(type.value)}
                    className={`rounded-xl p-4 flex flex-col items-center justify-center border-2 transition-all duration-200 shadow-md cursor-pointer select-none font-bold text-lg
                      ${
                        selectedTypes.includes(type.value)
                          ? "bg-gradient-to-br from-purple-400 to-blue-400 text-white border-blue-500 scale-105 drop-shadow-lg"
                          : "bg-white border-gray-300 text-gray-700 hover:bg-purple-50 hover:border-purple-300"
                      }
                    `}
                    style={{ fontFamily: "Slackey, cursive", minHeight: 64 }}
                  >
                    {type.label}
                  </button>
                ))}
              </div>
            </div>
            {/* SafeScan Toggle Switch */}
            <div className="flex items-center gap-4 mt-8 mb-2">
              <Label
                htmlFor="safescan-toggle"
                className="text-lg"
                style={{ fontFamily: "Slackey, cursive" }}
              >
                SafeScan
              </Label>
              <button
                id="safescan-toggle"
                type="button"
                aria-pressed={safeScan}
                onClick={() => setSafeScan((v) => !v)}
                className={`w-14 h-8 flex items-center rounded-full transition-colors duration-200 border-2
                  ${
                    safeScan
                      ? "bg-gradient-to-r from-lime-400 to-green-400 border-green-500"
                      : "bg-gray-200 border-gray-400"
                  }
                `}
                style={{ minWidth: 56 }}
              >
                <span
                  className={`h-6 w-6 rounded-full bg-white shadow-md transform transition-transform duration-200 border-2 border-gray-300"
                    ${
                      safeScan
                        ? "translate-x-6 border-green-400"
                        : "translate-x-0"
                    }
                  `}
                  style={{ display: "inline-block" }}
                />
              </button>
              <span
                className={`ml-2 text-sm font-bold ${
                  safeScan ? "text-green-700" : "text-gray-500"
                }`}
                style={{ fontFamily: "Slackey, cursive" }}
              >
                {safeScan ? "On" : "Off"}
              </span>
            </div>
          </div>
          <DialogFooter className="gap-3 mt-6">
            <Button
              variant="outline"
              onClick={handleCancel}
              type="button"
              className="border-2 border-purple-300 hover:bg-purple-50 bg-transparent"
              style={{ fontFamily: "Slackey, cursive" }}
            >
              Cancel
            </Button>
            <Button
              onClick={handleApply}
              type="button"
              className="bg-purple-400 hover:bg-purple-300 text-white border-2 border-blue-400"
              style={{ fontFamily: "Slackey, cursive" }}
            >
              Apply Preferences
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FilterDialog;
