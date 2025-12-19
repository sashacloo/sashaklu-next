export default {
  name: 'anchorLink',
  title: 'Anchor Link',
  type: 'object',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required(),
    },
    {
      name: 'anchor',
      title: 'Anchor',
      type: 'string',
      validation: Rule => Rule.required(),
      description: "Scroll to element: '#[element id]'; use '/' to scroll to top"
    }
  ],
  preview: {
    select: {
      title: 'title',
    }
  }
}
