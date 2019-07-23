import { EventEmitter } from 'events'
import dispatcher from '../dispatcher'

class UserStore extends EventEmitter {
  constructor () {
    super()

    this.user = {}
  }

  setUser (user) {
    this.user = user

    this.emit('user change')
  }

  resetUser () {
    this.user = {}

    this.emit('user change')
  }

  handleActions (action) {
    switch (action.type) {
      case 'USER_LOGIN':
        return this.setUser(action.user)
      case 'USER_LOGOUT':
        return this.resetUser()
    }
  }
}

const userStore = new UserStore()
dispatcher.register(userStore.handleActions.bind(userStore))

export default userStore
