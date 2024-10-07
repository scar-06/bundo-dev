/**
 * @publicApi
 */
export const enum ApplicationRoutes {
  DASHBOARD_ACCOUNT_SETUP = "/dashboard/complete-setup",
  DASHBOARD_ACCOUNT_SETUP_SUCCESS = "/dashboard/complete-setup/success",
  DASHBOARD_HOME_CUSTOMER = "/dashboard/customers",
  DASHBOARD_HOME_VENDOR = "/dashboard/vendors",

  // Auth routes
  AUTH = "/auth",
  AUTH_SIGN_IN = "/auth/login",
  AUTH_SIGN_UP = "/auth/signup",
  AUTH_FORGOT_PASSWORD = "/auth/forgot-password",
  AUTH_RESET_PASS = "/auth/create-new-password",
  AUTH_KYC = "/auth/signup/vendor/onboarding/kyc",
  // Public routes
  LANDING_PAGE = "/",
  ABOUT_PAGE = "/about",
  MARKETPLACE_PAGE = "/marketplace",
  PRICING_PAGE = "/pricing",
}
