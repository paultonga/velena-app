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
      gender
      role
      settings {
        id
        theme
        currency
        emailNotifications
        pushNotifications
      }
    }
  }
`;
