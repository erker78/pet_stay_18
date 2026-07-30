import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FaqSection } from "@/components/faq-section";
import { HotelCard } from "@/components/hotel-card";
import { JsonLd } from "@/components/json-ld";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cityContent, hotelsForTag, tagBySlug, tagContent, type TagSlug } from "@/lib/content";
import { hotels } from "@/lib/data";
import { absoluteUrl, siteConfig } from "@/lib/site";

type PageProps = { params: Promise<{ tag: string }> };

export function generateStaticParams() {
  return tagContent.map((tag) => ({ tag: tag.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const tag = tagBySlug((await params).tag);
  if (!tag) return { title: "找不到條件" };
  const title = `${tag.title}推薦｜毛孩旅宿指南`;
  return { title, description: tag.description, alternates: { canonical: `/tag/${tag.slug}` }, openGraph: { title, description: tag.description } };
}

export default async function TagPage({ params }: PageProps) {
  const tag = tagBySlug((await params).tag);
  if (!tag) notFound();
  const matches = hotelsForTag(hotels, tag.slug as TagSlug);
  const schema = [
    { "@context": "https://schema.org", "@type": "CollectionPage", name: tag.title, description: tag.description, url: absoluteUrl(`/tag/${tag.slug}`) },
    { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: siteConfig.name, item: absoluteUrl("/") }, { "@type": "ListItem", position: 2, name: tag.title, item: absoluteUrl(`/tag/${tag.slug}`) }] },
    { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: tag.faq.map((item) => ({ "@type": "Question", name: item.question, acceptedAnswer: { "@type": "Answer", text: item.answer } })) }
  ];

  return (
    <main>
      <JsonLd data={schema} />
      <section className="bg-white">
        <div className="container-px py-12">
          <nav className="text-sm text-muted-foreground"><Link href="/">首頁</Link> / {tag.name}</nav>
          <Badge className="mt-5" variant="accent">條件頁</Badge>
          <h1 className="mt-4 text-4xl font-black tracking-normal">{tag.title}</h1>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-muted-foreground">{tag.description}</p>
        </div>
      </section>
      <div className="container-px grid gap-10 py-12">
        <section className="grid gap-4 md:grid-cols-2">
          <div className="rounded-xl border bg-white p-6"><h2 className="text-xl font-bold">適合對象</h2><p className="mt-3 leading-7 text-muted-foreground">{tag.suitableFor}</p></div>
          <div className="rounded-xl border bg-white p-6"><h2 className="text-xl font-bold">注意事項</h2><p className="mt-3 leading-7 text-muted-foreground">{tag.notice}</p></div>
        </section>
        <section>
          <h2 className="text-2xl font-bold">符合條件的店家</h2>
          <p className="mt-2 text-muted-foreground">{matches.length ? `目前有 ${matches.length} 間資料符合這個條件。` : "目前明確標記的店家仍在整理中，請先閱讀條件說明並回到城市頁比較店家。"}</p>
          <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">{matches.map((hotel) => <HotelCard key={hotel.id} hotel={hotel} />)}</div>
        </section>
        <FaqSection items={[...tag.faq]} />
        <section>
          <h2 className="text-2xl font-bold">相關城市頁</h2>
          <div className="mt-5 flex flex-wrap gap-2">{cityContent.map((city) => <Button key={city.slug} asChild variant="outline"><Link href={`/city/${city.slug}`}>{city.name}寵物旅館</Link></Button>)}</div>
        </section>
      </div>
    </main>
  );
}
