import {gql} from '@apollo/client';

export const CONFIRM_BOOKING_MUTATION = gql`
  mutation ConfirmBooking($id: ID!, $staffId: ID, $isConfirmed: Boolean!) {
    confirmBooking(
      input: {id: $id, staffId: $staffId, isConfirmed: $isConfirmed}
    ) {
      success
      message
    }
  }
`;
