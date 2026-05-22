import Link from "next/link";
import { HeartHandshake, Menu } from "lucide-react";
import { CompareLink } from "@/components/compare-link";
import { Button } from "@/components/ui/button";

const navItems = [
  { href: "/city/kaohsiung", label: "高雄" },
  { href: "/tag/cctv", label: "熱門條件" },
  { href: "/guides/how-to-choose-pet-hotel", label: "新手指南" },
  { href: "/list-your-hotel", label: "店家刊登" },
  { href: "/about", label: "關於我們" }
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur">
      <div className="container-px flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-bold text-lg">
          <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <HeartHandshake className="h-5 w-5" aria-hidden="true" />
          </span>
          <span>18寵物旅宿網</span>
        </Link>
        <nav className="hidden items-center gap-1 md:flex" aria-label="主選單">
          {navItems.map((item) => (
            <Button key={item.href} variant="ghost" asChild>
              <Link href={item.href}>{item.label}</Link>
            </Button>
          ))}
          <CompareLink />
        </nav>
        <div className="flex items-center md:hidden">
          <CompareLink compact />
          <Button variant="ghost" size="icon" aria-label="開啟選單">
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
}
