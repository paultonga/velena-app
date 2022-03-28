import {gql} from '@apollo/client';

export const CREATE_DEAL_MUTATION = gql`
  mutation CreateDealMutation(
    $title: String!
    $description: String!
    $thumbnail: String
    $percentage: Int!
  ) {
    createDeal(
      input: {
        title: $title
        description: $description
        thumbnail: $thumbnail
        percentage: $percentage
      }
    ) {
      success
      message
    }
  }
`;

export const EDIT_DEAL_MUTATION = gql`
  mutation EditDealMutation(
    $id: ID!
    $title: String
    $description: String
    $thumbnail: String
    $percentage: Int
  ) {
    editDeal(
      input: {
        id: $id
        title: $title
        description: $description
        thumbnail: $thumbnail
        percentage: $percentage
      }
    ) {
      success
      message
    }
  }
`;