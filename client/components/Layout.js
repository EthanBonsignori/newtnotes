import Head from 'next/head'
import MyNavbar from './MyNavbar'
import PlusButton from '../components/PlusButton'

const Layout = (props) => (
  <div>
    <Head>
      <meta name='viewport' content='width=device-width, initial-scale=1' />
      <meta charSet='utf-8' />
      <title>{props.title}</title>
      <link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/quill/1.3.6/quill.snow.css' />
    </Head>
    <MyNavbar />
    <div className='page-container'>
      {props.children}
      <PlusButton />
    </div>
  </div>

)

export default Layout
