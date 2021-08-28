import {gql} from '@apollo/client';

export const LOGIN_USER = gql`
  mutation LoginUser($phone: String!, $password: String!) {
    login(input: {phone: $phone, password: $password}) {
      success
      message
      result {
        token
        user {
          id
          firstName
          lastName
          avatar
          address
          gender
          phone
        }
      }
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
      success
      message
      result {
        token
        user {
          id
          firstName
          lastName
          avatar
          address
          gender
          phone
        }
      }
    }
  }
`;
