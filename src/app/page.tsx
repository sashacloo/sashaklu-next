import { sanityClient } from "@/lib/sanityClient";
import { postsQuery, siteQuery } from "@/lib/queries";
import { Post, type PostType } from "@/components/Post";
import { ModelViewer } from "@/components/ModelViewer";
import { ThemeToggle } from "@/components/ThemeToggle";

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
        <header className="sticky top-4 z-10 flex items-start justify-between gap-4 text-sm leading-none fade-seq" style={{ animationDelay: "2s" }}>
          <div className="lowercase">sasha klu</div>
          <div className="flex items-center gap-3">
            <a
              href="https://instagram.com/stealthy00"
              target="_blank"
              rel="noreferrer"
              className="lowercase mr-6"
            >
              ig
            </a>
            <ThemeToggle />
          </div>
        </header>

        <section className="mt-16 grid grid-cols-1 gap-x-16 gap-y-10 lg:grid-cols-[240px_1fr_240px]">
          <div
            className="lg:order-2 flex flex-col items-center gap-10 lg:min-h-[calc(100vh-188px)] lg:justify-center fade-seq"
            style={{ animationDelay: "1s" }}
          >
            {heroPost?.glbfile && (
              <div className="pt-4">
                <ModelViewer src={heroPost.glbfile} variant="hero" />
              </div>
            )}
          </div>

          <div className="lg:order-1 max-w-[700px] mx-auto grid gap-x-16 gap-y-10 sm:grid-cols-2 lg:grid-cols-1">
            {infoPosts.map((post, index) => {
              const delay = 3 + index * 0.7;
              return (
                <div
                  key={post._id}
                  className={`fade-seq flex info-post ${index === 0 ? "sm:col-span-2 lg:col-span-1" : ""}`}
                  style={{ animationDelay: `${delay}s` }}
                >
                  <Post post={post} />
                </div>
              );
            })}
          </div>

          <div className="lg:order-3 w-full max-w-[700px] mx-auto grid gap-x-16 gap-y-10 sm:grid-cols-2 lg:grid-cols-1">
            {linkPosts.map((post, index) => {
              const baseDelay = 4 + infoPosts.length * 0.7 ; // after all info posts + 1s gap
              const delay = baseDelay + index * 0.7;
              return (
                <div
                  key={post._id}
                  className="fade-seq flex"
                  style={{ animationDelay: `${delay}s` }}
                >
                  <Post post={post} />
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </main>
  );
}
