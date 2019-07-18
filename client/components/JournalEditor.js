import React, { Component } from 'react'

class JournalEditor extends Component {
  constructor (props) {
    super(props)
    this.state = { journal: '' }
    if (typeof window !== 'undefined') {
      this.ReactQuill = require('react-quill')
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline','strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
      ['link', 'image'],
      [{ align: '' }, { align: 'center' }, { align: 'right' }, { align: 'justify' }],
      [{ 'color': [] }, { 'background': [] }],
    ],
  }

  formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image',
    'align', 'color', 'background'
    
  ]

  handleChange (value) {
    const journal = value
    this.setState({ journal })
  }

  async handleSubmit (event) {
    event.preventDefault()
    const newJournal = this.state
    try {
      const rawResponse = await window.fetch('http://localhost:3001/journal', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newJournal)
      })
      const content = await rawResponse.json()
      console.log(content)
    } catch (err) {
      console.log(err)
    }
  }

  render () {
    const ReactQuill = this.ReactQuill
    return typeof window !== 'undefined' && ReactQuill ? (
      <div>
        <ReactQuill
          value={this.state.journal}
          onChange={this.handleChange}
          modules={this.modules}
          formats={this.formats}
        />
        <button onClick={this.handleSubmit}>Save</button>
      </div>
    ) : null
  }
}

export default JournalEditor
