export interface NativeCurrency {
  symbol?: string;
}

export interface ChainDto {
  name?: string;
  nativeCurrency?: NativeCurrency;
}
