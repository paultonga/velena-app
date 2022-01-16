import {gql} from '@apollo/client';

export const GET_SERVICES_QUERY = gql`
  query GetServices {
    getServices {
      id
      categoryId
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

export const DELETE_SERVICE_MUTATION = gql`
  mutation DeleteService($serviceId: ID!) {
    deleteService(serviceId: $serviceId) {
      success
      message
    }
  }
`;
