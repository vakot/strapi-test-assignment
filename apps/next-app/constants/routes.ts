export enum AppRoutes {
  Homepage = '/',
  Dashboard = '/dashboard',
  Login = '/auth/login',
  Signup = '/auth/signup',
}

export enum ApiRoutes {
  Login = '/api/auth/login',
  Signup = '/api/auth/signup',
  Logout = '/api/auth/logout',
  FormLogin = '/api/forms/login',
  FormSignup = '/api/forms/signup',
  Countries = '/api/countries',
}

export const AUTH_PAGES = [AppRoutes.Login, AppRoutes.Signup]
export const PUBLIC_PAGES = [...AUTH_PAGES, AppRoutes.Homepage]
