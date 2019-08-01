const ContactLetterHead = (props) => {
  return (
    <div key={props.letter}>
      <p className='lead'>
        <b>{props.letter}</b>
      </p>
      <hr />
      <style jsx>{`
          p {
            margin: 0;
          }
          hr {
            margin-top: 0;
          }
        `}</style>
    </div>
  )
}

export default ContactLetterHead
