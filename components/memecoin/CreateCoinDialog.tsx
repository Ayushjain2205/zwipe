"use client";
import React, { useState, useEffect, useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useAccount, useWalletClient } from "wagmi";
import {
  createCoin,
  type CreateCoinArgs,
  setApiKey,
  DeployCurrency,
  createMetadataBuilder,
  createZoraUploaderForCreator,
} from "@zoralabs/coins-sdk";
import { createPublicClient, http, createWalletClient, custom } from "viem";
import { baseSepolia } from "viem/chains";
import { Address } from "viem";

interface CreateCoinDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

// Replace 'unknown' with a specific type for result
interface CoinResult {
  hash: string;
  address?: string;
  // Add more properties as needed, but avoid 'any'.
}

const CreateCoinDialog: React.FC<CreateCoinDialogProps> = ({
  open,
  onOpenChange,
}) => {
  // Set Zora Coins SDK API key from env variable
  useEffect(() => {
    const apiKey = process.env.NEXT_PUBLIC_ZORA_API_KEY;
    if (apiKey) {
      setApiKey(apiKey);
    } else {
      console.warn(
        "Zora API key is missing. Please set NEXT_PUBLIC_ZORA_API_KEY in your environment variables."
      );
    }
  }, []);

  // Create Coin State
  const [form, setForm] = useState({
    name: "",
    symbol: "",
    description: "",
    payoutRecipient: "",
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<CoinResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Get Coin State
  // const [getAddress, setGetAddress] = useState("");
  // const [getLoading, setGetLoading] = useState(false);
  // const [getError, setGetError] = useState<string | null>(null);
  // const [coinData, setCoinData] = useState<any>(null);

  const { address: account, isConnected } = useAccount();
  const { data: walletClientData, isLoading: walletLoading } =
    useWalletClient();

  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target as HTMLInputElement | HTMLTextAreaElement;
    setForm({ ...form, [name]: value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    } else {
      setImageFile(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      if (!account) throw new Error("Please connect your wallet.");
      if (!walletClientData) throw new Error("Wallet client not found.");
      if (!form.name || !form.symbol || !form.description)
        throw new Error("Please fill all fields.");
      if (!imageFile) throw new Error("Please select an image.");

      // 1. Build and upload metadata to Zora IPFS using the SDK
      const { createMetadataParameters } = await createMetadataBuilder()
        .withName(form.name)
        .withSymbol(form.symbol)
        .withDescription(form.description)
        .withImage(imageFile)
        .upload(createZoraUploaderForCreator(account));

      // 2. Create a viem wallet client from the wagmi walletClient
      const walletClient = createWalletClient({
        chain: baseSepolia,
        transport: custom(walletClientData.transport),
        account: account,
      });
      // 3. Create public client for baseSepolia
      const publicClient = createPublicClient({
        chain: baseSepolia,
        transport: http(baseSepolia.rpcUrls.default.http[0]),
      });
      // 4. Prepare coin params
      const coinParams: CreateCoinArgs = {
        ...createMetadataParameters,
        payoutRecipient: (form.payoutRecipient || account) as Address,
        chainId: baseSepolia.id,
        currency: DeployCurrency.ETH, // ETH is supported on Base Sepolia
      };
      // 5. Create coin
      const res = await createCoin(coinParams, walletClient, publicClient);
      setResult(res);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError(String(err));
      }
    } finally {
      setLoading(false);
    }
  };

  // Get Coin Handler
  // const handleGetCoin = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   setGetLoading(true);
  //   setGetError(null);
  //   setCoinData(null);
  //   try {
  //     if (!getAddress) throw new Error("Please enter a coin address.");
  //     const trimmedAddress = getAddress.trim();
  //     const response = await getCoin({
  //       address: trimmedAddress,
  //       chain: baseSepolia.id,
  //     });
  //     if (!response.data?.zora20Token)
  //       throw new Error("Coin not found or invalid address.");
  //     setCoinData(response.data.zora20Token);
  //   } catch (err: any) {
  //     setGetError(err.message || String(err));
  //   } finally {
  //     setGetLoading(false);
  //   }
  // };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton
        className="sm:max-w-md w-full max-w-full bg-white border-4 border-purple-300 shadow-2xl rounded-2xl overflow-x-hidden p-0"
      >
        <div className="w-full max-w-full px-4 py-2 box-border overflow-x-hidden">
          <DialogHeader>
            <DialogTitle
              className="flex items-center gap-3 text-2xl"
              style={{ fontFamily: "Slackey, cursive" }}
            >
              <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent drop-shadow-lg">
                Create Coin
              </span>
            </DialogTitle>
            {/* Only show description in form state */}
            {!loading && !result && (
              <DialogDescription
                className="text-gray-700"
                style={{ fontFamily: "Slackey, cursive" }}
              >
                Create a new Zora coin on{" "}
                <span className="text-blue-500 font-bold">Base</span>. Fill
                these details and deploy your coin!
              </DialogDescription>
            )}
          </DialogHeader>
          <div className="flex flex-col items-center w-full max-w-full overflow-x-hidden">
            {/* Show form only if not loading and not result */}
            {!loading && !result && (
              <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-3 w-full max-w-md mt-2 px-2 box-border"
                style={{ maxWidth: "100%" }}
              >
                <input
                  name="name"
                  placeholder="Coin Name"
                  value={form.name}
                  onChange={handleChange}
                  className="border-2 border-purple-300 p-3 rounded-xl bg-gradient-to-r from-purple-50 to-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-400 text-lg shadow-sm"
                  required
                  disabled={!isConnected || walletLoading || !walletClientData}
                  style={{ fontFamily: "Slackey, cursive" }}
                />
                <input
                  name="symbol"
                  placeholder="Symbol (e.g. EGL)"
                  value={form.symbol}
                  onChange={handleChange}
                  className="border-2 border-purple-300 p-3 rounded-xl bg-gradient-to-r from-purple-50 to-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-400 text-lg shadow-sm"
                  required
                  disabled={!isConnected || walletLoading || !walletClientData}
                  style={{ fontFamily: "Slackey, cursive" }}
                />
                <textarea
                  name="description"
                  placeholder="Description"
                  value={form.description}
                  onChange={handleChange}
                  className="border-2 border-purple-300 p-3 rounded-xl bg-gradient-to-r from-purple-50 to-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-400 text-lg shadow-sm"
                  required
                  disabled={!isConnected || walletLoading || !walletClientData}
                  style={{ fontFamily: "Slackey, cursive" }}
                />
                <label
                  className="text-lg font-semibold mb-1"
                  style={{ fontFamily: "Slackey, cursive" }}
                >
                  Coin Image
                </label>
                <div
                  className="flex flex-col items-center justify-center border-2 border-dashed border-purple-300 rounded-xl bg-gradient-to-r from-purple-50 to-blue-50 p-6 cursor-pointer transition hover:border-blue-400 relative"
                  style={{ minHeight: "120px" }}
                  onClick={() => {
                    if (!(!isConnected || walletLoading || !walletClientData)) {
                      inputRef.current?.click();
                    }
                  }}
                  onDragOver={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                  onDrop={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                      setImageFile(e.dataTransfer.files[0]);
                    }
                  }}
                >
                  {imageFile ? (
                    <img
                      src={URL.createObjectURL(imageFile)}
                      alt="Coin Preview"
                      className="max-h-24 rounded-lg shadow mb-2"
                      style={{ maxWidth: "100px" }}
                    />
                  ) : (
                    <span
                      className="text-gray-500 text-base"
                      style={{ fontFamily: "Slackey, cursive" }}
                    >
                      Drag & drop or click to select an image (PNG/JPG)
                    </span>
                  )}
                  <input
                    id="coin-image-input"
                    ref={inputRef}
                    type="file"
                    accept="image/png, image/jpeg"
                    onChange={handleImageChange}
                    className="hidden"
                    required
                    disabled={
                      !isConnected || walletLoading || !walletClientData
                    }
                  />
                </div>
                <input
                  name="payoutRecipient"
                  placeholder="Payout Recipient (defaults to your address)"
                  value={form.payoutRecipient}
                  onChange={handleChange}
                  className="border-2 border-purple-300 p-3 rounded-xl bg-gradient-to-r from-purple-50 to-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-400 text-lg shadow-sm"
                  disabled={!isConnected || walletLoading || !walletClientData}
                  style={{ fontFamily: "Slackey, cursive" }}
                />
                <Button
                  type="submit"
                  className="bg-gradient-to-r from-purple-400 to-blue-400 text-white p-3 rounded-xl font-semibold shadow-md hover:from-purple-500 hover:to-blue-500 transition disabled:opacity-50 text-lg"
                  disabled={
                    loading ||
                    !isConnected ||
                    walletLoading ||
                    !walletClientData
                  }
                  style={{ fontFamily: "Slackey, cursive" }}
                >
                  {loading
                    ? "Creating..."
                    : walletLoading
                    ? "Loading wallet..."
                    : !isConnected
                    ? "Connect Wallet"
                    : !walletClientData
                    ? "Wallet Not Ready"
                    : "Create Coin"}
                </Button>
              </form>
            )}
            {/* Loader state */}
            {loading && !result && (
              <div className="flex flex-col items-center justify-center w-full py-12">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-purple-400 border-b-4 border-blue-400 mb-6"></div>
                <div
                  className="text-2xl font-bold text-purple-600"
                  style={{ fontFamily: "Slackey, cursive" }}
                >
                  Creating...
                </div>
              </div>
            )}
            {/* Success state */}
            {result &&
              typeof result === "object" &&
              "hash" in result &&
              "address" in result && (
                <div className="flex flex-col items-center justify-center w-full py-12">
                  <div
                    className="text-3xl mb-4 text-green-600 font-bold"
                    style={{ fontFamily: "Slackey, cursive" }}
                  >
                    🎉 Coin Created!
                  </div>
                  <div
                    className="mb-2 text-lg text-gray-700"
                    style={{ fontFamily: "Slackey, cursive" }}
                  >
                    Your coin has been successfully deployed.
                  </div>
                  <div className="mt-4 p-4 border-2 border-blue-300 rounded-xl bg-gradient-to-r from-blue-50 to-purple-50 w-full max-w-md text-sm shadow">
                    <div>
                      <b>Transaction:</b>{" "}
                      <a
                        href={`https://sepolia.basescan.org/tx/${result.hash}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 underline break-all"
                      >
                        View on Explorer
                      </a>
                    </div>
                    <div>
                      <b>Coin Address:</b>{" "}
                      <a
                        href={`https://sepolia.basescan.org/address/${result.address}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 underline break-all"
                      >
                        View on Explorer
                      </a>
                    </div>
                  </div>
                </div>
              )}
            {/* Error state (only show if not loading/result) */}
            {!loading && !result && error && (
              <div
                className="text-red-600 mt-4 text-center"
                style={{ fontFamily: "Slackey, cursive" }}
              >
                {error}
              </div>
            )}
            {/* Wallet connection states (only show if not loading/result) */}
            {!loading && !result && !isConnected && (
              <div
                className="text-red-600 mt-2"
                style={{ fontFamily: "Slackey, cursive" }}
              >
                Please connect your wallet.
              </div>
            )}
            {!loading &&
              !result &&
              isConnected &&
              (walletLoading || !walletClientData) && (
                <div
                  className="text-yellow-600 mt-2"
                  style={{ fontFamily: "Slackey, cursive" }}
                >
                  Wallet client not ready. Please wait...
                </div>
              )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateCoinDialog;
