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
          console.log('got @ key')
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
