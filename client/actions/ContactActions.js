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

export function contactModalOpen (contact) {
  dispatcher.dispatch({
    type: 'CONTACT_MODAL_OPEN',
    contact
  })
}

export function contactInputUnmount () {
  dispatcher.dispatch({
    type: 'CONTACT_INPUT_UNMOUNT'
  })
}
