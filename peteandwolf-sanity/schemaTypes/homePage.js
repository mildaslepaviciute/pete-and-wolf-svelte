// schemas/home.js
export default {
    name: 'homePage',
    title: 'Home Page',
    type: 'document',
    __experimental_actions: ['update', 'publish'], // Add this line to make it a singleton
    initialValue: {
        _id: 'homePage'
    },
    fields: [
        {
            name: 'image',
            title: 'Image',
            type: 'image',
            options: {
                hotspot: true
            }
        },
        {
            name: 'title',
            title: 'Title',
            type: 'string',
        },
        {
            name: 'description',
            title: 'Description',
            type: 'array',
            of: [{ type: 'block' }],
        },
        
    ]
}