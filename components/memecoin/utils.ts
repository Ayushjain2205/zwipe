import { Memecoin, mockMemecoins } from "./types";

export const getSuggestedTokens = (currentCoinId: string): Memecoin[] => {
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
