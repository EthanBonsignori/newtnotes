import React, { Component } from 'react'
import dynamic from 'next/dynamic'
const ReactQuill = dynamic(import('react-quill'), { ssr: false})
const Quill = ReactQuill.Quill

class JournalEditor extends Component {
  constructor (props) {
    super(props)
    this.state = { journal: '' }
    // if (typeof window !== 'undefined') {
    //   this.ReactQuill = require('react-quill')
    // }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.getPosition = this.getPosition.bind(this)
  }

  modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline','strike'],
      [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
      ['link', 'image'],
      [{ align: '' }, { align: 'center' }, { align: 'right' }, { align: 'justify' }],
      [{ 'color': [] }, { 'background': [] }],
    ],
  }

  formats = [
    'header',
    'bold', 'italic', 'underline', 'strike',
    'list', 'bullet', 'indent',
    'link', 'image',
    'align', 'color', 'background' 
  ]

  componentDidMount() {
    console.log(Quill)
  }

  handleChange (value) {
    const journal = value
    this.setState({ journal })
  }

  getPosition (event) {
    // const { Quill } = this.ReactQuill
    const range = Quill.getSelection()
    console.log(range)
    console.log('Caret at: ', event.target)
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
    return (
      <div>
        <ReactQuill
          value={this.state.journal}
          onChange={this.handleChange}
          modules={this.modules}
          formats={this.formats}
          onKeyUp={this.getPosition}
        />
        <button onClick={this.handleSubmit}>Save</button>
      </div>
    ) // : <h1>ReactQuill not loaded</h1>
  }
}

export default JournalEditor
