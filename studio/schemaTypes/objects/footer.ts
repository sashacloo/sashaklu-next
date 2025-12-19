export default {
  name: 'footer',
  title: 'Footer',
  type: 'object',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'info',
      title: 'Info',
      type: 'text',
    },
    {
      name: 'links',
      title: 'Footer Links',
      type: 'array',
      of: [
        { type: 'linkObject' },
        { type: 'internalLink' },
        { type: 'anchorLink' },
      ]
    },
  ]
}
