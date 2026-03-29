"use client";

import { useState } from "react";

const faqCategories = [
  {
    title: "Eligibility & Generation Counting",
    faqs: [
      {
        question: "Can I claim Canadian citizenship through a grandparent?",
        answer:
          "Yes, but you can't skip a generation. Bill C-3 retroactively restores your parent's citizenship (even if they never knew about it), which then flows to you. You document the entire chain on your application — your parent does NOT need to apply first.",
      },
      {
        question: "My Canadian ancestor is 4+ generations back. Is there a limit?",
        answer:
          "For anyone born before December 15, 2025, there is NO generational limit under Bill C-3. The practical limit is documentation — the further back you go, the harder it is to obtain long-form birth certificates for every link in the chain. G4+ claims are strongly advised to consult an immigration lawyer.",
      },
      {
        question: "Does my parent need to get their citizenship certificate before I can apply?",
        answer:
          "No. This is one of the most common misconceptions. You document the entire chain of descent on your own application. IRCC does not require ancestors in the chain to hold citizenship certificates. However, if your parent already has their certificate, include a copy — it simplifies IRCC's review.",
      },
      {
        question: "What if my ancestor was naturalized rather than born in Canada?",
        answer:
          "Naturalized Canadians count as anchor ancestors (G0). You need proof of their naturalization — either a naturalization certificate, a citizenship certificate, or historical naturalization records from Library and Archives Canada. Note: before 1947, Canadians were \"British subjects\" not \"Canadian citizens,\" so naturalization records from that era can be tricky.",
      },
      {
        question: "I was born before 1977 and my mother was Canadian but my father was not. Am I eligible?",
        answer:
          "Bill C-3 addresses many \"Lost Canadian\" scenarios including pre-1977 gender discrimination cases. If your mother was Canadian but couldn't pass citizenship due to old discriminatory rules, Bill C-3 likely restores your citizenship retroactively. These cases can be complex — the community strongly recommends consulting a lawyer.",
      },
      {
        question: "My ancestor left Canada as a baby and never lived there as an adult. Does that matter?",
        answer:
          "No, for the retroactive provision. If the ancestor was born in Canada or naturalized there, they are Canadian for the purposes of the chain. Length of residency in Canada is irrelevant for people born before December 15, 2025.",
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
        question: "What is the substantial connection test?",
        answer:
          "For children born on or after December 15, 2025, to a Canadian parent who was also born abroad, the parent must demonstrate at least 1,095 days (3 years) of cumulative physical presence in Canada before the child's birth. The days do NOT need to be consecutive. This only applies to future births — if you were born before December 15, 2025, no physical presence test applies.",
      },
    ],
  },
  {
    title: "Documents & Birth Certificates",
    faqs: [
      {
        question: "What exactly is a \"long-form\" birth certificate?",
        answer:
          "A long-form birth certificate is the full-size document that shows the child's name, date of birth, place of birth, AND both parents' full names. It is NOT the wallet-sized card, the \"computer abstract,\" or the short-form certificate. When ordering from any vital statistics office, explicitly ask for the \"long form\" or \"full form\" showing parental information. The wrong format is the #1 reason for application delays.",
      },
      {
        question: "I only have a short-form birth certificate. Will that work?",
        answer:
          "Almost certainly not. IRCC specifically requires long-form certificates showing parents' names. Short-form, computer abstracts, wallet cards, and baptismal certificates are generally rejected. Order the long-form now — vital statistics offices can take weeks to months depending on the province or state.",
      },
      {
        question: "My ancestor's birth certificate has a different name than their other documents. What do I do?",
        answer:
          "Name discrepancies are extremely common, especially with older records. You need \"bridging documents\": marriage certificates (maiden to married name), legal name change documents, statutory declarations, or immigration records showing both names. Include a clear explanation in your cover letter mapping each discrepancy. Unexplained name discrepancies are a common reason for Procedural Fairness Letters or application returns.",
      },
      {
        question: "My ancestor was born before birth registration was mandatory. What can I use?",
        answer:
          "For very old records (especially pre-1900 in some provinces), baptismal/church records may be accepted as substitutes when no government record exists. Census records, immigration records, and parish records can also support your case. Check Library and Archives Canada, provincial archives, FamilySearch.org, and Ancestry.ca for historical records. If no birth certificate or equivalent exists, consult a lawyer about presenting alternative evidence.",
      },
      {
        question: "Do I need certified copies or will photocopies work?",
        answer:
          "Send clear COLOR photocopies of documents you want to keep. IRCC may request originals later if they have concerns. Poor quality black-and-white photocopies are a common reason for returns — make sure every detail is legible. Some applicants send certified true copies (notarized) for important documents as a middle ground.",
      },
    ],
  },
  {
    title: "Quebec Ancestry",
    faqs: [
      {
        question: "My ancestor was born in Quebec. Are there special challenges?",
        answer:
          "Yes. Quebec did not have mandatory government (civil) registration of births until 1994. Before that, births were recorded by churches — primarily Catholic parish registers. This means for ancestors born before 1994, a government-issued \"long-form birth certificate\" in the usual sense may not exist. Instead, the primary record may be a baptismal certificate (acte de baptême) from the parish church. The Directeur de l'état civil du Québec has since compiled many older church records into the civil registry, so you can often obtain an official birth certificate even for pre-1994 births — but the process can be slow and the records may be incomplete for very old entries.",
      },
      {
        question: "Does IRCC accept Quebec baptismal certificates?",
        answer:
          "IRCC generally requires a government-issued long-form birth certificate and does not accept baptismal certificates as a standalone substitute. However, for Quebec ancestors born before 1994, the situation is unique. Your best approach: first request a \"copie d'acte de naissance\" (copy of the act of birth) from the Directeur de l'état civil du Québec — this is the Quebec equivalent of a long-form birth certificate and IRCC accepts it without question. If the Directeur cannot produce one (common for pre-1900 births), request a \"lettre de recherche négative\" (negative search letter) confirming no civil record exists. Then submit the church baptismal certificate along with that negative search letter and a cover letter explaining Quebec's civil registration history. Immigration lawyers recommend proactively explaining the system — IRCC officers may not be familiar with Quebec's unique history. Supporting documents like census records and marriage records further strengthen the case.",
      },
      {
        question: "How do I obtain birth records from Quebec?",
        answer:
          "Start with the Directeur de l'état civil du Québec (etatcivil.gouv.qc.ca) — request a \"copie d'acte de naissance\" (the long-form equivalent). They have records from 1994 onward plus many older church records transferred to the civil registry (primarily 1900+). You can order by mail from outside Canada; expect 4-8 weeks and approximately $20 CAD. If the Directeur cannot locate the record, try: (1) the parish church or diocesan archives where the baptism took place (major dioceses include Québec, Montréal, Trois-Rivières, Sherbrooke, and Chicoutimi — fees typically $15-$50 CAD), (2) BAnQ (Bibliothèque et Archives nationales du Québec), which holds the Drouin Collection covering virtually every Quebec parish register from 1621 to ~1940, (3) FamilySearch.org (free) and Ancestry.ca (paid), which have the digitized Drouin Collection — invaluable for research, though IRCC won't accept printouts as official documents. Use these to identify the exact parish and date, then order a certified copy from the appropriate authority.",
      },
      {
        question: "What are \"dit\" names and how do I handle them on my application?",
        answer:
          "The \"dit\" tradition is a Quebec/French-Canadian naming practice where families used an alternate surname — for example, \"Lafleur dit Beaulieu\" means the legal surname is Lafleur but the family was known as Beaulieu. Over generations, descendants might use either name, creating confusion when documents show different surnames. Additionally, Quebec families who moved to the US often anglicized their names: \"Leblanc\" became \"White,\" \"Boisvert\" became \"Greenwood,\" \"Roy\" became \"King.\" Pre-20th-century records also have rampant spelling variation (\"Pelletier\" / \"Peltier\" / \"Péletier\"). To handle this: (1) explain every name variation clearly in your cover letter, (2) provide marriage certificates as bridging documents — they typically show both maiden and married names plus parents' names, (3) include any legal name change documentation, and (4) consider a statutory declaration from a family member or professional genealogist attesting to the lineage. Note that in Quebec records, women are almost always recorded under their maiden name, which is actually helpful for tracing lineage.",
      },
      {
        question: "My Quebec ancestor's records are in French (or Latin). Do I need a translation?",
        answer:
          "Yes. All documents not in English or French must be accompanied by a certified translation AND a translator's affidavit. French-language documents do NOT need translation since French is an official language of Canada. However, very old Quebec parish records (pre-1800s) were sometimes written in Latin — these do require certified translation. If your records are in French and you're submitting from the US, no translation is needed, but you may want to include a brief English summary in your cover letter for clarity.",
      },
    ],
  },
  {
    title: "The Application Form (CIT 0001)",
    faqs: [
      {
        question: "What are the most common mistakes on the CIT 0001 form?",
        answer:
          "The top mistakes reported by applicants: (1) Opening the PDF in a web browser instead of Adobe Acrobat Reader — fields don't work correctly. (2) Leaving sections blank instead of writing \"NA\". (3) Forgetting to physically sign the form after printing. (4) Not including information about every person in the chain of descent. (5) Citing the wrong section of the Citizenship Act. (6) Missing dates or incomplete addresses.",
      },
      {
        question: "Which section of the Citizenship Act do I cite on my application?",
        answer:
          "This depends on your situation: s. 3(1)(b) for first generation born abroad to a Canadian parent (born before Feb 15, 1977); s. 3(1)(f) for born abroad to a Canadian parent (born after Feb 14, 1977, before April 17, 2009); s. 3(1)(g) for second and subsequent generations born abroad under Bill C-3 (retroactive, born before Dec 15, 2025); s. 3(1)(g.1) for the prospective provision (born on/after Dec 15, 2025, with substantial connection test). If unsure, explain your situation in the cover letter and let IRCC determine the applicable provision.",
      },
      {
        question: "Should I fill out one application per family member?",
        answer:
          "Yes — one CIT 0001 form per applicant. Each person needs their own form, photos, and fee payment. However, you CAN submit multiple family applications in one envelope with a master cover letter explaining the relationships. This helps IRCC process them together.",
      },
    ],
  },
  {
    title: "Cover Letters",
    faqs: [
      {
        question: "Do I need a cover letter? IRCC doesn't list it as required.",
        answer:
          "While not technically required, the overwhelming community consensus is YES — absolutely include one, especially for any multi-generational claim. A well-written cover letter maps the family tree generation by generation, cites the applicable legal section, explains name discrepancies, and notes deceased individuals. It can be the difference between smooth processing and a Procedural Fairness Letter. Think of it as making the IRCC officer's job easy.",
      },
      {
        question: "What should a cover letter include?",
        answer:
          "A proven structure: (1) Opening — state who you are and that you're applying under a specific section. (2) Family tree — list each generation from anchor (G0) to applicant with full names, dates and places of birth. (3) Legal basis — cite the specific provision (e.g., s. 3(1)(g) as amended by Bill C-3). (4) Document mapping — list every document included and what it proves. (5) Name discrepancy explanations if any. (6) Notes on deceased ancestors if applicable. (7) Closing — contact information and willingness to provide additional documentation.",
      },
    ],
  },
  {
    title: "Submitting & Processing",
    faqs: [
      {
        question: "Should I apply online or by paper?",
        answer:
          "Paper for almost all Bill C-3 claims involving G2 or beyond. The IRCC online portal was designed for straightforward first-generation cases and doesn't have adequate fields or upload capability for multi-generational chains. Even some G1 applicants use paper when their case has any complexity.",
      },
      {
        question: "What shipping method should I use?",
        answer:
          "ALWAYS use tracked courier (FedEx, UPS, DHL, or Canada Post Xpresspost). Never use regular untracked mail. Use the courier address: 49 Dorchester Street, Sydney, Nova Scotia B1P 5Z2 — NOT a PO Box. Courier companies cannot deliver to PO boxes. Keep your tracking number as proof of delivery.",
      },
      {
        question: "How long does processing take?",
        answer:
          "Approximately 10 months as of early 2026 for straightforward cases. Multi-generational Bill C-3 claims may take longer due to the surge in applications. After mailing, expect an Acknowledgment of Receipt (AOR) within 4-8 weeks. If you haven't received one after 8 weeks, follow up with IRCC.",
      },
      {
        question: "My application was returned. Now what?",
        answer:
          "Don't panic. Common reasons: wrong birth certificate format, missing documents, missing fee receipt, photos not meeting specs, form sections left blank, or poor quality photocopies. The return letter will specify what's wrong. Fix the issue and resubmit. Unfortunately, your original submission date is NOT preserved — you go to the back of the queue. This is why getting it right the first time is critical.",
      },
      {
        question: "What is a Procedural Fairness Letter (PFL)?",
        answer:
          "A PFL means IRCC has concerns about your application but is giving you a chance to address them before making a final decision. This is NOT a rejection. Common triggers include unexplained name discrepancies, questions about the chain of descent, or missing documentation. Respond promptly and thoroughly — many successful applicants received PFLs and resolved the issues.",
      },
      {
        question: "Can I expedite my application?",
        answer:
          "IRCC offers urgent processing only in specific circumstances: imminent travel, medical emergencies, employment requiring proof of citizenship, or humanitarian reasons. You generally need to already have an application in progress. Do not misrepresent your urgency — IRCC takes misrepresentation seriously.",
      },
    ],
  },
  {
    title: "CBSA Records & Physical Presence",
    faqs: [
      {
        question: "Should I request my own CBSA entry/exit records?",
        answer:
          "NO. On the CIT 0001 form, there is a consent checkbox authorizing IRCC to request CBSA records on your behalf. Check YES and let IRCC pull the records. Multiple applicants report that requesting your own CBSA records and including them actually DELAYS processing, because IRCC still pulls their own copy and the duplicate causes confusion.",
      },
      {
        question: "What evidence should I provide for the substantial connection test (1,095 days)?",
        answer:
          "Check the CBSA consent box, but also include other evidence of physical presence: T4 slips, employment records, pay stubs, school transcripts, enrollment letters, provincial health cards, rental agreements, utility bills, bank statements, and passport stamps. Don't rely solely on CBSA records — build the strongest case you can with multiple types of evidence.",
      },
    ],
  },
  {
    title: "Photos & ID Requirements",
    faqs: [
      {
        question: "What counts as acceptable ID for the application?",
        answer:
          "You need two pieces of ID, both showing full name and date of birth, with at least one bearing a photo. Common combinations: driver's license + passport, driver's license + state ID. NOT accepted: birth certificates, SIN cards, bank cards, credit cards, or library cards. For US applicants, a US driver's license + US passport is the most common combination.",
      },
      {
        question: "What are the citizenship photo specifications?",
        answer:
          "IRCC citizenship photos are NOT the same as passport photos. Key specs: 50mm x 70mm (2\" x 2.75\"), head size 31-36mm from chin to crown, white background, no glasses, taken within 6 months, and the photographer must stamp/sign the back. Go to a professional photographer and specifically ask for \"Canadian citizenship photo specifications.\" Incorrect photos are a very common reason for application returns.",
      },
    ],
  },
  {
    title: "Lawyers & Professional Help",
    faqs: [
      {
        question: "Do I need an immigration lawyer?",
        answer:
          "It depends on complexity. G1 claims (parent born in Canada) are usually straightforward enough to handle yourself. G2 claims (grandparent as anchor) — many people do it themselves, but a lawyer review helps. G3+ claims, Lost Canadian scenarios, name discrepancies, missing records, or adoption cases — legal counsel is strongly recommended. Some lawyers offer flat-fee \"document review\" services ($500-$2,000 CAD) where they review your completed package before submission.",
      },
      {
        question: "How do I find a good immigration lawyer or consultant?",
        answer:
          "Look for lawyers or RCICs (Regulated Canadian Immigration Consultants) who specifically advertise Bill C-3 or citizenship by descent expertise. Check the College of Immigration and Citizenship Consultants (CICC) register for verified RCICs, and provincial law society directories for immigration lawyers. Be wary of \"immigration consultants\" who are NOT registered with CICC — using an unauthorized representative can jeopardize your application.",
      },
    ],
  },
  {
    title: "Tax & Dual Citizenship",
    faqs: [
      {
        question: "Do I owe Canadian taxes if I become a citizen?",
        answer:
          "Generally no, if you continue to reside outside Canada. Canada taxes based on residency, not citizenship (unlike the United States). However, if you have Canadian-source income (rental property, investments) or establish \"significant residential ties\" to Canada (home, spouse, dependents, bank accounts, driver's license), CRA may consider you a tax resident. Getting a citizenship certificate alone does NOT make you a tax resident. Consult a cross-border tax advisor.",
      },
      {
        question: "Will getting Canadian citizenship affect my US citizenship?",
        answer:
          "No. Both Canada and the US allow dual citizenship. Acquiring Canadian citizenship by recognition (not through your own voluntary naturalization in another country) does not trigger US expatriation provisions. Many people successfully hold both. Consult a lawyer if you have specific concerns.",
      },
      {
        question: "Can I renounce Canadian citizenship if I don't want it?",
        answer:
          "Yes. Bill C-3 includes a simplified renunciation process for people who gained citizenship automatically but don't want it. However, there's no need to renounce unless you have a specific reason — some countries don't allow dual citizenship, and certain security clearances may be affected.",
      },
    ],
  },
  {
    title: "Practical Tips",
    faqs: [
      {
        question: "How should I organize my paper application package?",
        answer:
          "Recommended order: (1) Cover letter on top. (2) CIT 0001 form, signed. (3) Fee receipt (one copy attached, keep one). (4) Two citizenship photos in a small envelope, paper-clipped — NOT stapled or glued. (5) Your documents (birth certificate, two IDs). (6) Chain of descent documents in generational order (G0 first, working forward). (7) Supporting documents (marriage certificates, death certificates, name change docs). (8) CIT 0014 checklist filled out as a table of contents. (9) Translations with affidavits. Use colored tabs or dividers to separate sections.",
      },
      {
        question: "What are the top mistakes to avoid?",
        answer:
          "The community's most-reported mistakes: (1) Ordering short-form birth certificates instead of long-form. (2) Not including a cover letter. (3) Applying online when paper is more appropriate. (4) Requesting own CBSA records instead of using the consent checkbox. (5) Opening CIT 0001 in a browser instead of Adobe Acrobat Reader. (6) Leaving form fields blank instead of writing \"NA\". (7) Sending poor quality photocopies. (8) Not using tracked shipping. (9) Forgetting to sign the printed form. (10) Not explaining name discrepancies.",
      },
      {
        question: "Can I travel to Canada while my application is processing?",
        answer:
          "If you are not yet recognized as a Canadian citizen, you travel as a citizen of your current country. US citizens can visit Canada without a visa for up to 6 months. Having a pending citizenship application does not give you any special entry status. Do NOT attempt to use Canadian citizen entry lanes or claim Canadian citizenship at the border before receiving your certificate.",
      },
      {
        question: "What happens after I submit?",
        answer:
          "The typical timeline reported by applicants: (1) Submit via tracked courier. (2) Receive Acknowledgment of Receipt (AOR) letter in 4-8 weeks. (3) Wait several months. (4) Possibly receive a Procedural Fairness Letter if IRCC has questions. (5) Decision — approval or refusal. (6) If approved, citizenship certificate mailed to you. Total: approximately 10 months as of early 2026, possibly longer for complex cases.",
      },
    ],
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
          Common questions about Bill C-3 and the citizenship certificate
          application process, compiled from official sources and the applicant
          community.
        </p>
        {faqCategories.map((category) => (
          <div key={category.title} className="mb-12">
            <h2 className="text-2xl font-serif font-bold text-navy mb-4 pl-4 border-l-4 border-red">
              {category.title}
            </h2>
            <div>
              {category.faqs.map((faq) => (
                <FAQItem
                  key={faq.question}
                  question={faq.question}
                  answer={faq.answer}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
