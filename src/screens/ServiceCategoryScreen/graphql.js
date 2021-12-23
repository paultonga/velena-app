import gql from 'graphql-tag';

export const GET_SERVICES_QUERY = gql`
  query getServices($id: ID!) {
    services: getServices(filter: {categoryId: $id}) {
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
      isFavorite
    }
  }
`;
