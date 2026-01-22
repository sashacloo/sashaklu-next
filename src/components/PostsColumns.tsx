import { Post, type PostType } from "@/components/Post";
import { InitialFade } from "@/components/InitialFade";
import type { ThreeColumnItem } from "@/components/ThreeColumnLayout";

type Options = {
  enableFade?: boolean;
};

export function buildPostsSideColumns(
  infoPosts: PostType[],
  linkPosts: PostType[],
  options: Options = {}
): ThreeColumnItem[] {
  const { enableFade = false } = options;

  const leftItem: ThreeColumnItem = {
    role: "left",
    className:
      "max-w-[700px] mx-auto grid gap-x-16 gap-y-10 sm:grid-cols-2 lg:grid-cols-1 lg:items-start",
    children: enableFade
      ? infoPosts.map((post, index) => {
          const delay = 2.5 + index * 0.5;
          return (
            <InitialFade key={post._id} delay={delay}>
              <Post post={post} />
            </InitialFade>
          );
        })
      : infoPosts.map((post) => <Post key={post._id} post={post} />),
  };

  const rightItem: ThreeColumnItem = {
    role: "right",
    className:
      "w-full max-w-[700px] mx-auto grid gap-x-16 gap-y-10 sm:grid-cols-2 lg:grid-cols-1",
    children: enableFade
      ? linkPosts.map((post, index) => {
          const baseDelay = 2.5 + infoPosts.length * 0.5;
          const delay = baseDelay + index * 0.5;
          return (
            <InitialFade key={post._id} delay={delay}>
              <Post post={post} />
            </InitialFade>
          );
        })
      : linkPosts.map((post) => <Post key={post._id} post={post} />),
  };

  return [leftItem, rightItem];
}
