import { PortableText } from "@portabletext/react";

export type ImageRef = {
  assetId?: string;
  imageCaption?: string;
  asset?: {
    url?: string;
  };
};

export type PostType = {
  _id: string;
  title?: string;
  body?: any[];
  images?: ImageRef[];
  glbfile?: string;
  category?: "info" | "link" | "hero";
};

type Props = {
  post: PostType;
};

export function Post({ post }: Props) {
  const getFirstUrlFromBody = (body: any[] | undefined): string | undefined => {
    if (!body) return undefined;

    const urlRegex = /(https?:\/\/[^\s)]+)/;

    for (const block of body) {
      if (!block || !Array.isArray(block.children)) continue;
      for (const child of block.children) {
        if (typeof child?.text !== "string") continue;
        const match = child.text.match(urlRegex);
        if (match?.[0]) return match[0];
      }
    }

    return undefined;
  };

  if (post.category === "link") {
    const href = getFirstUrlFromBody(post.body);
    const firstImage = post.images?.[0];
    const imageUrl = firstImage?.asset?.url;

    const box = (
      <div className="page-copy-container relative w-full max-w-[700px] mx-auto my-4 pt-[1rem] pr-[0.5rem] pb-[0.8rem] pl-[1.2rem]">
        <div className="corner-bracket top-left bracket-visible" />
        <div className="corner-bracket top-right bracket-visible" />
        <div className="corner-bracket bottom-left bracket-visible" />
        <div className="corner-bracket bottom-right bracket-visible" />

        <div className="page-text page-text-visible text-center">
          {imageUrl && (
            <div className="mb-3 flex justify-center">
              {/* TODO: recreate SanityImage behavior using @sanity/image-url */}
              <img
                className="w-[100px]"
                src={imageUrl}
                alt={post.title || ""}
              />
            </div>
          )}
          {post.title && <h2 className="post-title">{post.title}</h2>}
        </div>
      </div>
    );

    return (
      <article className="post">
        <div className="post-content">
          {href ? (
            <a
              href={href}
              target="_blank"
              rel="noreferrer"
              className="block no-underline"
            >
              {box}
            </a>
          ) : (
            box
          )}
        </div>
      </article>
    );
  }

  return (
    <article className="post">
      {(() => {
        const firstImage = post.images?.[0];
        const imageUrl = firstImage?.asset?.url;
        if (!imageUrl) return null;
        return (
          <div className="post-image">
            {/* TODO: recreate SanityImage behavior using @sanity/image-url */}
            <img src={imageUrl} alt={post.title || ""} />
          </div>
        );
      })()}

      <div className="post-content">
        <div className="page-copy-container relative w-full max-w-[700px] mx-auto my-4 pt-[1rem] pr-[0.5rem] pb-[0.8rem] pl-[1.2rem]">
          <div className="corner-bracket top-left bracket-visible" />
          <div className="corner-bracket top-right bracket-visible" />
          <div className="corner-bracket bottom-left bracket-visible" />
          <div className="corner-bracket bottom-right bracket-visible" />

          <div className="page-text page-text-visible">
            {post.title && <h2 className="post-title">{post.title}</h2>}
            {post.body && (
              <div className="post-body">
                <PortableText value={post.body} />
              </div>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
