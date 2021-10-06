import gql from 'graphql-tag';

export const GET_DEAL_QUERY = gql`
  query GetDeal($id: ID!) {
    deal: getDeal(filter: {id: $id}) {
      id
      title
      description
      thumbnail
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
