import { formatCurrency } from '@angular/common';
import { DisplayBalanceFields, NativeBalance, Token } from '../interfaces/portfolio.interface';

export const formatDecimals = (value: string | number | null | undefined): string => {
  const normalized = String(value ?? '').slice(0, 6);
  return /^0+$/.test(normalized) ? '0' : normalized;
};

export const toDisplayBalance = <T extends NativeBalance | Token>(
  balance: T,
): T & DisplayBalanceFields => {
  const [balanceInt = '0', decimalsRaw = ''] = (balance.balance ?? '0').split('.');

  return {
    ...balance,
    balanceInt,
    decimalsInt: formatDecimals(decimalsRaw),
    convertedUsd: formatCurrency(balance.usdValue ?? 0, 'en-US', '$', 'USD'),
  };
};