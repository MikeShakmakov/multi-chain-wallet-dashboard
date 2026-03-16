export interface NativeBalance {
 balance: string;
 rawBalance: string;
 decimals: number;
 symbol: string;
 usdValue: number
}

export interface PortfolioDto {
  nativeBalance: NativeBalance;
}
