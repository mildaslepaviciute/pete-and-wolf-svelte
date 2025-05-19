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
            name: 'textContent',
            title: 'Text Content',
            type: 'array',
            of: [{ type: 'block' }],
        },
        {
            name: 'col_1',
            title: 'Column 1',
            type: 'array',
            of: [{ type: 'block' }],
        },
        {
            name: 'col_2',
            title: 'Column 2',
            type: 'array',
            of: [{ type: 'block' }],
        },
        {
            name: 'col_3',
            title: 'Column 3',
            type: 'array',
            of: [{ type: 'block' }],
        },
        {
            name: 'col_4',
            title: 'Column 4',
            type: 'array',
            of: [{ type: 'block' }],
        },
    ]
}