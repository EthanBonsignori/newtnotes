import React, { Component } from 'react'
import ReactHtmlParser from 'react-html-parser'
import Layout from '../components/Layout'
import API from '../utils/API'

class Journal extends Component {
  constructor (props) {
    super(props)
    this.state = { journals: [] }
  }

  async componentDidMount () {
    const journals = await API.getJournals()
    this.setState({ journals })
  }

  render () {
    return (
      <Layout title='Newtnotes | Journal'>
        <div>
          <h1>Journal</h1>
          <div className='ql-editor'>
            {this.state.journals.map(journal => (
              <div key={journal._id} style={{ border: '1px solid black' }}>
                {ReactHtmlParser(journal.journal)}
              </div>
            )
            )}
          </div>
        </div>
      </Layout>
    )
  }
}

export default Journal
