"use client";

import { useRef, useState, MouseEvent } from "react";
import { PortableText } from "@portabletext/react";
import { ModelViewer } from "@/components/ModelViewer";

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
  const linkModelRef = useRef<any | null>(null);

  const [tilt, setTilt] = useState<{ rotateX: number; rotateY: number }>({
    rotateX: 0,
    rotateY: 0,
  });

  const handleCardMouseMove = (event: MouseEvent<HTMLElement>) => {
    const target = event.currentTarget as HTMLElement | null;
    if (!target) return;

    const rect = target.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const xNorm = x / rect.width - 0.5; // -0.5 .. 0.5
    const yNorm = y / rect.height - 0.5; // -0.5 .. 0.5

    // Stronger tilt that leans TOWARD the cursor
    const maxTilt = 14; // degrees (was 8)
    const rotateY = xNorm * maxTilt * 2;
    const rotateX = -yNorm * maxTilt * 2;

    setTilt({ rotateX, rotateY });
  };

  const resetTilt = () => {
    setTilt({ rotateX: 0, rotateY: 0 });
  };

  const setLinkSpinSpeed = (speed: "slow" | "fast") => {
    const el = linkModelRef.current as any | null;
    if (!el) return;
    el.setAttribute("rotation-per-second", speed === "fast" ? "180deg" : "30deg");
  };

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
      <div className="page-wrapper relative w-full max-w-[700px] mx-auto my-4 p-4">
        <div className="corner-bracket top-left bracket-visible" />
        <div className="corner-bracket top-right bracket-visible" />
        <div className="corner-bracket bottom-left bracket-visible" />
        <div className="corner-bracket bottom-right bracket-visible" />

        <div className="page-content flex flex-col justify-center w-full h-full text-center">
          {post.glbfile && (
            <div className="mb-3 flex justify-center">
              <ModelViewer src={post.glbfile} variant="link" externalRef={linkModelRef} />
            </div>
          )}
          {!post.glbfile && imageUrl && (
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
      <article
        className="post flex w-full"
        onMouseEnter={() => setLinkSpinSpeed("fast")}
        onMouseMove={handleCardMouseMove}
        onMouseLeave={() => {
          setLinkSpinSpeed("slow");
          resetTilt();
        }}
        style={{
          transform: `perspective(900px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)`,
          transition: "transform 0.25s ease-out",
        }}
      >
        {href ? (
          <a
            href={href}
            target="_blank"
            rel="noreferrer"
            className="flex w-full no-underline"
          >
            {box}
          </a>
        ) : (
          box
        )}
      </article>
    );
  }

  return (
    <article
      className="post flex w-full"
      onMouseMove={handleCardMouseMove}
      onMouseLeave={resetTilt}
      style={{
        transform: `perspective(900px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)`,
        transition: "transform 0.25s ease-out",
      }}
    >
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

      <div className="post-content flex w-full h-full">
        <div className="page-copy-container relative w-full max-w-[700px] mx-auto my-4 pt-[1rem] pr-[0.5rem] pb-[0.8rem] pl-[1.2rem]">
          <div className="corner-bracket top-left bracket-visible" />
          <div className="corner-bracket top-right bracket-visible" />
          <div className="corner-bracket bottom-left bracket-visible" />
          <div className="corner-bracket bottom-right bracket-visible" />

          <div className="page-content">
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
