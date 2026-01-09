import { sanityClient } from "@/lib/sanityClient";
import { postsQuery, siteQuery } from "@/lib/queries";
import { Post, type PostType } from "@/components/Post";
import { ModelViewer } from "@/components/ModelViewer";
import { Header } from "@/components/Header";
import { ThreeColumnLayout } from "@/components/ThreeColumnLayout";
import { InitialFade } from "@/components/InitialFade";

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
        <InitialFade delay={2}>
          <Header />
        </InitialFade>

        <ThreeColumnLayout
          items={[
            {
              role: "center",
              className:
                "flex flex-col items-center gap-10 lg:min-h-[calc(100vh-202px)] lg:justify-center",
              children:
                heroPost?.glbfile ? (
                  <InitialFade delay={1}>
                    <div className="pt-4">
                      <ModelViewer src={heroPost.glbfile} variant="hero" />
                    </div>
                  </InitialFade>
                ) : null,
            },
            {
              role: "left",
              className:
                "max-w-[700px] mx-auto grid gap-x-16 gap-y-10 sm:grid-cols-2 lg:grid-cols-1",
              children: infoPosts.map((post, index) => {
                const delay = 3 + index * 0.7;
                return (
                  <InitialFade key={post._id} delay={delay}>
                    <div
                      className={`flex info-post ${
                        index === 0 ? "sm:col-span-2 lg:col-span-1" : ""
                      }`}
                    >
                      <Post post={post} />
                    </div>
                  </InitialFade>
                );
              }),
            },
            {
              role: "right",
              className:
                "w-full max-w-[700px] mx-auto grid gap-x-16 gap-y-10 sm:grid-cols-2 lg:grid-cols-1",
              children: linkPosts.map((post, index) => {
                const baseDelay = 4 + infoPosts.length * 0.7; // after all info posts + 1s gap
                const delay = baseDelay + index * 0.7;
                return (
                  <InitialFade key={post._id} delay={delay}>
                    <div className="flex">
                      <Post post={post} />
                    </div>
                  </InitialFade>
                );
              }),
            },
          ]}
        />
      </div>
    </main>
  );
}
