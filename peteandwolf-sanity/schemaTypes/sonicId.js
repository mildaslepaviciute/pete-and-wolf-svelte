// schemas/documents/sonicIdProject.js
export default {
    name: 'sonicIdProject',
    title: 'Sonic ID Project',
    type: 'document',
    fields: [
      {
        name: 'title',
        title: 'Title',
        type: 'string',
        validation: Rule => Rule.required()
      },
      {
        name: 'slug',
        title: 'Slug',
        type: 'slug',
        options: {
          source: 'title',
          maxLength: 200
        },
        validation: Rule => Rule.required()
      },
      {
        name: 'description',
        title: 'Description',
        type: 'text',
        validation: Rule => Rule.required()
      },
      // {
      //   name: 'thumbnail',
      //   title: 'Thumbnail Image',
      //   type: 'image',
      //   options: {
      //     hotspot: true
      //   },
      //   fields: [
      //     {
      //       name: 'alt',
      //       title: 'Alt Text',
      //       type: 'string'
      //     }
      //   ],
      //   validation: Rule => Rule.required()
      // },
      {
        name: 'thumbnail',
        title: 'Thumbnail',
        type: 'object',
        fields: [
          {
            name: 'type',
            title: 'Type',
            type: 'string',
            options: {
              list: [
                { title: 'Image', value: 'image' },
                { title: 'Video ID', value: 'video' }
              ],
              layout: 'radio'
            },
            validation: Rule => Rule.required()
          },
          {
            name: 'image',
            title: 'Image',
            type: 'image',
            options: {
              hotspot: true
            },
            hidden: ({ parent }) => parent?.type !== 'image'
          },
          {
            name: 'videoId',
            title: 'Video ID',
            type: 'string',
            hidden: ({ parent }) => parent?.type !== 'video'
          },
        ]
      },
      {
        name: 'sections',
        title: 'Sections',
        type: 'array',
        of: [{
          type: 'object',
          fields: [
            {
              name: 'title',
              title: 'Section Title',
              type: 'string'
            },
            {
              name: 'titleAlignment',
              title: 'Section Title Alignment',
              type: 'string',
              options: {
                list: [
                  { title: 'Left', value: 'left' },
                  { title: 'Center', value: 'center' },
                  { title: 'Right', value: 'right' },
                ]
              },
            },
            {
              name: 'blocks',
              title: 'Content Blocks',
              type: 'array',
              of: [{
                type: 'object',
                fields: [
                  {
                    name: 'grid',
                    title: 'Grid Layout',
                    type: 'number',
                    options: {
                      list: [
                        {title: 'Single Column', value: 1},
                        {title: 'Two Columns', value: 2},
                        {title: 'Three Columns', value: 3}
                      ]
                    }
                  },
                  {
                    name: 'col_1',
                    title: 'Column 1',
                    type: 'column'
                  },
                  {
                    name: 'col_2',
                    title: 'Column 2',
                    type: 'column',
                    hidden: ({parent}) => parent?.grid === 1
                  },
                  {
                    name: 'col_3',
                    title: 'Column 3',
                    type: 'column',
                    hidden: ({parent}) => parent?.grid !== 3
                  }
                ]
              }]
            }
          ]
        }]
      },
    ],
    preview: {
      select: {
        title: 'title',
        subtitle: 'description'
      }
    }
  }