export interface NativeCurrency {
  symbol: string;
  decimals: number;
}

export interface ChainDto {
  id: string;
  name: string;
  chainId: number | null;
  nativeCurrency: NativeCurrency;
  type: string;
}
