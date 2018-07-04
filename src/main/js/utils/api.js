export const LOGIN_URI = '/auth/google(scope=\'profile\')'
export const BASE_API_URI = '/api'
export const RESTAURANTS_URI = BASE_API_URI + '/restaurants'
export const USERS_URI = BASE_API_URI + '/users?projection=short'
export const MENU_URI = BASE_API_URI + '/menus?projection=wide'
export const MENU_DOCUMENTS_URI = BASE_API_URI + '/menuDocuments?projection=wide'
export const MENU_DOCUMENTS_UPLOAD_URI = BASE_API_URI + '/menu_documents'
export const USERS_MENU_URI = BASE_API_URI + '/userDayMenus'
export const USERS_MENU_CUSTOM_URI = BASE_API_URI + '/user_day_menu'
export const USERS_MENU_BY_ID_URI = ({id}) => BASE_API_URI + `/userDayMenus/${id}?projection=wide`
export const USERS_MENU_SEARCH_URI = ({from, to}) =>
  BASE_API_URI + `/userDayMenus/search/date?from=${from}&to=${to}&projection=wide`
export const DAYS_URI = BASE_API_URI + '/days?projection=wide'
export const DAYS_BY_ID_URI = ({id}) => BASE_API_URI + `/days/${id}?projection=wide`
export const DAYS_SEARCH_URI = ({from, to}) =>
  BASE_API_URI + `/days/search/date?from=${from}&to=${to}&projection=wide`

export const getWithoutProjection = (str) => str.replace('{?projection}', '').replace(/\?projection=\w+/, '')

export const removeProjection = (obj) => {
  obj._links.self.href = getWithoutProjection(obj._links.self.href)
  return obj
}

export const removeProjectionMembers = (obj, members = []) => {
  removeProjection(obj)
  members.forEach(m => removeProjection(obj[m]))
  return obj
}

export const removeCollectionProjection = (action, collectionName, members = []) =>
  action[collectionName]._embedded[collectionName].map(obj => removeProjectionMembers(obj, members))
