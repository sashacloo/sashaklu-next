import { sanityClient } from "@/lib/sanityClient";
import { postsQuery, siteQuery } from "@/lib/queries";
import { PortableText } from "@portabletext/react";
import { Post, type PostType } from "@/components/Post";
import { ModelViewer } from "@/components/ModelViewer";

type HomeData = {
  posts: PostType[];
  site?: {
    title?: string;
  };
};

export default async function Home() {
  const query = `{
    ${postsQuery},
    ${siteQuery},
  }`;

  const data = await sanityClient.fetch<HomeData>(query);

  const posts = data?.posts || [];
  const heroPost = posts[0];

  return (
    <main className="min-h-screen w-full">
      <div className="mx-auto px-4 py-4">
        <header className="sticky top-4 z-10 flex items-start justify-between text-sm leading-none">
          <div className="lowercase">sasha klu</div>
          <a
            href="https://instagram.com/stealthy00"
            target="_blank"
            rel="noreferrer"
            className="lowercase"
          >
            ig
          </a>
        </header>

        <section className="mt-16 flex flex-col items-center gap-10">
          {heroPost?.glbfile && (
            <div className="pt-4">
              <ModelViewer src={heroPost.glbfile} />
            </div>
          )}

          {/* <div className="w-full max-w-[700px] ml-4 text-xs leading-relaxed md:text-sm">
            <div className="page-copy-container w-full max-w-[700px]">
              <div className="corner-bracket top-left bracket-visible" />
              <div className="corner-bracket top-right bracket-visible" />
              <div className="corner-bracket bottom-left bracket-visible" />
              <div className="corner-bracket bottom-right bracket-visible" />

              <div className="page-text page-text-visible">
                {heroPost?.body && <PortableText value={heroPost.body} />}
              </div>
            </div>
          </div> */}
        </section>

        {posts.length > 0 && (
          <section className="mt-20 flex flex-col">
            {posts.map((post) => (
              <Post key={post._id} post={post} />
            ))}
          </section>
        )}
      </div>
    </main>
  );
}
