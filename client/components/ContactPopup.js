import React, { Component } from 'react'
import contactStore from '../stores/contactStore'

class ContactPopup extends Component {
  constructor (props) {
    super(props)

    this.state = {
      contacts: contactStore.getContacts(),
      letters: contactStore.getLetters()
    }

    this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount () {
    contactStore.on('contact_change', () => {
      this.setState({
        contacts: contactStore.getContacts()
      })
    })

    contactStore.on('letters_change', () => {
      this.setState({
        letters: contactStore.getLetters()
      })
    })
  }

  handleClick (name) {
    const newIndex = this.props.index - this.state.letters.length
    this.props.quill.deleteText(newIndex, this.state.letters.length)
    this.props.quill.insertText(newIndex, name)
    this.props.quill.setSelection(newIndex + name.length)
  }

  render () {
    return this.state.contacts.length ? (
      <div>
        {this.state.contacts.map(contact => {
          return (
            <div
              key={contact.id}
              data-name={contact.name}
              className='contact-popup'
              onClick={() => { this.handleClick(contact.name) }}
            >
              <div
                data-name={contact.name}
                className='profile-pic-frame'>
                <img
                  data-name={contact.name}
                  className='profile-pic'
                  src={contact.picture}
                  alt='profile-pic' />
              </div>
              <span
                data-name={contact.name}
                className='contact-name'>
                {contact.name}
              </span>
            </div>
          )
        }
        )}
        <style jsx>{`
          .contact-popup {
            display: inline-block;
            vertical-align: middle;
            margin: 1px;
            height: 35px;
            width: 200px;
            background-color: #444444;
            color: #fff;
            border-radius: 30px;
          }
          .contact-popup:hover {
            background-color: #555555;
            cursor: pointer;
          }
          .profile-pic-frame {
            display: inline-block;
            height: 35px;
            width: 30px;
          }
          .profile-pic {
            vertical-align: middle;
            max-width: 30px;
            max-height: 30px;
            border-radius: 30px;
            margin-left: 2px;
            margin-top: 2.5px;
          }
          .contact-name {
            display: inline-block;
            vertical-align: middle;
            width: 160px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            margin-left: 5px;
          }

        `}</style>
      </div>
    )
      : <div className='popup-placeholder'>
        <p>Type '@' to link a contact</p>
        <style jsx>{`
          .popup-placeholder {
            min-height: 5vh;
            display: inline-block;
          }
          .popup-placeholder > p {
            line-height: 5vh;
            margin: 0;
          }
        `}</style>
      </div>
  }
}

export default ContactPopup
