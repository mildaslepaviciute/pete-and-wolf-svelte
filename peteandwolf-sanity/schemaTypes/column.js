export default {
  name: 'column',
  title: 'Column',
  type: 'object',
  fields: [
    {
      name: 'type',
      title: 'Content Type',
      type: 'string',
      options: {
        list: [
          { title: 'Text', value: 'text' },
          { title: 'Image', value: 'image' },
          { title: 'Audio', value: 'audio' },
          { title: 'Video', value: 'video' }
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
      name: 'textAlignment',
      title: 'Text Alignment',
      type: 'string',
      options: {
        list: [
          { title: 'Left', value: 'left' },
          { title: 'Center', value: 'center' },
          { title: 'Right', value: 'right' },
        ]
      },
      hidden: ({ parent }) => parent?.type !== 'text',
    },
    {
      name: 'imageContent',
      title: 'Image',
      type: 'image',
      hidden: ({ parent }) => parent?.type !== 'image'
    },
    {
      name: 'audioContents',
      title: 'Audio Files',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          {
            name: 'audioFile',
            title: 'Audio File',
            type: 'file'
          },
          {
            name: 'title',
            title: 'Title',
            type: 'string'
          }
        ],
        preview: {
          select: {
            title: 'title',
            media: 'audioFile'
          }
        }
      }],
      hidden: ({ parent }) => parent?.type !== 'audio'
    },
    {
      name: 'videoId',
      title: 'Video ID',
      type: 'string',
      hidden: ({ parent }) => parent?.type !== 'video',
    },
    {
      name: 'videoPosterImage',
      title: 'Video Poster Image',
      type: 'image',
      options: {
        hotspot: true
      },
      hidden: ({ parent }) => parent?.type !== 'video'
    },
  ]
}