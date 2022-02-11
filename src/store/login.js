const crypto = require('crypto')

export const moduleLogin = {
  state:{
    token: localStorage.getItem('token') || '',
    users: [
      {
        "login": "user",
        "password": "user"
      },
      {
        "login": "admin",
        "password": "admin"
      }
    ]
  },
  mutations: {
    LOGIN(state, token) {
      localStorage.setItem('token', token)
      state.token = token
    },
    LOGOUT(state) {
      localStorage.removeItem('token')
      state.token = ''
    },
  },
  getters: {
    IS_AUTHENTICATED: state => state.token.length > 0,
    GET_TOKEN: state => state.token,
    GET_USERS: state => state.users,
  },
  actions: {
    LOGIN({getters, commit}, {login, password}) {
      let allowed = false
      getters.GET_USERS.some((user) => {
        if (user.login === login && user.password === password) {
          allowed = true
          return true
        }
        return false
      })
      if (!allowed) return allowed

      const token = crypto.createHash('sha256').update(login).digest('hex')
      commit('LOGIN', token)
      return allowed
    },
    LOGOUT({commit}) {
      commit('LOGOUT')
    },
  },
}
