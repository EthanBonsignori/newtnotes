import React, { Component } from 'react'

class ContactInput extends Component {
  constructor (props) {
    super(props)
    this.state = {
      name: '',
      nickname: '',
      phone: '',
      email: ''
    }

    this.handleNameChange = this.handleNameChange.bind(this)
    this.handleNicknameChange = this.handleNicknameChange.bind(this)
    this.handlePhoneChange = this.handlePhoneChange.bind(this)
    this.handleEmailChange = this.handleEmailChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleNameChange (event) {
    this.setState({ name: event.target.value })
  }

  handleNicknameChange (event) {
    this.setState({ nickname: event.target.value })
  }

  handlePhoneChange (event) {
    this.setState({ phone: event.target.value })
  }

  handleEmailChange (event) {
    this.setState({ email: event.target.value })
  }

  async handleSubmit (event) {
    event.preventDefault()
    const newContact = this.state
    try {
      const rawResponse = await window.fetch('http://localhost:3001/contact', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newContact)
      })
      const content = await rawResponse.json()
      console.log(content)
    } catch (err) {
      console.log(err)
    }
  }

  render () {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:{' '}
          <input type='text' value={this.state.name} onChange={this.handleNameChange} />
        </label>
        <br />
        <label>
          Nickname:{' '}
          <input type='text' value={this.state.nickname} onChange={this.handleNicknameChange} />
        </label>
        <br />
        <label>
          Phone:{' '}
          <input type='text' value={this.state.phone} onChange={this.handlePhoneChange} />
        </label>
        <br />
        <label>
          Email:{' '}
          <input type='text' value={this.state.email} onChange={this.handleEmailChange} />
        </label>
        <br />
        <input type='submit' value='Submit' />
      </form>
    )
  }
}

export default ContactInput
