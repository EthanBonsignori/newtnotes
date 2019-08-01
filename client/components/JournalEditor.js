import React, { Component } from 'react'
import MdSave from '@material-ui/icons/Save'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Spinner from 'react-bootstrap/Spinner'
import API from '../utils/API'
import ContactPopup from './ContactPopup'
import { modules, formats } from '../config/quillConfig'
import { DEFAULT_JOURNAL_TITLE } from '../config'

let ReactQuill = null
class JournalEditor extends Component {
  constructor (props) {
    super(props)

    this.state = {
      id: undefined, // when id is present we are editing
      journal: '',
      title: undefined,
      loaded: false,
      index: undefined,
      submitting: false,
      error: undefined
    }

    this.handleChangeEditor = this.handleChangeEditor.bind(this)
    this.handleChangeTitle = this.handleChangeTitle.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.attachQuillRefs = this.attachQuillRefs.bind(this)

    this.reactQuillRef = null // ReactQuill component
    this.quill = null // Quill Helper
  }

  handleChangeEditor (value) {
    if (!this.quill) return null
    const journal = value
    let index
    const selection = this.quill.getSelection()
    if (selection) index = selection.index
    this.setState({ journal, index })
  }

  handleChangeTitle (event) {
    const title = event.target.value
    this.setState({ title })
  }

  async handleSubmit (event) {
    event.preventDefault()
    this.setState({ submitting: true })

    let res
    if (!this.state.id) {
      res = await API.postJournal(this.state.journal, this.state.title || DEFAULT_JOURNAL_TITLE)
    } else {
      res = await API.putJournal(this.state.id, this.state.journal, this.state.title || DEFAULT_JOURNAL_TITLE)
    }

    let error
    let id = this.state.id
    if (res && res.journal) {
      id = res.journal._id
    } else {
      error = 'Unable to save journal entry'
    }
    this.setState({
      id,
      submitting: false,
      error
    })
  }

  attachQuillRefs () {
    if (typeof this.reactQuillRef.getEditor !== 'function') return
    this.quill = this.reactQuillRef.getEditor()
  }

  componentDidMount () {
    if (typeof window !== 'undefined') {
      ReactQuill = require('react-quill')
      this.setState({
        loaded: true
      }, () => {
        this.attachQuillRefs()
      })
    }

    if (this.props && this.props.journal) {
      this.setState({
        id: this.props.id,
        journal: this.props.journal,
        title: this.props.title
      })
    }
  }

  componentDidUpdate () {
    if (typeof window !== 'undefined') {
      this.attachQuillRefs()
    }
  }

  render () {
    let view = 'Loading'

    if (this.state.loaded) {
      view = <>
        <div className='journal-wrapper'>
          <div className='top-bar'>
            <input
              className='input-title'
              type='text'
              placeholder='Title...'
              value={this.state.title}
              onChange={this.handleChangeTitle}
            />
          </div>
          {ReactQuill ? <ReactQuill
            ref={element => { this.reactQuillRef = element }}
            modules={modules}
            formats={formats}
            value={this.state.journal}
            onChange={this.handleChangeEditor}
          /> : ''}
          <Row className='align-items-center'>
            <Col sm={11} xs={11} className='pr-0'>
              <ContactPopup
                quill={this.quill}
                index={this.state.index}
              />
            </Col>
            <Col sm={1} xs={1} className='pl-0 align-self-center'>
              {!this.state.submitting ? <Button variant='outline-secondary' style={{ padding: '0 1rem' }} onClick={this.handleSubmit}>
                <span><MdSave /> Save</span>
              </Button> : <div className='text-center'><Spinner animation='border' /></div>}
            </Col>
          </Row>
        </div>
        <style jsx>{`
          .input-title {
            border: none;
            outline: none;
            height: 5vh;
          }
          .journal-wrapper {
            height 78vh;
          }
          .top-bar {
            min-height: 5vh;
            border: 1px solid #CCCCCC;
            border-bottom: none;
            padding: 0 16px;
          }
          .bottom-bar {
            min-height: 5vh;
            width: 100%;
            border: 1px solid #CCCCCC;
            border-top: none;
            padding: 0 16px;
          }
          .popup-placeholder {
            display: inline;
            height: 5vh;
          }
        `}</style>
      </>
    }

    return (<>{view}</>)
  }
}

export default JournalEditor
