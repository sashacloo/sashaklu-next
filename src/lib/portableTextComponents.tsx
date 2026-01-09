import Link from "next/link";
import type { PortableTextComponents } from "@portabletext/react";

export const portableTextComponents: PortableTextComponents = {
  marks: {
    link: ({ value, children }) => {
      const href = (value as any)?.href || "";
      const isExternal = /^https?:\/\//i.test(href);
      const isInternal = href.startsWith("/");

      if (isExternal) {
        return (
          <a href={href} target="_blank" rel="noreferrer">
            {children}
          </a>
        );
      }

      if (isInternal) {
        return <Link href={href}>{children}</Link>;
      }

      // Fallback for other schemes (mailto:, tel:, anchors, etc.)
      return <a href={href}>{children}</a>;
    },
  },
};
