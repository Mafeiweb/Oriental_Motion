type FaqItem = {
  question: string;
  answer: string;
};

type FaqProps = {
  id?: string;
  items: FaqItem[];
  title: string;
};

export function Faq({ id, items, title }: FaqProps) {
  if (items.length === 0) {
    return null;
  }

  return (
    <section aria-labelledby={id} className="space-y-5">
      <h2 id={id} className="text-2xl font-semibold leading-tight text-[var(--color-carbon)]">
        {title}
      </h2>
      <dl className="divide-y divide-[var(--border-subtle)] border-y border-[var(--border-subtle)]">
        {items.map((item) => (
          <div key={item.question} className="grid gap-3 py-5 md:grid-cols-[minmax(0,0.7fr)_minmax(0,1fr)]">
            <dt className="text-base font-semibold leading-snug text-[var(--color-carbon)]">{item.question}</dt>
            <dd className="text-sm leading-7 text-[var(--color-stone)]">{item.answer}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
