// schemas/advertising.js
export default {
    name: 'advertisingProject',
    title: 'Advertising Project',
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
          maxLength: 96
        },
        validation: Rule => Rule.required()
      },
      {
        name: 'thumbnail',
        title: 'Thumbnail Image',
        type: 'string',
        validation: Rule => Rule.required()
      },
      {
        name: 'videoId',
        title: 'Video ID',
        type: 'string',
        validation: Rule => Rule.required()
      },
      {
        name: 'description',
        title: 'Description',
        type: 'text'
      },
      {
        name: 'type',
        title: 'Type',
        type: 'string',
        initialValue: 'Sound design/Original music'
      },
      {
        name: 'credits',
        title: 'Credits',
        type: 'array',
        of: [{ type: 'block' }],
        description: 'Enter credits with line breaks'
      },
    ],
    preview: {
      select: {
        title: 'title',
        subtitle: 'description'
      }
    }
}