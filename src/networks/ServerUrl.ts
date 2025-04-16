const BASE_URL = 'http://localhost:3000';

export const SERVER_URL = {
  AUTH: {
    LOGIN: BASE_URL + '/auth/login',
    REGISTER: BASE_URL + '/auth/register',
  },
  PROFILE: {
    UPDATE_PROFILE: BASE_URL + '/profile/update-profile',
  },
  SHOP: {
    UPDATE_SHOP: BASE_URL + '/shop/update-shop',
  },
  PRODUCT: {
    GET_PRODUCT: BASE_URL + '/products',
  },
};
