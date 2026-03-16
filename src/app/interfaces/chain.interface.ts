export interface NativeCurrency {
  symbol: string;
}

export interface ChainDto {
  id: string;
  name: string;
  nativeCurrency: NativeCurrency;
}
