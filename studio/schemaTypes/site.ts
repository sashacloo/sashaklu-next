export default {
  title: 'Site',
  name: 'site',
  type: 'document',
  groups: [
    {
      default: true,
      name: 'header',
      title: 'Header',
    },
    {
      default: false,
      name: 'footer',
      title: 'Footer',
    },
    {
      default: false,
      name: 'seo',
      title: 'SEO',
    },
  ],
  fields: [
    {
      name: 'title',
      title: 'Title',
      group: 'seo',
      type: 'string',
      description: "Your website's name. Should be under 60 characters.",
      validation: Rule => Rule.max(60).warning('Should be under 60 characters.'),
    },
    {
      name: 'description',
      title: 'Description',
      group: 'seo',      
      type: 'string',
      description: "A short summary of what to expect when visiting your website. Should be under 160 characters.",
      validation: Rule => Rule.max(160).warning('Should be under 160 characters.'),
    },
    {
      name: 'url',
      title: 'Website URL',
      group: 'seo',      
      type: 'url',
      description: 'The address people will type in to get to your website.',
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      group: 'seo',      
      description:
        'This image is the first thing people will see when someone shares your website. Recommended size 1200x630 (will be auto resized).',
    },
    {
      name: 'appID',
      title: 'Facebook App ID',
      type: 'string',
      group: 'seo',      
      description: "Your Facebook App ID can be found by clicking \"Settings\" then \"Basic\" in the navigation menu on the left side of your Facebook App page.",
    },
    {
      name: 'header',
      title: 'Header',
      type: 'header',
      group: 'header',
    },
    {
      name: 'footer',
      title: 'Footer',
      type: 'footer',
      group: 'footer',
    },
  ],
}
