import Layout from '../components/Layout'
import Link from 'next/link'

const Auth = () => (
  <Layout title='Newtnotes | Login'>
    <h1>Login</h1>
    <Link href='http:localhost:3001/auth/google'><a>Login with Google</a></Link>
  </Layout>
)

export default Auth
