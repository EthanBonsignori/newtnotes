import Link from 'next/link'

const Navbar = () => (
  <ul>
    <li><Link href='/'><a>Home</a></Link></li>
    <li><Link href='/journal'><a>Journal</a></Link></li>
    <li><Link href='/contacts'><a>Contacts</a></Link></li>
    <li><Link href='/newjournal'><a>Create Journal Entry</a></Link></li>
    <li><Link href='/newcontact'><a>Create Contact</a></Link></li>
  </ul>
)

export default Navbar
