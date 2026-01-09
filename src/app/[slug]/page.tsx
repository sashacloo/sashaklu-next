import { notFound } from "next/navigation";
import { sanityClient } from "@/lib/sanityClient";
import { pageQuery, postsQuery } from "@/lib/queries";
import { PortableText } from "@portabletext/react";
import { portableTextComponents } from "@/lib/portableTextComponents";
import { Header } from "@/components/Header";
import { ThreeColumnLayout } from "@/components/ThreeColumnLayout";
import { Post, type PostType } from "@/components/Post";

type Page = {
  _id: string;
  title?: string;
  body?: any[];
};

type PageData = {
  page?: Page | null;
  posts: PostType[];
};

interface PageProps {
  // In Next 16 app router, params is a Promise for async server components
  params: Promise<{
    slug: string;
  }>;
}

export default async function SlugPage({ params }: PageProps) {
  const { slug } = await params;

  // Build a full query that filters by slug and uses pageQuery as the projection
  const query = `{
    'page': *[_type == 'page' && slug.current == $slug][0]${pageQuery},
    ${postsQuery}
  }`;

  const data = await sanityClient.fetch<PageData>(query, { slug });
  const page = data?.page;
  const posts = data?.posts || [];

  if (!page) {
    notFound();
  }

  const infoPosts = posts.filter((post) =>
    (post.category ?? "info") === "info"
  ).sort((a, b) => {
    const aDate = new Date(a.publishedAt).getTime();
    const bDate = new Date(b.publishedAt).getTime();
    return aDate - bDate;
  });
  const linkPosts = posts.filter((post) => post.category === "link");

  return (
    <main className="min-h-screen w-full">
      <div className="mx-auto px-4 py-4">
        <Header />

        <ThreeColumnLayout
          items={[
            {
              // Center column: page content
              role: "center",
              className: "slug-page mx-auto max-w-[700px] lg:min-h-[calc(100vh-100px)] py-7 lg:pl-[calc(4vw-30px)]",
              children: (
                <>
                  {page.title && (
                    <h1 className="title mb-[18px] lowercase">{page.title}</h1>
                  )}
                  {page.body && (
                    <div className="prose prose-sm max-w-none dark:prose-invert">
                      <PortableText
                        value={page.body}
                        components={portableTextComponents}
                      />
                    </div>
                  )}
                </>
              ),
            },
            {
              // Right column: link posts (second on mobile)
              role: "right",
              className:
                "w-full max-w-[700px] mx-auto grid gap-x-16 gap-y-10 sm:grid-cols-2 lg:grid-cols-1",
              children: linkPosts.map((post) => (
                <div key={post._id} className="flex">
                  <Post post={post} />
                </div>
              )),
            },
            {
              // Left column: info posts (third on mobile)
              role: "left",
              className:
                "max-w-[700px] mx-auto grid gap-x-16 gap-y-5 sm:grid-cols-2 lg:grid-cols-1 lg:items-start",
              children: infoPosts.map((post) => (
                <div key={post._id} className="flex info-post">
                  <Post post={post} />
                </div>
              )),
            },
          ]}
        />
      </div>
    </main>
  );
}
