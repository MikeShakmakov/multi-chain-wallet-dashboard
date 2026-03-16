import { gql } from '@apollo/client/core';
export const GET_PORTFOLIO = gql`
  query GetPortfolio($address: String!, $chainId: String!) {
    portfolio(address: $address, chainId: $chainId) {
      nativeBalance {
        symbol
        balance
        rawBalance
        decimals
        usdValue
      }
      tokens {
        address
        symbol
        balance
        rawBalance
        decimals
        usdValue
      }
    }
  }
`;
