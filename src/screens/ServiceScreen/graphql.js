import gql from 'graphql-tag';

export const GET_SERVICE_QUERY = gql`
  query getService($id: ID!) {
    service: getService(filter: {serviceId: $id}) {
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
      products {
        id
        title
        brand
        description
        thumbnail
      }
      staff {
        id
        firstName
        lastName
        avatar
        offer {
          duration
          price
        }
      }
    }
  }
`;

export const TOGGLE_FAVORITE_SERVICE = gql`
  mutation ToggleFavoriteService($id: ID!, $isFavorite: Boolean!) {
    toggleFavoriteService(input: {serviceId: $id, isFavorite: $isFavorite}) {
      success
    }
  }
`;
