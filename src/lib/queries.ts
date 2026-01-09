export const imageQuery = `{
  ...,
  asset->,
  "assetId": asset->_id,
}`;

export const videoQuery = `{
  ...,
  asset->,
  'aspectRatio': asset->data.aspect_ratio,
  'playbackId': asset->playbackId,
}`;

export const linkQuery = `{
  ...,
  _type == 'internalLink' => {
    'referenceTitle': reference->title,
    'referenceType': reference->_type,
    'slug': reference->slug.current,
  }
}`;

export const postQuery = `{
  ...,
  slides[]{
    ...,
    _type == 'imageObject' => ${imageQuery},
    _type == 'videoObject' => {
      ...,
      video${videoQuery}
    },
  },
  images[]${imageQuery},
  'glbfile': glbfile.asset->url,
}`;

export const postsQuery = `
  'posts': *[_type == 'post'] | order(_createdAt asc)${postQuery}
`;

export const pageQuery = `{
  ...,
  slides[]{
    ...,
    _type == 'imageObject' => ${imageQuery},
    _type == 'videoObject' => {
      ...,
      video${videoQuery}
    },
  },
  images[]${imageQuery},
}`;

export const siteQuery = `
  'site': *[_type == 'site'][0]{
    ...,
    footer{
      ...,
      links[]${linkQuery},
    },
    header{
      ...,
      links[]${linkQuery},
    }
  }
`;

