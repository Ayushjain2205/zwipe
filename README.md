# 🌊 ZWipe — Swipe to Discover & Launch Zora Coins

**ZWipe** is a mobile-first, swipe-based discovery and creation app for Zora Coins on **Base**.  
It brings the simplicity of Tinder to the chaotic world of memecoins — letting users swipe through trending tokens, mint what they like, and even create their own Zora coins with ease.

[🌀 Live Demo](https://zwipe.vercel.app)

---

## ✨ Features

- 🔄 **Swipe-to-Discover Interface**  
  Swipe left to skip, right to save or (soon) mint a Zora coin.

- 🧠 **Coincierge Engine**  
  Personalized curation of Zora coins based on your wallet activity and minting history.

- 🤖 **AI Discovery Agent**  
  Recommends coins based on wallet holdings, past swipes, and token interactions.

- 🪙 **Create Zora Coins**  
  Launch your own Zora coin with a simple form — name, symbol, and supply — using the Zora API.

- 📊 **Real-Time Coin Cards**  
  Each card displays live price, 24h change, holder count, and metadata from the Zora Coins API.

- 🔗 **Base Support**  
  Built natively on Base, with upcoming support for creating coins and buying via Base.

- 🎨 **Minimal, Degen-Friendly UI**  
  Mobile-optimized UX, a slick dollar-sign logo, and blue gradient brand theme.

---

## Use of Zora Coins

- **Fetching Coins Info**: Uses the Zora Coins SDK to retrieve coin information. [See usage in code](https://github.com/Ayushjain2205/zwipe/blob/main/app/api/getcoinsmostvaluable/route.ts)
- **Creating Coins**: Uses the Zora Coins SDK to create new coins. [See usage in code](https://github.com/Ayushjain2205/zwipe/blob/main/components/memecoin/CreateCoinDialog.tsx#L105)

---

## 🔗 Zora Coins Integration

ZWipe is deeply integrated with the **Zora Coins Protocol**:

- Uses the **Zora Coins API** to:
  - Fetch active and trending Zora ERC-20 tokens
  - Pull live metadata for display on coin cards
- Uses the **Zora SDK** to:
  - Enable in-app creation of new Zora coins with custom metadata

ZWipe is designed to be the discovery + creation layer on top of Zora — making it easy for anyone to find or launch a coin in seconds.

---

## 📦 Roadmap

- ✅ MVP: Swipe, discover, and create coins
- 🔜 Enable minting and buying with Base Sepolia
- 📲 Launch as Telegram Mini App
- 📊 Add trending dashboards + swipe stats
- 🎯 Improve AI Coincierge with social + sentiment signals
- 🧩 Add templates and meme generators for coin creation

---

## 🚀 Why Now

- 🚀 Memecoin culture is peaking (again).
- 🔓 Zora has unlocked fast coin creation — discovery is the next frontier.
- 🌉 Base is growing as the home of meme economies.
- 👉 And degens? They love to swipe.

---

## 🧪 Try it Live

👉 https://zwipe.vercel.app  
(💡 Buying is not supported on Base Sepolia, only on mainnet — creating coins is supported.)

---

## 🖼️ Gallery

A glimpse of the Zappmint platform in action:

<p align="center">
  <img src="https://i.postimg.cc/RVJ6dkpD/Screenshot-2025-07-10-at-10-45-56-PM.png" alt="Create Page" width="300"/>
  <img src="https://i.postimg.cc/3wYkKd8s/Screenshot-2025-07-10-at-10-46-11-PM.png" alt="Zapp Creation Flow" width="300"/>
  <img src="https://i.postimg.cc/VkjSQj89/Screenshot-2025-07-10-at-10-46-20-PM.png" alt="Zapp Page" width="300"/>
  <img src="https://i.postimg.cc/NjhyzdWf/Screenshot-2025-07-10-at-10-46-26-PM.png" alt="Zapp Page" width="300"/>
</p>
