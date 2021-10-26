import {gql} from '@apollo/client';

export const GET_ME_QUERY = gql`
  query GetMe {
    me {
      id
      firstName
      lastName
      phone
      address
      avatar
      role
      settings {\
        emailNotifications
        pushNotifications
      }
    }
  }
`;
