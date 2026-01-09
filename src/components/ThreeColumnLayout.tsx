import type { ReactNode, CSSProperties } from "react";

type ColumnRole = "left" | "center" | "right";

export type ThreeColumnItem = {
  role: ColumnRole;
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
};

type Props = {
  items: ThreeColumnItem[];
};

const roleOrderClass: Record<ColumnRole, string> = {
  left: "lg:order-1",
  center: "lg:order-2",
  right: "lg:order-3",
};

export function ThreeColumnLayout({ items }: Props) {
  return (
    <section className="mt-16 grid grid-cols-1 gap-x-16 gap-y-10 lg:grid-cols-[240px_1fr_240px]">
      {items.map((item, index) => (
        <div
          key={index}
          className={`${roleOrderClass[item.role]} ${item.className ?? ""}`}
          style={item.style}
        >
          {item.children}
        </div>
      ))}
    </section>
  );
}
