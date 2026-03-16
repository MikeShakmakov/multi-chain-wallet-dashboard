export interface TransactionDataDto {
  hash: string;
  from: string;
  to: string;
  value: string;
  symbol: string;
  timestamp: number;
  status: string;
}

export interface TransactionDataVm extends TransactionDataDto {
  displayHash: string;
  displayFrom: string;
  displayTo: string;
  displayValue: string;
  displayDate: Date;
}
