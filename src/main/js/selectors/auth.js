export const getCurrentUser = (state) => state.users.find((u) => (u.username === state.session.user.email))
