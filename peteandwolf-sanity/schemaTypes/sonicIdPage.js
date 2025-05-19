// schemas/sonicId.js
export default {
    name: 'sonicIdPage',
    title: 'Sonic ID Page',
    type: 'document',
    
    __experimental_actions: ['update', 'publish'],
    initialValue: {
        _id: 'sonicIdPage'
    },
    fields: [
        {
            name: 'title',
            title: 'Title',
            type: 'string',
            validation: Rule => Rule.required()
        },
        {
            name: 'description',
            title: 'Description',
            type: 'text',
            validation: Rule => Rule.required()
          },
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
                        title: 'Title',
                        type: 'string',
                        validation: Rule => Rule.required()
                    },
                    {
                      name: 'titleAlignment',
                      title: 'Title Alignment',
                      type: 'string',
                      options: {
                        list: [
                          { title: 'Left', value: 'left' },
                          { title: 'Right', value: 'right' },
                        ]
                      },
                    },
                    {
                      name: 'titleSize',
                      title: 'Title Size',
                      type: 'string',
                      options: {
                        list: [
                          { title: 'Font 1', value: 'font-1' },
                          { title: 'Font 2', value: 'font-2' },
                          { title: 'Font 3', value: 'font-3' },
                          { title: 'Font 4', value: 'font-4' },
                          { title: 'Font 5', value: 'font-5' },
                          { title: 'Font 6', value: 'font-6' },
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
                                            { title: 'Single Column', value: 1 },
                                            { title: 'Two Columns', value: 2 },
                                            { title: 'Three Columns', value: 3 }
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
                                    hidden: ({ parent }) => parent?.grid === 1
                                },
                                {
                                    name: 'col_3',
                                    title: 'Column 3',
                                    type: 'column',
                                    hidden: ({ parent }) => parent?.grid !== 3
                                }
                            ]
                        }]
                    }
                ]
            }]
        }
    ]
}