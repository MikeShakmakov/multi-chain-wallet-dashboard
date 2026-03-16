
import { gql } from '@apollo/client/core';
export const GET_CHAINS = gql`
query {
  chains {
    name
    nativeCurrency {
        symbol
      }
    }
  }
`;
