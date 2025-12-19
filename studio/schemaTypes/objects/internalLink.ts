export default {
  name: 'internalLink',
  title: 'Internal Link',
  type: 'object',
  fields: [
    {
      name: 'reference',
      title: 'Reference',
      type: 'reference',
      to: [
        { type: 'page' },
      ],
    },
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Optional field. Defaults to Reference title',
    }
  ],
  preview: {
    select: {
      title: 'title',
      pageTitle: 'page.title',
    },
    prepare: ({ title, pageTitle }) => ({ title: title || pageTitle }),
  }
}
