export default {
  name: 'imageObject',
  type: 'image',
  title: 'Image',
  fields: [
    {
      name: 'imageCaption',
      title: 'Image Caption',
      type: 'blockContent',
      description: 'Important for SEO and accessibility.',
      validation: Rule => Rule.error('You have to fill out the alternative text.').required(),
      options: {
        isHighlighted: true
      }
    }
  ],
  preview: {
    select: {
      imageUrl: 'asset.url',
      title: 'imageCaption',
    },
  },
}
