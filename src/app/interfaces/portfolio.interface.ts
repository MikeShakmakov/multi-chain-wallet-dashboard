export interface NativeBalance {
  balance: string;
  rawBalance: string;
  decimals: number;
  symbol: string;
  usdValue: number
}

export interface DisplayBalanceFields {
  balanceInt: string;
  decimalsInt: string;
  convertedUsd: string;
}

export interface Token extends NativeBalance {
  address: string;
}

export type NativeBalanceVm = NativeBalance & DisplayBalanceFields;
export type TokenVm = Token & DisplayBalanceFields;

export interface PortfolioDto {
  nativeBalance: NativeBalance;
  tokens: Token[];
}

export interface PortfolioVm {
  nativeBalance: NativeBalanceVm;
  tokens: TokenVm[];
}
