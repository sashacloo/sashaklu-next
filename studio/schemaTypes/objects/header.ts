export default {
  name: 'header',
  title: 'Header',
  type: 'object',
  fields: [
    {
      name: 'links',
      title: 'Header Links',
      type: 'array',
      of: [
        { type: 'linkObject' },
        { type: 'internalLink' },
        { type: 'anchorLink' },
      ]
    },
  ]
}
