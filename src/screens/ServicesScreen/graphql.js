import {gql} from '@apollo/client';

export const GET_SERVICES_QUERY = gql`
  query GetServices {
    getServices {
      id
      title
      description
      hasDiscount
      discountPrice
      price
      thumbnail
    }
  }
`;
