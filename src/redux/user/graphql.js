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
          phone
          role
          settings {
            pushNotifications
            emailNotifications
          }
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
          phone
          role
          settings {
            pushNotifications
            emailNotifications
          }
        }
      }
    }
  }
`;

export const UPDATE_USER = gql`
  mutation UpdateUser(
    $firstName: String
    $lastName: String
    $address: String
    $avatar: String
  ) {
    updateUser(
      input: {
        firstName: $firstName
        lastName: $lastName
        address: $address
        avatar: $avatar
      }
    ) {
      success
      message
      result {
        user {
          id
          firstName
          lastName
          avatar
          address
          phone
          role
          settings {
            pushNotifications
            emailNotifications
          }
        }
      }
    }
  }
`;
