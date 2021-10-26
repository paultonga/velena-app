import gql from 'graphql-tag';

export const GET_DEAL_QUERY = gql`
  query GetDeal($id: ID!) {
    deal: getDeal(filter: {id: $id}) {
      id
      title
      description
      thumbnail
      services {
        id
        title
        description
        hasDiscount
        price
        discountPrice
        thumbnail
      }
    }
  }
`;

export const UPDATE_TODAYS_DEAL = gql`
  mutation UpdateTodaysDeal($id: ID!) {
    updateTodaysDeal(input: {dealId: $id}) {
      success
    }
  }
`;

export const ADD_SERVICE_TO_DEAL = gql`
  mutation AddServiceToDeal($serviceId: ID!, $dealId: ID!) {
    addServiceToDeal(input: {dealId: $dealId, serviceId: $serviceId}) {
      success
    }
  }
`;
