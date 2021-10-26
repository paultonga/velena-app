import {gql} from '@apollo/client';

export const GET_DEALS_QUERY = gql`
  query GetDeals {
    getDeals {
      id
      title
      description
      thumbnail
      percentage
      services {
        id
        title
        description
        hasDiscount
        price
        discountPrice
        thumbnail
      }
    }
  }
`;
