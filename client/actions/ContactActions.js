import dispatcher from '../dispatcher'

export function updateContacts (contacts) {
  dispatcher.dispatch({
    type: 'CONTACT_TAG_UPDATE',
    contacts
  })
}
