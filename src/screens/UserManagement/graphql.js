import {gql} from '@apollo/client';

export const GET_USERS_QUERY = gql`
  query GetUsers {
    getUsers {
      id
      firstName
      lastName
      role
      avatar
      phone
      address
    }
  }
`;
