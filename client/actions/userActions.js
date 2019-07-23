import dispatcher from '../dispatcher'

export function userLogin (user) {
  dispatcher.dispatch({
    type: 'USER_LOGIN',
    user
  })
}

export function userLogout () {
  dispatcher.dispatch({
    type: 'USER_LOGOUT'
  })
}
