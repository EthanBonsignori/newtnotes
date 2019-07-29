import { EventEmitter } from 'events'
import dispatcher from '../dispatcher'

class ContactStore extends EventEmitter {
  constructor () {
    super()

    this.contacts = []
    this.letters = ''
  }

  setContacts (contacts) {
    this.contacts = []
    if (!contacts) return this.emit('contact_change')
    contacts.map(contact => {
      this.contacts.push({
        id: contact._id,
        name: contact.name,
        picture: contact.profilePicture
      })
    })
    this.emit('contact_change')
  }

  setLetters (letters) {
    this.letters = letters
    this.emit('letters_change')
  }

  getContacts () {
    return this.contacts
  }

  getLetters () {
    return this.letters
  }

  handleActions (action) {
    switch (action.type) {
      case 'CONTACT_TAG_LETTERS':
        return this.setLetters(action.letters)
      case 'CONTACT_TAG_UPDATE':
        return this.setContacts(action.contacts)
    }
  }
}

const contactStore = new ContactStore()
dispatcher.register(contactStore.handleActions.bind(contactStore))

export default contactStore
