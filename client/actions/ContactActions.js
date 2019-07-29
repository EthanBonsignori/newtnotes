import dispatcher from '../dispatcher'

export function contactTagUpdate (contacts) {
  dispatcher.dispatch({
    type: 'CONTACT_TAG_UPDATE',
    contacts
  })
}

export function contactTagLetters (letters) {
  dispatcher.dispatch({
    type: 'CONTACT_TAG_LETTERS',
    letters
  })
}
