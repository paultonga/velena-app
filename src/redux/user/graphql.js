import {gql} from '@apollo/client';

export const LOGIN_USER = gql`
  mutation LoginUser($phone: String!, $password: String!) {
    login(input: {phone: $phone, password: $password}) {
      token
      user {
        id
        firstName
        lastName
        phone
      }
      token
    }
  }
`;

export const REGISTER_USER = gql`
  mutation RegisterUser(
    $firstName: String!
    $lastName: String
    $phone: String!
    $password: String!
  ) {
    register(
      input: {
        firstName: $firstName
        lastName: $lastName
        phone: $phone
        password: $password
      }
    ) {
      token
      user {
        id
        firstName
        lastName
        phone
      }
    }
  }
`;
