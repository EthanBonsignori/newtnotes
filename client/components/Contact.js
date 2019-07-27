import React, { Component } from 'react'

class Contact extends Component {
  render () {
    return (
      <div style={{ border: '1px solid #777', marginTop: '-1px' }}>
        <p>{this.props.contact.name}</p>
        <p>{this.props.contact.email}</p>
        <p>{this.props.contact.phone}</p>
      </div>
    )
  }
}

export default Contact
