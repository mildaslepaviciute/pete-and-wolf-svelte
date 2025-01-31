export default {
    name: 'aboutUs',
    title: 'About Us',
    type: 'document',
    __experimental_actions: ['update', 'publish'], // Add this line to make it a singleton
    initialValue: {
        _id: 'aboutUsPage'
    },
    fields: [
        {
            name: 'title',
            title: 'Title',
            type: 'string',
            validation: Rule => Rule.required()
        },
        {
            name: 'mainImage',
            title: 'Main Image',
            type: 'image',
            options: {
                hotspot: true
            },
            fields: [
                {
                    name: 'alt',
                    title: 'Alt Text',
                    type: 'string'
                }
            ]
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
}