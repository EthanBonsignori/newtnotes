import React, { Component } from 'react'
import Layout from '../components/Layout'
import ReactHtmlParser from 'react-html-parser'

class Journal extends Component {
  constructor (props) {
    super(props)
    this.state = { journals: [] }
  }

  async componentWillMount () {
    try {
      const rawResponse = await window.fetch('http://localhost:3001/journal', { method: 'GET' })
      const journals = await rawResponse.json()
      this.setState({ journals })
      console.log(this.state)
    } catch (err) {
      console.log(err)
    }
  }

  render () {
    return (
      <Layout title='Newtnotes | Journal'>
        <div>
          <h1>Journal</h1>
          {this.state.journals.map(journal => (
            <div style={{ border: '1px solid black' }}>
              {ReactHtmlParser(journal.journal)}
            </div>
          )
          )}
        </div>
      </Layout>
    )
  }
}

export default Journal
