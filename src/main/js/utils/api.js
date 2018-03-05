export const LOGIN_URI = '/login'
export const BASE_API_URI = '/api'
export const RESTAURANTS_URI = BASE_API_URI + '/restaurants'
export const USERS_URI = BASE_API_URI + '/users?projection=short'
export const MENU_URI = BASE_API_URI + '/menus'
export const MENU_DOCUMENTS_URI = BASE_API_URI + '/menu_documents'
export const USERS_MENU_URI = BASE_API_URI + '/userDayMenus'
export const USERS_MENU_SEARCH_URI = ({ from, to }) =>
  BASE_API_URI + `/userDayMenus/search/date?from=${from}&to=${to}&projection=wide`
