import React, { Component } from 'react'

class ContactLetterHead extends Component {
  render () {
    return (
      <div>
        <p className='lead'>
          <b>{this.props.letter}</b>
        </p>
        <hr />
        <style jsx>{`
          p {
            margin: 0;
          }
          hr {
            margin-top: 0;
          }
        `}</style>
      </div>
    )
  }
}

export default ContactLetterHead
