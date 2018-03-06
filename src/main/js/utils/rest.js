import {LOGIN_URI, USERS_MENU_URI, MENU_DOCUMENTS_URI} from './api'
import mammoth from 'mammoth'

export const apiCall = (path, options) => (
  fetch(path, options)
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

export const getMenuDocumentContent = (md) => fetch(`${MENU_DOCUMENTS_URI}/${md.uuid}`, {
  method: 'GET',
  responseType: 'arraybuffer'
}).then(r => r.arrayBuffer())
  .then(buffer => mammoth.convertToHtml(
    {arrayBuffer: buffer},
    {includeDefaultStyleMap: true}
  ))
  .then((r) => r.value.toString())

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
