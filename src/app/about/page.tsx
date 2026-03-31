import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="py-12 md:py-16">
      <div className="max-w-3xl mx-auto px-4">
        <h1 className="text-3xl md:text-4xl font-serif font-bold mb-8">
          About Citizenship Mountie
        </h1>

        <div className="flex flex-col items-center mb-10">
          <div className="rounded-xl overflow-hidden shadow-lg mb-3">
            <Image
              src="/images/ryan-mountie.jpeg"
              alt="Ryan LeClaire, founder of Citizenship Mountie, imagined as a Mountie"
              width={400}
              height={400}
              className="object-cover"
            />
          </div>
          <p className="text-sm text-navy-400 italic text-center">
            Ryan, the founder of Citizenship Mountie, imagined here as a Mountie.
          </p>
        </div>

        <div className="prose prose-navy max-w-none space-y-5 text-navy-400 leading-relaxed">
          <p>
            Citizenship Mountie was created by <strong className="text-navy">Ryan LeClaire</strong>.
            Ryan is an American citizen who always knew he had Canadian heritage but couldn&apos;t
            access Canadian citizenship due to the first-generation limit that had been in place
            for decades.
          </p>

          <p>
            When Ryan learned about the passage of Bill C-3 in late 2025, he was ecstatic &mdash;
            and immediately dove deep into the research. What he quickly discovered was that while
            the law itself was groundbreaking, the actual process of proving citizenship by descent
            is remarkably complicated. Information was scattered across government websites, Reddit
            threads, and immigration lawyer blogs. The rules around generations, required documents,
            and application procedures were confusing even for people with legal backgrounds.
          </p>

          <p>
            Like many new applicants, Ryan found himself tracking his progress in spreadsheets,
            juggling file folders, and scattering images of vital records across his desktop. He
            figured he probably wasn&apos;t the only one struggling to keep it all straight &mdash;
            and that there had to be a better way. So he set about building the tool he wished
            had existed &mdash; a single guided experience that consolidates everything into
            one place.
          </p>

          <p>
            When Ryan isn&apos;t working on his citizenship paperwork, he consults with founders
            and leaders in educational technology as the principal consultant of his firm,{" "}
            <strong className="text-navy">EDU Sales Consults</strong>. He holds a master&apos;s
            degree in education, has served in leadership roles at several EdTech companies, and
            is a former school district administrator and classroom teacher.
          </p>
        </div>
      </div>
    </div>
  );
}
