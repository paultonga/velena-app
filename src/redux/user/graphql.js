import {gql} from '@apollo/client';

export const GET_NOTIFICATIONS = gql`
  query GetNotifications {
    getNotifications {
      title
      description
      createdAt
      isSeen
      type
    }
  }
`;

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
    $email: String!
    $dob: DateTime!
    $gender: String!
  ) {
    register(
      input: {
        firstName: $firstName
        lastName: $lastName
        phone: $phone
        password: $password
        email: $email
        dob: $dob
        gender: $gender
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

export const REQUEST_VERIFICATION_CODE = gql`
  mutation RequestVerificationCode($email: String!) {
    requestVerificationCode(email: $email) {
      success
      message
    }
  }
`;

export const VERIFY_CODE = gql`
  mutation VerifyCode($code: String!, $email: String!, $type: String!) {
    verifyCode(code: $code, email: $email, type: $type) {
      success
      message
    }
  }
`;

export const CHANGE_PASSWORD = gql`
  mutation ChangePassword($email: String!, $password: String!) {
    changePassword(email: $email, password: $password) {
      success
      message
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
