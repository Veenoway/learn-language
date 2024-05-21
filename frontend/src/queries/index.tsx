import { gql } from "@apollo/client";

export const GET_USER_QUERY = gql`
  query user($address: String!) {
    user(address: $address) {
      address
      tabs {
        name
        cards {
          francais
          pinyin
          hanzi
        }
      }
    }
  }
`;

export const GET_TAB_QUERY = gql`
  query tab($id: ID!) {
    tab(id: $id) {
      name
      cards {
        francais
        pinyin
        hanzi
      }
    }
  }
`;
