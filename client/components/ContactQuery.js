import React, { Component } from 'react'

class ContactQuery extends Component {
  constructor (props) {
    super(props)

    this.state = {
      value: ''
    }

    this.handleChange = this.handleChange.bind(this)
  }

  async handleChange (event) {
    const value = event.target.value
    await this.setState({ value })
    const rawResponse = await window.fetch(`http://localhost:3001/contact/${this.state.value}`, { method: 'GET' })
    const contacts = await rawResponse.json()
    console.log(contacts)
  }

  render () {
    return (
      <div>
        <input value={this.state.value} onChange={this.handleChange} />
      </div>
    )
  }
}

export default ContactQuery
