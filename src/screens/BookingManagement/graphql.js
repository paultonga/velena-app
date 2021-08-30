import {gql} from '@apollo/client';

export const GET_ASSIGNED_BOOKINGS_QUERY = gql`
  query GetAssignedBookings {
    bookings: getAssignedBookings {
      id
      startDate
      isFlexible
      isConfirmed
      service {
        id
        title
        description
        hasDiscount
        discountPrice
        price
        thumbnail
      }
      user {
        id
        firstName
        lastName
        phone
      }
    }
  }
`;

export const GET_ALL_BOOKINGS_QUERY = gql`
  query GetAllBookingss {
    staff: getStaff {
      value: id
      label: fullName
    }
    bookings: getAllBookings {
      id
      startDate
      isFlexible
      isConfirmed
      service {
        id
        title
        description
        hasDiscount
        discountPrice
        price
        thumbnail
      }
      user {
        id
        firstName
        lastName
        phone
      }
    }
  }
`;
