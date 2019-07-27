import React, { Component } from 'react'
import contactStore from '../stores/contactStore'

class ContactPopup extends Component {
  constructor (props) {
    super(props)

    this.state = {
      contacts: contactStore.getAll()
    }
  }

  componentDidMount () {
    contactStore.on('change', () => {
      this.setState({
        contacts: contactStore.getAll()
      })
    })
  }

  render () {
    const contacts = this.state.contacts
    console.log(contacts)
    return contacts ? (
      <div>
        {this.state.contacts.map(contact => {
          return (
            <div key={contact.id} className='contact-popup'>
              <div className='center'>
                <div className='profile-pic'>
                  <img src={contact.picture} alt='profile-pic' />
                </div>
                <span className='contact-name'>
                  {contact.name}
                </span>
              </div>
            </div>
          )
        }
        )}
        <style jsx>{`
          .contact-popup {
            display: inline-block;
            margin: 1px;
            height: 30px;
            width: 200px;
            background-color: #444444;
            color: #fff;
            border-radius: 30px;
          }
          .center {
            position: absolute;
          }
          .profile-pic {
            display: inline;
          }
          .profile-pic > img {
            width: 30px;
            height: 30px;
            border-radius: 30px;
            border: 1px solid #CFD0D2;
          }
          .contact-name {
            margin-left: 3px;
          }

        `}</style>
      </div>
    ) : null
  }
}

export default ContactPopup
