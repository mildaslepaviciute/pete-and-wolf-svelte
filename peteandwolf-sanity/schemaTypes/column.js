export default {
  name: 'column',
  title: 'Column',
  type: 'object',  // Using 'object' instead of 'document' makes it a subtype
  fields: [
    {
      name: 'type',
      title: 'Content Type',
      type: 'string',
      options: {
        list: [
          { title: 'Text', value: 'text' },
          { title: 'Image', value: 'image' },
          { title: 'Audio', value: 'audio' }
        ]
      }
    },
    {
      name: 'textContent',
      title: 'Text Content',
      type: 'array',
      of: [{ type: 'block' }],
      hidden: ({ parent }) => parent?.type !== 'text'
    },
    {
      name: 'imageContent',
      title: 'Image',
      type: 'image',
      hidden: ({ parent }) => parent?.type !== 'image'
    },
    {
      name: 'audioContent',
      title: 'Audio',
      type: 'file',
      hidden: ({ parent }) => parent?.type !== 'audio'
    }
  ]
}