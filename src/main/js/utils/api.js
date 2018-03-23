export const LOGIN_URI = '/login'
export const BASE_API_URI = '/api'
export const RESTAURANTS_URI = BASE_API_URI + '/restaurants'
export const USERS_URI = BASE_API_URI + '/users?projection=short'
export const MENU_URI = BASE_API_URI + '/menus?projection=wide'
export const MENU_DOCUMENTS_URI = BASE_API_URI + '/menu_documents'
export const USERS_MENU_URI = BASE_API_URI + '/userDayMenus'
export const USERS_MENU_BY_ID_URI = ({id}) => BASE_API_URI + `/userDayMenus/${id}?projection=wide`
export const USERS_MENU_SEARCH_URI = ({from, to}) =>
  BASE_API_URI + `/userDayMenus/search/date?from=${from}&to=${to}&projection=wide`

export const removeProjection = (obj) => {
  obj._links.self.href = obj._links.self.href.replace('{?projection}', '')
  return obj
}

export const removeCollectionProjection = (action, collectionName, members = []) =>
  action[collectionName]._embedded[collectionName].map(u => {
    removeProjection(u)
    members.forEach(m => removeProjection(u[m]))
    return u
  })
