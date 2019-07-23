import React, { Component } from 'react'
import contactStore from '../stores/contactStore'

class ContactPopup extends Component {
  constructor (props) {
    super(props)

    this.state = {
      contacts: contactStore.getAll()
    }
  }

  componentWillMount () {
    contactStore.on('change', () => {
      this.setState({
        contacts: contactStore.getAll()
      })
    })
  }

  render () {
    const contacts = this.state.contacts
    return contacts ? (
      <div className='contact-popup'>
        {this.state.contacts.map(contact => {
          console.log(contact)
          return (<li key={contact.id}>{contact.name}</li>)
        }
        )}
        <style jsx>{`
          .contact-popup {
            position: fixed;
            top: 10px;
            left: 50%;
            transform: translate(-50%, 0);
          }

          .contact-popup li {
            list-style: none;
            border: 1px solid black;
            padding: 5px;
            background-color: #9999;
          }
        `}</style>
      </div>
    ) : null
  }
}

export default ContactPopup
