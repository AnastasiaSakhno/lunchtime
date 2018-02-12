import Repoint from 'repoint'

// TODO change host
const repoint = new Repoint({host: 'http://localhost:8080/api'})
export const restaurantsAPI = repoint.generate('restaurants')

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
