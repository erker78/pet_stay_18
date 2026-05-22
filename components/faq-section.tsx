import type { FaqItem } from "@/lib/content";

export function FaqSection({ title = "常見問題", items }: { title?: string; items: FaqItem[] }) {
  return (
    <section aria-labelledby="faq-heading">
      <h2 id="faq-heading" className="text-2xl font-bold tracking-normal">{title}</h2>
      <div className="mt-5 grid gap-3">
        {items.map((item) => (
          <details key={item.question} className="rounded-xl border bg-white p-5">
            <summary className="cursor-pointer font-semibold">{item.question}</summary>
            <p className="mt-3 leading-7 text-muted-foreground">{item.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
