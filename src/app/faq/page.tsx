"use client";

import { useState } from "react";

const faqs = [
  {
    question: "Can I claim Canadian citizenship through a grandparent?",
    answer:
      "Yes, but you can't skip a generation. Bill C-3 retroactively restores your parent's citizenship (even if they never knew about it), which then flows to you. You document the entire chain on your application — your parent does NOT need to apply first.",
  },
  {
    question: "Does my parent need to apply for citizenship first?",
    answer:
      "No. You document the chain of descent yourself on your CIT 0001 application. IRCC doesn't require citizenship certificates for your parent or other ancestors — just birth certificates showing the parent-child relationships in each generation.",
  },
  {
    question: "Is there a deadline to apply?",
    answer:
      "No. Citizenship is recognized by operation of law, not granted as a new benefit. There is no deadline. You are already a citizen — you're simply applying for proof (a Citizenship Certificate).",
  },
  {
    question: "What if my ancestor is deceased?",
    answer:
      "Death does NOT break the chain. Citizenship is recognized retroactively regardless of whether the person ever applied for, knew about, or held a citizenship certificate. Provide a death certificate to help establish identity and timeline.",
  },
  {
    question: "Should I apply online or by paper?",
    answer:
      "Paper for most Bill C-3 claims (G2 and beyond). The IRCC online portal was designed for straightforward first-generation cases. Paper applications allow you to include complex lineage documents, a cover letter mapping your family tree, and all supporting records.",
  },
  {
    question: "How long does processing take?",
    answer:
      "Approximately 10 months as of early 2026, though multi-generational claims may take longer. IRCC's 2026-2027 target is to process 80% of citizenship applications within 12 months. The surge in applications following Bill C-3 has created processing backlogs.",
  },
  {
    question: "Do I owe Canadian taxes if I become a citizen?",
    answer:
      "Generally no, if you continue to reside outside Canada. Canada taxes based on residency, not citizenship (unlike the United States). However, individual situations vary — consult a cross-border tax advisor for personalized advice.",
  },
  {
    question: "Will this affect my US citizenship or other citizenship?",
    answer:
      "Canada allows dual and multiple citizenship. The US also generally allows it, though there are nuances. Consult a lawyer for advice specific to your situation. Many people successfully hold both Canadian and US citizenship.",
  },
  {
    question: "What's the difference between a birth certificate and a long-form birth certificate?",
    answer:
      "A long-form birth certificate shows the child's full name, date of birth, place of birth, AND both parents' full names. Short-form certificates, computer abstracts (wallet-sized cards), and baptismal certificates are generally NOT accepted by IRCC. The wrong format is the #1 reason for application delays.",
  },
  {
    question: "What is the substantial connection test?",
    answer:
      "For children born on or after December 15, 2025, to a Canadian parent who was also born abroad, the parent must demonstrate at least 1,095 days (3 years) of cumulative physical presence in Canada before the child's birth. The days do NOT need to be consecutive. This only applies to future births — if you were born before December 15, 2025, no physical presence test applies.",
  },
];

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-200">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full text-left py-5 flex items-start justify-between gap-4"
      >
        <span className="font-serif font-semibold text-lg">{question}</span>
        <svg
          className={`w-5 h-5 text-navy-400 shrink-0 mt-1 transition-transform ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {isOpen && (
        <div className="pb-5 text-navy-400 leading-relaxed animate-fadeIn">
          {answer}
        </div>
      )}
    </div>
  );
}

export default function FAQPage() {
  return (
    <div className="py-12 md:py-16">
      <div className="max-w-3xl mx-auto px-4">
        <h1 className="text-3xl md:text-4xl font-serif font-bold mb-3">
          Frequently Asked Questions
        </h1>
        <p className="text-navy-400 mb-10">
          Common questions about Bill C-3 and the citizenship certificate application process.
        </p>
        <div>
          {faqs.map((faq) => (
            <FAQItem key={faq.question} question={faq.question} answer={faq.answer} />
          ))}
        </div>
      </div>
    </div>
  );
}
