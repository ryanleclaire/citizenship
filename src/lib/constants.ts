export const IRCC_LINKS = {
  billC3Changes: "https://www.canada.ca/en/immigration-refugees-citizenship/services/canadian-citizenship/act-changes/rules-2025.html",
  cit0001Guide: "https://www.canada.ca/en/immigration-refugees-citizenship/services/application/application-forms-guides/guide-0001-application-citizenship-certificate-adults-minors-proof-citizenship-section-3.html",
  cit0014Checklist: "https://www.canada.ca/en/immigration-refugees-citizenship/services/application/application-forms-guides/cit0014.html",
  applicationPage: "https://www.canada.ca/en/immigration-refugees-citizenship/services/application/application-forms-guides/application-citizenship-certificate-adults-minors.html",
  onlinePortal: "https://portal-portail.apps.cic.gc.ca/",
  photoSpecs: "https://www.canada.ca/en/immigration-refugees-citizenship/services/application/application-forms-guides/citizenship-application-photograph-specifications.html",
  feePayment: "https://ircc.canada.ca/english/information/fees/pay.asp",
  backgrounder: "https://www.canada.ca/en/immigration-refugees-citizenship/news/2025/12/bill-c-3-an-act-to-amend-the-citizenship-act-2025-comes-into-effect.html",
  billText: "https://www.parl.ca/legisinfo/en/bill/45-1/c-3",
  justiceAnalysis: "https://www.justice.gc.ca/eng/csj-sjc/pl/charter-charte/c3_2.html",
  citizenshipAct: "https://laws-lois.justice.gc.ca/eng/acts/c-29/page-1.html",
  urgentProcessing: "https://ircc.canada.ca/english/helpcentre/answer.asp?qnum=1558&top=5",
  subreddit: "https://www.reddit.com/r/Canadiancitizenship/",
  processingTimes: "https://www.canada.ca/en/immigration-refugees-citizenship/services/application/check-processing-times.html",
  applicationTracker: "https://services3.cic.gc.ca/ecas/",
  irccWebForm: "https://ircc.canada.ca/english/contacts/web-form.asp",
  proofOfCitizenship: "https://www.canada.ca/en/immigration-refugees-citizenship/services/canadian-citizenship/proof-citizenship.html",
  embassyFinder: "https://www.international.gc.ca/country-pays/index.aspx?lang=eng",
} as const;

export const LEGAL_ANALYSIS_LINKS = {
  hayerLaw: "https://hayerlawoffice.ca/2025/11/03/no-bill-c-3-does-not-create-a-new-second-generation/",
  dentons: "https://www.dentons.com/en/insights/articles/2025/december/19/bill-c-3-restores-canadian-citizenship-to-lost-canadians",
  eyTaxAlert: "https://www.ey.com/en_gl/technical/tax-alerts/bill-c-3-the-lost-canadians-act-comes-into-force-removing-first-generation-limit-to-canadian-citizenship",
  cbaSubmission: "https://cba.org/Our-Impact/Submissions/Bill-C-3-An-Act-to-amend-the-Citizenship-Act-2025",
  lostCanadian: "https://www.lostcanadian.com/",
} as const;

export const PROVINCIAL_VITAL_STATS = [
  { province: "Alberta", href: "https://www.alberta.ca/order-birth-certificate" },
  { province: "British Columbia", href: "https://www2.gov.bc.ca/gov/content/life-events/birth-adoption/births/birth-certificates" },
  { province: "Manitoba", href: "https://vitalstats.gov.mb.ca/" },
  { province: "New Brunswick", href: "https://www.snb.ca/e/1000/1000-01/e/1000-01-01e.asp" },
  { province: "Newfoundland & Labrador", href: "https://www.gov.nl.ca/dgsnl/birth/" },
  { province: "Northwest Territories", href: "https://www.hss.gov.nt.ca/en/services/registering-vital-event" },
  { province: "Nova Scotia", href: "https://novascotia.ca/sns/access/vitalstats.asp" },
  { province: "Nunavut", href: "https://www.gov.nu.ca/health/information/vital-statistics" },
  { province: "Ontario", href: "https://www.ontario.ca/page/get-or-replace-ontario-birth-certificate" },
  { province: "Prince Edward Island", href: "https://www.princeedwardisland.ca/en/information/health-pei/vital-statistics" },
  { province: "Quebec (Directeur de l'état civil)", href: "https://www.etatcivil.gouv.qc.ca/en/birth-certificate.html" },
  { province: "Saskatchewan", href: "https://www.ehealthsask.ca/residents/vital-statistics" },
  { province: "Yukon", href: "https://yukon.ca/en/births-marriages-and-deaths/births/get-birth-certificate" },
] as const;

export const GENEALOGY_LINKS = {
  libraryArchivesCanada: "https://library-archives.canada.ca/eng/collection/research-help/genealogy-family-history/pages/genealogy-family-history.aspx",
  familySearch: "https://www.familysearch.org/",
  ancestryCa: "https://www.ancestry.ca/",
  banq: "https://www.banq.qc.ca/",
  automatedGenealogy: "https://automatedgenealogy.com/",
} as const;

export const MAILING_ADDRESS = {
  courier: {
    name: "Case Processing Centre \u2013 Sydney-Proofs",
    street: "49 Dorchester Street",
    city: "Sydney, Nova Scotia",
    postal: "B1P 5Z2",
    country: "Canada",
  },
} as const;

export const DISCLAIMER =
  "This tool provides general guidance only and does not constitute legal advice. Immigration law is complex, and individual circumstances vary. For personalized advice, consult a licensed immigration lawyer or Regulated Canadian Immigration Consultant (RCIC). This app is not affiliated with or endorsed by Immigration, Refugees and Citizenship Canada (IRCC) or the Government of Canada.";

export const PROCESSING_FEE = "$75 CAD";
export const PROCESSING_TIME = "~10 months";
export const BILL_C3_EFFECTIVE_DATE = "December 15, 2025";
export const PHYSICAL_PRESENCE_DAYS = 1095;
