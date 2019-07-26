import dispatcher from '../dispatcher'

export function contactTagUpdate (contacts) {
  dispatcher.dispatch({
    type: 'CONTACT_TAG_UPDATE',
    contacts
  })
}
