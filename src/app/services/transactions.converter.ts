import { TransactionDataDto, TransactionDataVm } from '../interfaces/transaction.interface';

const shorten = (value: string, startLength = 6, endLength = 4): string => {
  if (!value) {
    return '';
  }

  if (value.length <= startLength + endLength + 3) {
    return value;
  }

  return `${value.slice(0, startLength)}...${value.slice(-endLength)}`;
};

const toDate = (timestamp: number): Date => {
  const normalizedTimestamp = timestamp < 1_000_000_000_000 ? timestamp * 1000 : timestamp;
  return new Date(normalizedTimestamp);
};

export const toDisplayTransaction = (
  transaction: TransactionDataDto,
): TransactionDataVm => ({
  ...transaction,
  displayHash: shorten(transaction.hash),
  displayFrom: shorten(transaction.from),
  displayTo: shorten(transaction.to),
  displayValue: `${transaction.value} ${transaction.symbol}`,
  displayDate: toDate(transaction.timestamp),
});
