import strings from '../localization';

export const STORAGE = {
  INTRO_VIEWED_KEY: '@intro_screen_viewed',
  INTRO_VIEWED_VALUE: 'TRUE',
};

export const ADMIN_BOOKING_DATE_FORMAT = 'Do MMM YYYY, h:mm a';

export const STATUS_BAR_STYLES = {
  DEFAULT: 'default',
  LIGHT_CONTENT: 'light-content',
  DARK_CONTENT: 'dark-content',
};

export const PROFILE_LINKS_MAP = {
  EDIT_PROFILE: 'editProfile',
  CHANGE_PASSWORD: 'changePassword',
  CREDIT_COUPONS: 'credits',
  INVITE_FRIENDS: 'inviteFriends',
  HELP_AND_SUPPORT: 'helpAndSupport',
  PAYMENTS: 'payments',
  SETTINGS: 'settings',
  STAFF: 'staffProfile',
  ADMIN: 'administrator',
  LOG_OUT: 'logOut',
  CHANGE_LANGUAGE: 'changeLanguage',
};

export const PROFILE_LINKS = [
  'editProfile',
  'credits',
  'inviteFriends',
  'changeLanguage',
  'settings',
];

export const INTRO_SCREEN_DATA = [
  {
    header: strings.slideOneHeader,
    description: strings.slideOneDesc,
    image: 'https://unsplash.com/photos/KvvZ6IIB5FM/download?force=true&w=640',
  },
  {
    header: strings.slideTwoHeader,
    description: strings.slideTwoDesc,
    image: 'https://unsplash.com/photos/FkAZqQJTbXM/download?force=true&w=640',
  },
  {
    header: strings.slideThreeHeader,
    description: strings.slideThreeDesc,

    image: 'https://unsplash.com/photos/FkAZqQJTbXM/download?force=true&w=640',
  },
];

export const USER_ROLES = {
  ADMIN: 'ADMIN',
  CUSTOMER: 'CUSTOMER',
  STAFF: 'STAFF',
};
