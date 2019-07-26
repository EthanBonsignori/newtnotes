import React, { Component, useRef } from 'react'
import dynamic from 'next/dynamic'
const ReactQuill = dynamic(import('react-quill'), { ssr: false})
import API from '../utils/API'
import ContactPopup from './ContactPopup'
import { modules, formats } from '../config/quillConfig'

class JournalEditor extends Component {
  constructor (props) {
    super(props)

    this.state = { journal: '' }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange (value) {
    const journal = value
    this.setState({ journal })
  }


  async handleSubmit (event) {
    event.preventDefault()
    const journal = JSON.stringify(this.state)
    API.postJournal(journal)
  }

  render () {
    return typeof window !== 'undefined' && ReactQuill ? (
      <div>
        <ContactPopup />
        <ReactQuill
          value={this.state.journal}
          onChange={this.handleChange}
          modules={modules}
          formats={formats}
        />
        <button onClick={this.handleSubmit}>Save</button>
      </div>
    ) : <h1>Error loading journal editor</h1>
  }
}

export default JournalEditor
