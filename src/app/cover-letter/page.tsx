export default function CoverLetterPage() {
  return (
    <div className="py-12 md:py-16">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl md:text-4xl font-serif font-bold mb-3">
          Cover Letter Template
        </h1>
        <p className="text-navy-400 mb-8">
          A cover letter is strongly recommended for multi-generational Bill C-3 claims.
          It maps your family tree and cites the applicable legal section.
        </p>
        <div className="card">
          <p className="text-navy-400">
            Cover letter builder coming soon. In the meantime, your cover letter should include:
          </p>
          <ul className="mt-4 space-y-2 text-sm text-navy-400">
            <li className="flex gap-3">
              <span className="w-1.5 h-1.5 bg-maple rounded-full mt-2 shrink-0" />
              A clear family tree from your Canadian ancestor (G0) down to you
            </li>
            <li className="flex gap-3">
              <span className="w-1.5 h-1.5 bg-maple rounded-full mt-2 shrink-0" />
              The specific legal section that makes you eligible (e.g., s. 3(1)(g))
            </li>
            <li className="flex gap-3">
              <span className="w-1.5 h-1.5 bg-maple rounded-full mt-2 shrink-0" />
              Explanation of any name discrepancies or missing documents
            </li>
            <li className="flex gap-3">
              <span className="w-1.5 h-1.5 bg-maple rounded-full mt-2 shrink-0" />
              Note if any ancestors in the chain are deceased
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
