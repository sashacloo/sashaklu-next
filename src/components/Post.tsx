import { PortableText } from "@portabletext/react";

export type ImageRef = {
  assetId?: string;
  imageCaption?: string;
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
  return (
    <article className="post">
      {post.images && post.images.length > 0 && (
        <div className="post-image">
          {/* TODO: recreate SanityImage behavior using @sanity/image-url */}
          <img
            src={`https://via.placeholder.com/800x600?text=${encodeURIComponent(
              post.title || "image"
            )}`}
            alt={post.title || ""}
          />
        </div>
      )}

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
