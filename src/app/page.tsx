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

  const heroPosts = posts.filter((post) => post.category === "hero");
  const heroPost = heroPosts[heroPosts.length - 1];

  const infoPosts = posts.filter((post) =>
    (post.category ?? "info") === "info" && post._id !== heroPost?._id
  );

  const linkPosts = posts.filter((post) => post.category === "link");

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

        <section className="mt-16 grid grid-cols-1 gap-10 md:grid-cols-[240px_1fr_240px]">
          <div className="order-2 md:order-1 flex flex-col gap-6">
            {infoPosts.map((post) => (
              <Post key={post._id} post={post} />
            ))}
          </div>

          <div className="order-1 md:order-2 flex flex-col items-center gap-10 md:min-h-[calc(100vh-188px)] md:justify-center">
            {heroPost?.glbfile && (
              <div className="pt-4">
                <ModelViewer src={heroPost.glbfile} />
              </div>
            )}

            {/* {heroPost && (
              <div className="w-full">
                <Post post={heroPost} />
              </div>
            )} */}
          </div>

          <div className="order-3 md:order-3 flex flex-col gap-6">
            {linkPosts.map((post) => (
              <Post key={post._id} post={post} />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
