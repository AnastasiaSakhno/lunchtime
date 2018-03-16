export const getCurrentUser = (state) => state.users.find((u) => (u.email === state.session.user.email))
