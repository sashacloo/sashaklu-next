export default {
  name: 'post',
  title: 'Post',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
    },
    {
      name: 'images',
      title: 'Image(s)',
      type: 'array',
      of: [{type: 'imageObject'}]
    },
    {
      name: 'glbfile',
      title: '3D model (.glb)',
      type: 'file'
    },
    {
      name: 'cameraOrbit',
      title: 'Initial angle and position of the camera (default: 0deg 75deg 6.2m)',
      type: 'string'
    },
    {
      name: 'cameraTarget',
      title: 'XYZ coordinates of camera focus in meters (default: 0m 0m 0m)',
      type: 'string'
    },
    {
      name: 'color',
      title: 'Background Color',
      type: 'color',
      options: {
        disableAlpha: true
      }
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Info', value: 'info' },
          { title: 'Link', value: 'link' },
          { title: 'Hero', value: 'hero' },
        ],
      },
      initialValue: 'info',
    },
    {
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
      initialValue: new Date().toISOString()
    },
    {
      name: 'body',
      title: 'Body',
      type: 'blockContent',
    },
  ],

  preview: {
    select: {
      title: 'title',
      images: 'images'
    },
    prepare: ({title, images}: {title?: string; images?: any[]}) => {
      const media = images && typeof images !== "undefined" && images.length > 0 ? images[0] : null;
      return {
        title: title,
        media: media
      };
    }
  },
}
