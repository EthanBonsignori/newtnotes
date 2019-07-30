import { EventEmitter } from 'events'
import dispatcher from '../dispatcher'

class ContactStore extends EventEmitter {
  constructor () {
    super()

    this.contacts = []
    this.letters = ''
    this.contact = undefined
  }

  setContacts (contacts) {
    this.contacts = []
    if (!contacts) return this.emit('contact_change')
    contacts.map(contact => {
      this.contacts.push({
        id: contact._id,
        name: contact.name,
        picture: contact.imageUrl
      })
    })
    this.emit('contact_change')
  }

  setLetters (letters) {
    this.letters = letters
    this.emit('letters_change')
  }

  setContact (contact) {
    this.contact = contact
    this.emit('contact_modal')
  }

  resetContact () {
    this.contact = {}
  }

  getContacts () {
    return this.contacts
  }

  getLetters () {
    return this.letters
  }

  getContact () {
    return this.contact
  }

  handleActions (action) {
    switch (action.type) {
      case 'CONTACT_TAG_LETTERS':
        return this.setLetters(action.letters)
      case 'CONTACT_TAG_UPDATE':
        return this.setContacts(action.contacts)
      case 'CONTACT_MODAL_OPEN':
        return this.setContact(action.contact)
      case 'CONTACT_INPUT_UNMOUNT':
        return this.resetContact()
    }
  }
}

const contactStore = new ContactStore()
dispatcher.register(contactStore.handleActions.bind(contactStore))

export default contactStore
