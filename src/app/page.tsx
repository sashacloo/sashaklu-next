import { sanityClient } from "@/lib/sanityClient";
import { postsQuery, siteQuery } from "@/lib/queries";
import { type PostType } from "@/components/Post";
import { ModelViewer } from "@/components/ModelViewer";
import { Header } from "@/components/Header";
import { ThreeColumnLayout } from "@/components/ThreeColumnLayout";
import { InitialFade } from "@/components/InitialFade";
import { buildPostsSideColumns } from "@/components/PostsColumns";

export const dynamic = "force-dynamic";

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
  const heroPost = heroPosts[0];

  const infoPosts = posts.filter((post) =>
    (post.category ?? "info") === "info" && post._id !== heroPost?._id
  ).sort((a, b) => {
    const aDate = new Date(a.publishedAt).getTime();
    const bDate = new Date(b.publishedAt).getTime();
    return aDate - bDate;
  });

  const linkPosts = posts.filter((post) => post.category === "link");

  const sideColumns = buildPostsSideColumns(infoPosts, linkPosts, {
    enableFade: true,
  });

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
            ...sideColumns,
          ]}
        />
      </div>
    </main>
  );
}
