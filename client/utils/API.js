const url = 'http://localhost:3001'

const API = {
  getUser: async () => {
    try {
      const response = await window.fetch(`${url}/auth/user`, { method: 'GET' })
      if (response.ok) {
        const user = await response.json()
        return user
      } else return { error: 'Error retriving user' }
    } catch (error) {
      console.log(error)
    }
  },

  getJournals: async () => {
    try {
      const response = await window.fetch(`${url}/api/journal`, { method: 'GET' })
      if (response.ok) {
        const journals = await response.json()
        return journals
      } else return { error: 'error retrieving contacts' }
    } catch (error) {
      console.log(error)
    }
  },

  getContacts: async () => {
    try {
      const response = await window.fetch(`${url}/api/contact`, { method: 'GET' })
      if (response.ok) {
        const contacts = await response.json()
        return contacts
      } else return { error: 'error retrieving contacts' }
    } catch (error) {
      console.log(error)
    }
  },

  getContactsFromQuery: async (query) => {
    try {
      if (query === '') return
      const response = await window.fetch(`${url}/api/contact/${query}`, { method: 'GET' })
      if (response.ok) {
        const contacts = await response.json()
        return contacts
      } else return { error: 'error retrieving contacts based on query' }
    } catch (error) {
      console.log(error)
    }
  }
}

export default API
