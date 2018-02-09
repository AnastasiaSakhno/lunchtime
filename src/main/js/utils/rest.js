export const apiCall = (path, options) => (
  fetch(path, options)
    .then(r => r.text())
    .then(r => JSON.parse(r))
)

export const post = (path, data = {}) => apiCall(path, {
  method: 'POST',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json; charset=utf-8'
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
