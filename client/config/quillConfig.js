import db from '../utils/db'
import * as actions from '../actions/ContactActions'

export const modules = {
  toolbar: [
    [{ 'header': [1, 2, 3, false] }],
    ['bold', 'italic', 'underline', 'strike'],
    [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
    ['link', 'image'],
    [{ align: '' }, { align: 'center' }, { align: 'right' }, { align: 'justify' }],
    [{ 'color': [] }, { 'background': [] }]
  ],
  keyboard: {
    bindings: {
      custom: {
        key: 50,
        shiftKey: true,
        handler: function () {
          const selection = this.quill.getSelection()
          this.quill.insertText(selection.index, '@')
          let query = ''
          this.quill.on('text-change', async (delta) => {
            const change = delta.ops[1] || delta.ops[0]
            if ('insert' in change) {
              if (change.insert === ' ') return this.quill.off('text-change')
              query = query + change.insert
              const contacts = await db.nameQuery(query)
              actions.updateContacts(contacts)
            }
            if ('delete' in change) {
              if (query === '') return this.quill.off('text-change')
              query = query.slice(0, -change.delete)
              const contacts = await db.nameQuery(query)
              actions.updateContacts(contacts)
            }
          })
        }
      }
    }
  }
}

export const formats = [
  'header',
  'bold', 'italic', 'underline', 'strike',
  'list', 'bullet', 'indent',
  'link', 'image',
  'align', 'color', 'background'
]
