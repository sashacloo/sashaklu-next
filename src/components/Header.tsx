import Link from "next/link";
import { ThemeToggle } from "@/components/ThemeToggle";

export function Header() {
  return (
    <header className="sticky top-4 z-10 mb-8 flex items-center md:items-start justify-between gap-4 text-sm leading-none">
      <Link href="/" className="lowercase title">
        sasha klu
      </Link>
      <div className="flex items-center gap-3">
        {/* <a
          href="https://instagram.com/stealthy00"
          target="_blank"
          rel="noreferrer"
          className="lowercase mr-6"
        >
          ig
        </a> */}
        <ThemeToggle />
      </div>
    </header>
  );
}
