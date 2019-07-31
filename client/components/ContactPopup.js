import React, { Component } from 'react'
import contactStore from '../stores/contactStore'
import * as actions from '../actions/contactActions.js'

class ContactPopup extends Component {
  constructor (props) {
    super(props)

    this.state = {
      contacts: [],
      letters: ''
    }

    this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount () {
    contactStore.on('contact_change', () => {
      const contacts = contactStore.getContacts()
      if (contacts === []) this.setState({ contacts: [] })
      else this.setState({ contacts })
    })

    contactStore.on('letters_change', () => {
      const letters = contactStore.getLetters()
      if (letters === '') this.setState({ letters: '' })
      else this.setState({ letters })
    })
  }

  handleClick (name) {
    const newIndex = this.props.index - this.state.letters.length
    this.props.quill.deleteText(newIndex, this.state.letters.length)
    this.props.quill.insertText(newIndex, name)
    this.props.quill.setSelection(newIndex + name.length)
    actions.contactTagPosted()
    this.setState({
      contacts: [],
      letters: ''
    })
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
              <div className='contact-pic-wrapper'>
                <img className='contact-pic' src={contact.picture} alt='contact-pic' />
              </div>
              <span className='contact-name'>
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
          .contact-pic-wrapper {
            display: inline-block;
            height: 30px;
            width: 30px;
            border: none;
          }
          .contact-pic {
            margin-top: 2.3px;
            margin-left: 2px;
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
