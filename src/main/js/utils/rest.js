import mammoth from 'mammoth'

import {
  LOGIN_URI, USERS_MENU_URI, USERS_URI, MENU_DOCUMENTS_UPLOAD_URI, USERS_MENU_CUSTOM_URI, USER_AUTHORITIES_URI
} from './api'
import {weekDateFormattedFromObject} from './date'

export const apiCall = (path, options) => (
  fetch(path, options)
  // TODO add status and refactor api
    .then(r => r.json())
)

export const post = (path, authToken, data = {}) => apiCall(path, {
  method: 'POST',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json; charset=utf-8',
    'X-AUTH-TOKEN': authToken
  },
  body: JSON.stringify(data)
})

export const get = (path, authToken) => apiCall(path, {
  method: 'GET',
  headers: {
    Accept: 'application/json',
    'X-AUTH-TOKEN': authToken
  }
})

export const del = (path, authToken) => apiCall(path, {
  method: 'DELETE',
  headers: {
    Accept: 'application/json',
    'X-AUTH-TOKEN': authToken
  }
})

export const put = (path, authToken, data) => apiCall(path, {
  method: 'PUT',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json; charset=utf-8',
    'X-AUTH-TOKEN': authToken
  },
  body: JSON.stringify(data)
})

export const getMenuDocumentContent = (md) => fetch(`${MENU_DOCUMENTS_UPLOAD_URI}/${md.id}`, {
  method: 'GET',
  responseType: 'arraybuffer'
}).then(r => r.arrayBuffer())
  .then(buffer => mammoth.convertToHtml(
    {arrayBuffer: buffer},
    {includeDefaultStyleMap: true}
  ))
  .then((r) => r.value.toString())

export const postMenuDocument = (md, user) => {
  let formData = new FormData()
  formData.append('file', md.file)
  formData.append('restaurant_id', md.restaurant.id)
  formData.append('user_email', user.email)

  return apiCall(MENU_DOCUMENTS_UPLOAD_URI, {
    method: 'POST',
    body: formData,
    headers: {
      'X-AUTH-TOKEN': user.auth_token
    }
  })
}

export const putUserDayMenu = (authToken, udm) => fetch(`${USERS_MENU_URI}/${udm.id}/menu`, {
  method: 'PUT',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'text/uri-list',
    'X-AUTH-TOKEN': authToken
  },
  body: udm.menu
}).then(r => ({
  status: r.status
}))

export const deleteUserDayMenuTill = (authToken, tillDate) =>
  fetch(`${USERS_MENU_CUSTOM_URI}?tillDate=${weekDateFormattedFromObject(tillDate, 1)}`, {
    method: 'DELETE',
    headers: {
      'X-AUTH-TOKEN': authToken
    }
  }).then(r => ({
    status: r.status
  }))

export const duplicateWholeWeekMenu = (authToken, udm) =>
  fetch(`${USERS_MENU_CUSTOM_URI}/duplicate_whole_week?date=${udm.date}&userId=${udm.user.id}&menuId=${udm.menu.id}`, {
    method: 'POST',
    headers: {
      'X-AUTH-TOKEN': authToken
    }
  }).then(r => ({
    status: r.status
  }))

export const putUserAuthorities = (authToken, user) => fetch(USER_AUTHORITIES_URI({id: user.id}), {
  method: 'PUT',
  headers: {
    'Content-Type': 'text/uri-list',
    'X-AUTH-TOKEN': authToken
  },
  body: user.authorities.join('\n')
}).then(r => ({
  status: r.status
}))

export const getSession = (data) => fetch(LOGIN_URI, {
  method: 'POST',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json; charset=utf-8',
    'Access-Control-Expose-Headers': 'X-AUTH-TOKEN'
  },
  body: JSON.stringify(data)
}).then(r => ({
  status: r.status,
  auth_token: r.headers.get('X-AUTH-TOKEN')
}))

export const signUp = (user) => fetch(USERS_URI, {
  method: 'POST',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json; charset=utf-8'
  },
  body: JSON.stringify(user)
}).then(r => ({
  status: r.status
}))
