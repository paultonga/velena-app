import {gql} from '@apollo/client';

export const GET_SERVICES_QUERY = gql`
  query GetServices {
    getServices {
      id
      title {
        en
        tr
      }
      description {
        en
        tr
      }
      hasDiscount
      discountPrice
      price
      thumbnail
    }
  }
`;
