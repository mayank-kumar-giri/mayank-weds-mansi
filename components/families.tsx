'use client'

import { Reveal } from '@/components/reveal'

/**
 * Invitation body — a single flowing page (not cards), mirroring the printed
 * invite: mangal shloka, address to guests, groom block, संग, bride block,
 * and the closing line. Content transcribed from the invite screenshot.
 */

const GROOM = {
  honorific: 'आयुष्मान',
  name: 'मयंक',
  tagline: '(IIITian Raipur)',
  lines: [
    'सुपौत्रः स्मृतिशेष दयमन्ती देवी एवं स्मृतिशेष रमेश चंद्र गिरि',
    'सुपुत्रः श्रीमती इंदु गिरि एवं डॉ. अतुल कुमार गिरि',
    'आनंद भूमि, रायपुर (छ.ग.)',
  ],
}

const BRIDE = {
  honorific: 'आयुष्मति',
  name: 'मानसी',
  tagline: '(KIITian Bhubaneswar)',
  lines: [
    'सुपौत्रीः श्रीमती शिवरानी देवी एवं श्री ब्रह्मदत्त शर्मा',
    'सुपुत्रीः श्रीमती शैली शर्मा एवं श्री जीवन कुमार शर्मा',
    'सुपेला, भिलाई (छ.ग.)',
  ],
}

function PersonBlock({ person }: { person: typeof GROOM }) {
  return (
    <div className="flex flex-col items-center text-center">
      <p lang="hi" className="font-hindi text-lg text-champagne sm:text-xl">
        {person.honorific}
      </p>
      <p
        lang="hi"
        className="font-hindi-display mt-1 text-4xl text-champagne sm:text-5xl"
      >
        {person.name}
      </p>
      <p lang="hi" className="mt-2 font-hindi italic text-base text-cream/70 sm:text-lg">
        {person.tagline}
      </p>

      <div className="mt-4 space-y-1.5">
        {person.lines.map((line) => (
          <p
            key={line}
            lang="hi"
            className="font-hindi text-sm leading-relaxed text-cream/80 sm:text-base"
          >
            {line}
          </p>
        ))}
      </div>
    </div>
  )
}

export function Families() {
  return (
    <section
      id="families"
      className="wedding-section section-rose relative px-2.5 py-10 sm:px-6 sm:py-20"
    >
      <div className="invitation-page-panel mx-auto max-w-4xl">
        <Reveal>
          <div className="flex flex-col items-center gap-8 text-center">
            {/* Mangal shloka */}
            <div lang="hi" className="font-hindi space-y-1 text-sm leading-relaxed text-cream/75 sm:text-base">
              <p>मंगलं भगवान विष्णुः, मंगलं गरुड़ध्वजः।</p>
              <p>मंगलं पुण्डरीकाक्षः, मंगलाय तनो हरिः॥</p>
            </div>

            {/* Address to guests */}
            <div lang="hi" className="font-hindi space-y-1 text-base leading-relaxed text-cream/80 sm:text-lg">
              <p>स्नेही स्वजन,</p>
              <p>परम पिता परमेश्वर की असीम अनुकम्पा से,</p>
            </div>

            {/* Groom */}
            <PersonBlock person={GROOM} />

            {/* संग */}
            <p lang="hi" className="font-hindi-display text-2xl text-champagne sm:text-3xl">
              संग
            </p>

            {/* Bride */}
            <PersonBlock person={BRIDE} />

            {/* Closing line */}
            <div lang="hi" className="font-hindi space-y-1 text-base leading-relaxed text-cream/80 sm:text-lg">
              <p>के पावन परिणयोत्सव की मांगलिक बेलाओं में सपरिवार</p>
              <p>आपकी उपस्थिति प्रार्थनीय है।</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
