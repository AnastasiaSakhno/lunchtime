import mammoth from 'mammoth'

import {LOGIN_URI, USERS_MENU_URI, USERS_URI, MENU_DOCUMENTS_UPLOAD_URI, USERS_MENU_CUSTOM_URI} from './api'
import {weekDateFormattedFromObject} from './date'
import decode from 'jwt-decode'

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
    Authorization: authToken
  },
  body: JSON.stringify(data)
})

export const get = path => apiCall(path, {
  method: 'GET'
})

export const del = (path, authToken) => apiCall(path, {
  method: 'DELETE',
  headers: {
    Accept: 'application/json',
    Authorization: authToken
  }
})

export const put = (path, authToken, data) => apiCall(path, {
  method: 'PUT',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json; charset=utf-8',
    Authorization: authToken
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
      Authorization: user.auth_token
    }
  })
}

export const putUserDayMenu = (authToken, udm) => fetch(`${USERS_MENU_URI}/${udm.id}/menu`, {
  method: 'PUT',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'text/uri-list',
    Authorization: authToken
  },
  body: udm.menu
}).then(r => ({
  status: r.status
}))

export const deleteUserDayMenuTill = (authToken, tillDate) =>
  fetch(`${USERS_MENU_CUSTOM_URI}?tillDate=${weekDateFormattedFromObject(tillDate, 1)}`, {
    method: 'DELETE',
    headers: {
      Authorization: authToken
    }
  }).then(r => ({
    status: r.status
  }))

export const getSession = (data) => fetch(LOGIN_URI, {
  method: 'POST',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json; charset=utf-8',
    'Access-Control-Expose-Headers': 'Authorization'
  },
  body: JSON.stringify(data)
}).then(r => ({
  status: r.status,
  auth_token: r.headers.get('Authorization')
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


export const isTokenExpired = (token) => {
  try {
    const decoded = decode(token)
    return decoded.exp < Date.now() / 1000
  } catch (err) {
    return true
  }
}
