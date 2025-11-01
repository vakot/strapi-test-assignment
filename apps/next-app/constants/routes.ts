export enum AppRoutes {
  Homepage = '/',
  Dashboard = '/dashboard',
  Login = '/auth/login',
  Signup = '/auth/signup',
}

export enum ApiEndpoints {
  Login = '/auth/login',
  Signup = '/auth/signup',
  Logout = '/auth/logout',
  FormLogin = '/forms/login',
  FormSignup = '/forms/signup',
  Countries = '/countries',
  Me = '/users/me',
}

export const AUTH_PAGES = [AppRoutes.Login, AppRoutes.Signup]
export const PUBLIC_PAGES = [...AUTH_PAGES, AppRoutes.Homepage]
