import {gql} from '@apollo/client';

export const GET_EXPLORE_SCREEN_DATA = gql`
  query GetExploreScreenData {
    getExploreScreen {
      popular {
        id
        title
        description
        thumbnail
        hasDiscount
        discountPrice
        price
      }
      categories {
        id
        title
        description
        thumbnail
      }
    }
  }
`;

export const REGISTER_PUSH_TOKEN = gql`
  mutation RegisterPushToken($pushToken: String!) {
    registerPushToken(pushToken: $pushToken) {
      success
    }
  }
`;
