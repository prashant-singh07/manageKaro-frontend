// const BASE_URL = "https://managekaro-wg9e.onrender.com"; // PRODUCTION
const BASE_URL = "https://managekaro-dev.onrender.com"; // DEVELOPMENT

// const BASE_URL = "http://localhost:3000";

export const SERVER_URL = {
  AUTH: {
    LOGIN: BASE_URL + "/auth/login",
    REGISTER: BASE_URL + "/auth/register",
  },
  PROFILE: {
    UPDATE_PROFILE: BASE_URL + "/profile/update-profile",
  },
  SHOP: {
    UPDATE_SHOP: BASE_URL + "/shop/update-shop",
  },
  PRODUCT: {
    GET_PRODUCT: BASE_URL + "/products",
  },
  SUPPLIER: {
    ADD_NEW_SUPPLIER: BASE_URL + "/supplier/add-supplier",
    GET_ALL_SUPPLIERS: BASE_URL + "/supplier/get-all-suppliers",
    // GET_ALL_SUPPLIERS: BASE_URL + "/getAllSuppliers",
  },
  SKU: {
    ADD_NEW_SKU: BASE_URL + "/sku/add-new-sku",
    GET_ALL_SKUS: BASE_URL + "/sku/get-all-skus",
  },
  PURCHASE: {
    CREATE_PURCHASE_ORDER: BASE_URL + "/purchase/create-purchase-order",
    GET_PURCHASE_ORDER: BASE_URL + "/purchase/get-all-purchase",
    GET_PURCHASE_ORDER_DETAILS: BASE_URL + "/purchase/get-purchase-details",
  },
  SALES: {
    CREATE_SALES_OREDER: BASE_URL + "/sale/create-sale-order",
    GET_ALL_SALES_ORDER: BASE_URL + "/sale/get-all-sales",
  },
};
