export const apiCall = (path, options) => (
  fetch(path, options)
    .then(r => r.json())
)

export const post = (path, authToken, data = {}) => apiCall(path, {
  method: 'POST',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json; charset=utf-8',
    'Authorization': authToken
  },
  body: JSON.stringify(data)
})

export const get = path => apiCall(path, {
  method: 'GET'
})

export const del = path => apiCall(path, {
  method: 'DELETE'
})

export const put = (path, data) => apiCall(path, {
  method: 'PUT',
  body: JSON.stringify(data)
})


export const getSession = (data) => fetch('/login', {
  method: 'POST',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json; charset=utf-8',
    'Access-Control-Expose-Headers': 'Authorization'
  },
  body: JSON.stringify(data)
})
  .then(r => ({
    status: r.status,
    auth_token: r.headers.get('Authorization')
  }))