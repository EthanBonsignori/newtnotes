
const db = {
  nameQuery: async (query) => {
    if (query === '') return [{ name: 'No results', id: '000000' }]
    let url = `/contact/${query}`
    if (process.env.NODE_ENV === 'development') url = `http://localhost:3001/contact/${query}`
    const rawResponse = await window.fetch(url, { method: 'GET' })
    const contacts = await rawResponse.json()
    return contacts
  }
}

export default db
