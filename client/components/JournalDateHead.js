const JournalDateHead = (props) => {
  return (
    <div key={props.date}>
      <p className='lead'>
        <b>{props.date}</b>
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

export default JournalDateHead
