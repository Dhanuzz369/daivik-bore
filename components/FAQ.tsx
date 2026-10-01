import { Plus } from "lucide-react";
import { faqs } from "@/data/site";

export function FAQ() {
  return <div className="faq-list">
    {faqs.map((faq) => <details key={faq.question} name="borewell-faq">
      <summary>{faq.question}<Plus size={20} strokeWidth={1.5} aria-hidden="true" /></summary>
      <p>{faq.answer}</p>
    </details>)}
  </div>;
}
