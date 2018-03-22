import { createSelector } from 'reselect'
import {compose, filter, prepend, prop, sortBy, toLower} from 'ramda'

import {getCurrentUser} from './auth'

export const getUsers = (state) => state.users

export const orderedUsers = createSelector(
  [getCurrentUser, getUsers],
  (currentUser, users) => {
    let result = sortBy(compose(toLower, prop('fullName')))(users)
    result = filter(u => u.id !== currentUser.id, result)
    return prepend(currentUser, result)
  }
)
