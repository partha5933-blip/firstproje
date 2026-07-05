export function FAQ({ items }: { items: { question: string; answer: string }[] }) {
  return (
    <div className="mx-auto max-w-3xl divide-y divide-white/10 rounded-lg border border-white/15 bg-white/[0.04]">
      {items.map((item) => (
        <details key={item.question} className="group p-5">
          <summary className="cursor-pointer list-none text-base font-medium text-white">
            <span className="flex items-center justify-between gap-4">
              {item.question}
              <span className="text-gold transition group-open:rotate-45">+</span>
            </span>
          </summary>
          <p className="mt-3 text-sm leading-6 text-muted">{item.answer}</p>
        </details>
      ))}
    </div>
  );
}
