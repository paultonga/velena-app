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
        title {
          en
          tr
        }
        description {
          en
          tr
        }
        hasDiscount
        price
        discountPrice
        thumbnail
      }
    }
  }
`;

export const DELETE_DEAL_MUTATION = gql`
  mutation DeleteDeal($dealId: ID!) {
    deleteDeal(dealId: $dealId) {
      success
      message
    }
  }
`;