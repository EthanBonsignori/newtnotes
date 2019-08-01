const { API_URL } = require('../config')

const API = {
  getUser: async () => {
    try {
      const response = await window.fetch(`${API_URL}/auth/user`, { method: 'GET' })
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
      const response = await window.fetch(`${API_URL}/api/journal`, { method: 'GET' })
      if (response.ok) {
        const journals = await response.json()
        return journals
      } else console.log(response)
    } catch (error) {
      console.log(error)
    }
  },

  getJournal: async id => {
    try {
      const response = await window.fetch(`${API_URL}/api/journal/${id}`, { method: 'GET' })
      if (response.ok) {
        const journal = await response.json()
        return journal
      } else console.log(response)
    } catch (error) {
      console.log(error)
    }
  },

  postJournal: async (journal, title) => {
    try {
      const response = await window.fetch(`${API_URL}/api/journal`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          journal,
          title
        })
      })
      if (response.ok) {
        const content = await response.json()
        return content
      }
      return false
    } catch (error) {
      console.log(error)
    }
    return false
  },

  putJournal: async (id, journal, title) => {
    try {
      const response = await window.fetch(`${API_URL}/api/journal/${id}`, {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          journal,
          title
        })
      })
      if (response.ok) {
        const content = await response.json()
        return content
      } else console.log(response)
    } catch (error) {
      console.log(error)
      return false
    }
    return false
  },

  deleteJournal: async (id) => {
    try {
      const response = await window.fetch(`${API_URL}/api/journal/${id}`, {
        method: 'DELETE'
      })
      if (response.ok) {
        const content = await response.json()
        return content
      } else console.log(response)
    } catch (error) {
      console.log(error)
      return false
    }
    return false
  },

  getContact: async (id) => {
    try {
      const response = await window.fetch(`${API_URL}/api/contact/${id}`, { method: 'GET' })
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
      const response = await window.fetch(`${API_URL}/api/contact`, { method: 'GET' })
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
      const response = await window.fetch(`${API_URL}/api/contact/query/${query}`, { method: 'GET' })
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
      const response = await window.fetch(`${API_URL}/api/contact`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(contact)
      })
      if (response.ok) {
        // const content = await response.json()
        return true
      } else console.log(response)
    } catch (error) {
      console.log(error)
      return false
    }
    return false
  },

  putContact: async (contact) => {
    try {
      const response = await window.fetch(`${API_URL}/api/contact/${contact._id}`, {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(contact)
      })
      if (response.ok) {
        // const content = await response.json()
        return true
      } else console.log(response)
    } catch (error) {
      console.log(error)
      return false
    }
    return false
  },

  deleteContact: async (id) => {
    try {
      const response = await window.fetch(`${API_URL}/api/contact/${id}`, {
        method: 'DELETE'
      })
      if (response.ok) {
        const content = await response.json()
        return content
      } else console.log(response)
    } catch (error) {
      console.log(error)
      return false
    }
    return false
  }
}

export default API
