const url = 'http://localhost:3001'

const API = {
  getUser: async () => {
    try {
      const response = await window.fetch(`${url}/auth/user`, { method: 'GET' })
      if (response.ok) {
        const user = await response.json()
        return user
      } else console.log(response)
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
      } else console.log(response)
    } catch (error) {
      console.log(error)
    }
  },

  postJournal: async (journal) => {
    try {
      const response = await window.fetch(`${url}/api/journal`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: journal
      })
      if (response.ok) {
        const content = await response.json()
        console.log(content)
      } else console.log(response)
    } catch (error) {
      console.log(error)
    }
  },

  getContact: async (id) => {
    try {
      const response = await window.fetch(`${url}/api/contact/${id}`, { method: 'GET' })
      if (response.ok) {
        const contact = await response.json()
        return contact
      } else console.log(response)
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
      } else console.log(response)
    } catch (error) {
      console.log(error)
    }
  },

  getContactsByQuery: async (query) => {
    try {
      if (query === '') return
      const response = await window.fetch(`${url}/api/contact/query/${query}`, { method: 'GET' })
      if (response.ok) {
        const contacts = await response.json()
        return contacts
      } else console.log(response)
    } catch (error) {
      console.log(error)
    }
  },

  postContact: async (contact) => {
    try {
      const response = await window.fetch(`${url}/api/contact`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(contact)
      })
      if (response.ok) {
        const content = await response.json()
        console.log(content)
      } else console.log(response)
    } catch (error) {
      console.log(error)
    }
  },

  putContact: async (contact) => {
    try {
      const response = await window.fetch(`${url}/api/contact/${contact._id}`, {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(contact)
      })
      if (response.ok) {
        const content = await response.json()
        console.log(content)
      } else console.log(response)
    } catch (error) {
      console.log(error)
    }
  }
}

export default API
