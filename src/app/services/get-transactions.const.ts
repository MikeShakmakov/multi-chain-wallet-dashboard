import { gql } from '@apollo/client/core';

export const GET_TRANSACTIONS = gql`
  query GetTransactions($address: String!, $chainId: String!, $limit: Int!) {
    transactions(address: $address, chainId: $chainId, limit: $limit) {
      hash
      from
      to
      value
      symbol
      timestamp
      status
    }
  }
`;
