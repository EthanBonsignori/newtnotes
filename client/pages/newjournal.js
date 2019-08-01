import Layout from '../components/Layout'
import JournalEditor from '../components/JournalEditor'
import API from '../utils/API'

const NewJournal = props => (
  <Layout title='Newtnotes | Entry'>
    <JournalEditor journal={props.journal} id={props.id} title={props.title} />
  </Layout>
)

NewJournal.getInitialProps = async ({ query }) => {
  if (query && query.id) {
    const res = await API.getJournal(query.id)
    return { journal: res.journal, title: res.title, id: res._id }
  }
  return { }
}

export default NewJournal
