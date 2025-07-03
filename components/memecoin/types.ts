export interface Memecoin {
  id: string;
  name: string;
  symbol: string;
  price: number;
  change24h: number;
  marketCap: string;
  image: string;
  description: string;
  color: string;
  volume24h: string;
  totalSupply: string;
  circulatingSupply: string;
  allTimeHigh: number;
  allTimeLow: number;
  launchDate: string;
  website: string;
  holders: string;
  about: string;
  address: string;
  creatorAddress?: string;
  creatorProfile?: {
    avatar?: {
      previewImage?: {
        medium?: string;
      };
    };
    handle?: string;
  };
  marketCapDelta24h?: string | number;
  uniqueHolders?: number;
  createdAt?: string;
}

export const mockMemecoins: Memecoin[] = [
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
    address: "",
    creatorAddress: "",
    creatorProfile: {},
    marketCapDelta24h: "",
    uniqueHolders: 0,
    createdAt: "",
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
    address: "",
    creatorAddress: "",
    creatorProfile: {},
    marketCapDelta24h: "",
    uniqueHolders: 0,
    createdAt: "",
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
    address: "",
    creatorAddress: "",
    creatorProfile: {},
    marketCapDelta24h: "",
    uniqueHolders: 0,
    createdAt: "",
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
    address: "",
    creatorAddress: "",
    creatorProfile: {},
    marketCapDelta24h: "",
    uniqueHolders: 0,
    createdAt: "",
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
    address: "",
    creatorAddress: "",
    creatorProfile: {},
    marketCapDelta24h: "",
    uniqueHolders: 0,
    createdAt: "",
  },
];
