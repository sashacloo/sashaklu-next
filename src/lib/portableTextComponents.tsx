import type { PortableTextComponents } from "@portabletext/react";

export const portableTextComponents: PortableTextComponents = {
  marks: {
    link: ({ value, children }) => {
      const href = (value as any)?.href || "";
      const isExternal = /^https?:\/\//i.test(href);

      if (isExternal) {
        return (
          <a href={href} target="_blank" rel="noreferrer">
            {children}
          </a>
        );
      }

      return <a href={href}>{children}</a>;
    },
  },
};
