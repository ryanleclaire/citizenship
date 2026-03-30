"use client";

import { useState, type ReactNode } from "react";

const faqCategories: {
  title: string;
  faqs: { question: string; answer: string | ReactNode }[];
}[] = [
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
      {
        question: "If my application is granted, when does my citizenship begin?",
        answer:
          "Your application is for proof that you already are a citizen by descent — it is not an application for citizenship. If approved, your citizenship began on the date of your birth OR on a date near 1947 (the specific date depends on the province of birth of your ancestor), whichever is later. The 1947 date corresponds to when the Canadian Citizenship Act first came into force.",
      },
      {
        question: "I plan to have a baby soon and want my child to be Canadian. What should I do?",
        answer:
          "For children born on or after December 15, 2025 to a Canadian parent born abroad, you have three options: (1) Spend at least 1,095 days (3 years) in Canada at any time during your life before your child is born — this satisfies the substantial connection test. (2) Have your baby in Canada — anyone born in Canada is a Canadian citizen. (3) After your baby is born outside Canada, sponsor your child for permanent residence, move to Canada, and have your child naturalized after living in Canada for the required period (generally 3 of the last 5 years).",
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
          "IRCC appears to know about and follow the legal doctrine of idem sonans: if it sounds the same, it is the same. Common name variations like Richard/Rich/Dick, Robert/Bob, Sue/Susie/Susan have been accepted. Dropped or swapped middle and first names have been accepted. For records before the 1930s, even age variations have been overlooked where other evidence shows it was the same person. That said, it helps to include bridging documents: marriage certificates, legal name change documents, statutory declarations, or immigration records showing both names. Always explain discrepancies in your cover letter.",
      },
      {
        question: "My ancestor was born before birth registration was mandatory. What can I use?",
        answer:
          "Per CIT 0014 (Scenario 3, checkbox 2), you can provide \"any other evidence that your parent is a Canadian citizen, such as those described in Scenarios 4 and 5.\" IRCC has accepted alternative proof for ancestors born before their province kept birth records. Look for census records, marriage records, death records, and even children's birth records — all of which may show country of birth. Church/baptismal records, immigration records, and parish records can also support your case. Check Library and Archives Canada, provincial archives, FamilySearch.org, and Ancestry.ca.",
      },
      {
        question: "Do I need certified copies or will photocopies work?",
        answer:
          "Certified copies are NOT required. The instructions only require color copies, and IRCC has approved numerous applications without certified copies. Send clear color photocopies and make sure every detail is legible. In the few instances where IRCC wants a certified copy, they will ask you for it. Do not offer certified copies in your cover letter unless you have them — some applicants report IRCC asked for them only because they were mentioned in the letter.",
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
        question: "Which box should I check at the top of page 1 of CIT 0001?",
        answer:
          "You can check any or all of the last three boxes. All are valid grounds for requesting a Proof of Citizenship.",
      },
      {
        question: "Which box should I check for my parent's citizenship?",
        answer:
          "If you are claiming citizenship by descent, check the box next to \"Parent 1 is/was a Canadian citizen\" and then indicate \"Parent obtained citizenship by descent\" or \"Parent obtained citizenship by birth in Canada\" depending on their circumstances.",
      },
      {
        question: "Should I fill out one application per family member?",
        answer:
          "Yes — one CIT 0001 form per applicant, each with their own CIT 0014, photos, and identity documents. However, you CAN submit multiple applications in one envelope. Pay the fee for everyone at once and put the receipt first. If everyone shares the same lineage, you can send one set of supporting evidence for the group. Be careful with large groups, though — if IRCC determines any required document is missing for any one person, the entire packet will be returned and everyone's application will be delayed by 4-6 weeks.",
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
          "IRCC's stated target is approximately 10 months for citizenship certificate applications. However, some urgent applications have been approved in as little as 2 months, while more complicated or incomplete submissions needing resubmission could take significantly longer. You can request urgent processing under certain conditions, but there is no guarantee IRCC will grant it. After mailing, expect an Acknowledgment of Receipt (AOR) within a few weeks.",
      },
      {
        question: "Can I submit more documents after my application is accepted?",
        answer:
          "Yes. If your application is accepted (rather than returned), you will receive an Acknowledgment of Receipt (AOR) and you can upload additional documents electronically using IRCC's web form. If it is returned because it is incomplete, the entire packet comes back and you must fix the error and resubmit on paper. You will not have to pay the fee a second time.",
      },
      {
        question: "My application was returned. Now what?",
        answer:
          "Don't panic. Common reasons: wrong birth certificate format, missing documents, missing fee receipt, photos not meeting specs, form sections left blank, or poor quality photocopies. The return letter will specify what's wrong. Fix the issue and resubmit the entire packet on paper. You will not have to pay the fee again. Unfortunately, your original submission date is NOT preserved — you go to the back of the queue. This is why getting it right the first time is critical.",
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
          "Do NOT staple or bind your documents — IRCC scans all applications and then shreds the originals. If you bind the papers together, you're just making it harder for them. Use paperclips. Number each page on the bottom right-hand corner so that if someone drops the packet, they can easily put things back in order. Recommended order: (1) Cover letter on top. (2) CIT 0001 form, signed. (3) Fee receipt (one copy attached, keep one). (4) Two citizenship photos in a small envelope, paper-clipped. (5) Your documents (birth certificate, two IDs). (6) Chain of descent documents in generational order (G0 first, working forward). (7) Supporting documents (marriage certificates, death certificates, name change docs). (8) CIT 0014 checklist filled out as a table of contents. (9) Translations with affidavits.",
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
          "The typical sequence: (1) Submit via tracked courier. (2) Receive Acknowledgment of Receipt (AOR) letter — timing varies. (3) Wait — this is the longest phase and can range from a few months to well over a year. (4) Possibly receive a Procedural Fairness Letter (PFL) if IRCC has questions — this is not a rejection. (5) Decision — approval or refusal. (6) If approved, citizenship certificate mailed to you. There is no reliable estimate for total processing time.",
      },
    ],
  },
  {
    title: "About Citizenship Mountie",
    faqs: [
      {
        question: "What is the difference between the free and paid levels?",
        answer: (
          <div className="space-y-4">
            <p>
              Citizenship Mountie offers a free tier with full access to educational content, plus paid plans
              that unlock personalized tools to help you prepare your application.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border border-gray-200 rounded-lg">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="text-left py-2 px-3 font-semibold text-navy border-b">Feature</th>
                    <th className="text-center py-2 px-3 font-semibold text-navy border-b">Free</th>
                    <th className="text-center py-2 px-3 font-semibold text-navy border-b">Individual ($9/mo)</th>
                    <th className="text-center py-2 px-3 font-semibold text-navy border-b">Family ($17/mo)</th>
                  </tr>
                </thead>
                <tbody className="text-navy-400">
                  <tr className="border-b border-gray-100">
                    <td className="py-2 px-3">Eligibility quiz</td>
                    <td className="py-2 px-3 text-center text-green-600">&#10003;</td>
                    <td className="py-2 px-3 text-center text-green-600">&#10003;</td>
                    <td className="py-2 px-3 text-center text-green-600">&#10003;</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-2 px-3">Step-by-step application guide</td>
                    <td className="py-2 px-3 text-center text-green-600">&#10003;</td>
                    <td className="py-2 px-3 text-center text-green-600">&#10003;</td>
                    <td className="py-2 px-3 text-center text-green-600">&#10003;</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-2 px-3">FAQ &amp; resource library</td>
                    <td className="py-2 px-3 text-center text-green-600">&#10003;</td>
                    <td className="py-2 px-3 text-center text-green-600">&#10003;</td>
                    <td className="py-2 px-3 text-center text-green-600">&#10003;</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-2 px-3">Family Chain Builder (save &amp; edit)</td>
                    <td className="py-2 px-3 text-center text-navy-300">&mdash;</td>
                    <td className="py-2 px-3 text-center text-green-600">&#10003;</td>
                    <td className="py-2 px-3 text-center text-green-600">&#10003;</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-2 px-3">Document Vault (track &amp; upload)</td>
                    <td className="py-2 px-3 text-center text-navy-300">&mdash;</td>
                    <td className="py-2 px-3 text-center text-green-600">&#10003;</td>
                    <td className="py-2 px-3 text-center text-green-600">&#10003;</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-2 px-3">AI Cover Letter Drafter</td>
                    <td className="py-2 px-3 text-center text-navy-300">&mdash;</td>
                    <td className="py-2 px-3 text-center text-green-600">&#10003;</td>
                    <td className="py-2 px-3 text-center text-green-600">&#10003;</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-2 px-3">Document checklist (save progress)</td>
                    <td className="py-2 px-3 text-center text-navy-300">&mdash;</td>
                    <td className="py-2 px-3 text-center text-green-600">&#10003;</td>
                    <td className="py-2 px-3 text-center text-green-600">&#10003;</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-2 px-3">PDF export</td>
                    <td className="py-2 px-3 text-center text-navy-300">&mdash;</td>
                    <td className="py-2 px-3 text-center text-green-600">&#10003;</td>
                    <td className="py-2 px-3 text-center text-green-600">&#10003;</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3">Track pre-submission for applicants</td>
                    <td className="py-2 px-3 text-center text-navy-300">&mdash;</td>
                    <td className="py-2 px-3 text-center">1 applicant</td>
                    <td className="py-2 px-3 text-center">Up to 10</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p>
              The free tier gives you everything you need to understand the process. Paid plans add
              the tools that make preparing your actual application faster and more organized.
            </p>
          </div>
        ),
      },
      {
        question: "Is Citizenship Mountie affiliated with the Canadian government?",
        answer:
          "No. Citizenship Mountie is an independent informational tool. It is not affiliated with, endorsed by, or connected to Immigration, Refugees and Citizenship Canada (IRCC) or the Government of Canada. For official information, always refer to IRCC's website at canada.ca.",
      },
      {
        question: "Does Citizenship Mountie provide legal advice?",
        answer:
          "No. Citizenship Mountie provides general guidance to help you understand and navigate the citizenship certificate application process. It is not a substitute for legal advice. Immigration law is complex, and individual circumstances vary. For personalized advice, consult a licensed immigration lawyer or Regulated Canadian Immigration Consultant (RCIC).",
      },
    ],
  },
];

function FAQItem({ question, answer }: { question: string; answer: string | ReactNode }) {
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
