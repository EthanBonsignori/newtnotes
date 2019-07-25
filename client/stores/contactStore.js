import { EventEmitter } from 'events'
import dispatcher from '../dispatcher'

class ContactStore extends EventEmitter {
  constructor () {
    super()

    this.contacts = []
  }

  setContacts (contacts) {
    this.contacts = []
    if (!contacts) return this.emit('change')
    contacts.map(contact => {
      this.contacts.push({
        id: contact._id,
        name: contact.name
      })
    })

    this.emit('change')
  }

  getAll () {
    return this.contacts
  }

  handleActions (action) {
    if (action.type === 'CONTACT_TAG_UPDATE') {
      this.setContacts(action.contacts)
    }
  }
}

const contactStore = new ContactStore()
dispatcher.register(contactStore.handleActions.bind(contactStore))

export default contactStore
