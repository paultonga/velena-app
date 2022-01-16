import {gql} from '@apollo/client';

export const CREATE_SERVICE_MUTATION = gql`
  mutation CreateServiceMutation(
    $titleEN: String!
    $titleTR: String!
    $descriptionEN: String!
    $descriptionTR: String!
    $categoryId: ID!
    $thumbnail: String
    $price: Float!
    $discountPrice: Float
    $hasDiscount: Boolean
  ) {
    createService(
      input: {
        titleEN: $titleEN
        titleTR: $titleTR
        descriptionEN: $descriptionEN
        descriptionTR: $descriptionTR
        categoryId: $categoryId
        thumbnail: $thumbnail
        price: $price
        discountPrice: $discountPrice
        hasDiscount: $hasDiscount
      }
    ) {
      success
      message
    }
  }
`;

export const EDIT_SERVICE_MUTATION = gql`
  mutation EditServiceMutation(
    $id: ID!
    $titleEN: String
    $titleTR: String
    $descriptionEN: String
    $descriptionTR: String
    $categoryId: ID
    $thumbnail: String
    $price: Float
    $discountPrice: Float
    $hasDiscount: Boolean
  ) {
    editService(
      input: {
        id: $id
        titleEN: $titleEN
        titleTR: $titleTR
        descriptionEN: $descriptionEN
        descriptionTR: $descriptionTR
        categoryId: $categoryId
        thumbnail: $thumbnail
        price: $price
        discountPrice: $discountPrice
        hasDiscount: $hasDiscount
      }
    ) {
      success
      message
    }
  }
`;

export const GET_SERVICE_CATEGORIES_QUERY = gql`
  query GetServiceCategories {
    getCategories {
      id
      title
    }
  }
`;
