import {gql} from '@apollo/client';

export const MODIFY_USER_ROLE_MUTATION = gql`
  mutation ModifyUserRole($userId: ID!, $role: Role!) {
    modifyUserRole(input: {userId: $userId, role: $role}) {
      success
    }
  }
`;

export const DELETE_USER_MUTATION = gql`
  mutation DeleteUserMutation($userId: ID!) {
    deleteUser(userId: $userId) {
      success
    }
  }
`;