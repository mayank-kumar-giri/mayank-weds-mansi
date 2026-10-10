'use client'

import Image from 'next/image'
import { Reveal } from '@/components/reveal'
import { BASE_PATH } from '@/lib/base-path'

/**
 * Welcome / hosts section — replicates the printed invite's "swagat" page:
 * a namaste icon, आकांक्षी (host), स्वागतोत्सुक (those eager to welcome),
 * and दर्शनाभिलाषी (those wishing to see you). Content transcribed from the
 * invite screenshot with the broken Devanagari corrected.
 */

const AAKANKSHI = ['इंदु-अतुल गिरि']

const SWAGATOTSUK = [
  'अनुमेया-केतन गिरि,',
  'श्वेत, संकल्प, दिव्यांक, स्नेह,',
  'समर्थ,',
  'पियूष, अरिन, श्रुति, प्रगति…',
]

const DARSHANABHILASHI = ['समस्त गिरि परिवार एवं मित्रगण।']

function Group({ heading, lines }: { heading: string; lines: string[] }) {
  return (
    <div className="flex flex-col items-center text-center">
      <h2 lang="hi" className="font-hindi-display text-4xl text-champagne sm:text-5xl">
        {heading}
      </h2>
      <div lang="hi" className="mt-3 space-y-1 font-hindi text-lg leading-relaxed text-cream/85 sm:text-xl">
        {lines.map((line) => (
          <p key={line}>{line}</p>
        ))}
      </div>
    </div>
  )
}

export function Aakanshi() {
  return (
    <section
      id="aakanshi"
      className="wedding-section section-saffron relative px-2.5 py-10 sm:px-6 sm:py-20"
    >
      <div className="invitation-page-panel mx-auto max-w-4xl">
        <Reveal>
          <div className="flex flex-col items-center gap-10 text-center">
            {/* Namaste / pranam icon */}
            <Image
              src={`${BASE_PATH}/pranam.png?v=3`}
              alt="नमस्ते"
              width={216}
              height={216}
              className="h-36 w-36 object-contain sm:h-[10.8rem] sm:w-[10.8rem]"
              priority={false}
            />

            <Group heading="आकांक्षी:" lines={AAKANKSHI} />
            <Group heading="स्वागतोत्सुक:" lines={SWAGATOTSUK} />
            <Group heading="दर्शनाभिलाषी:" lines={DARSHANABHILASHI} />
          </div>
        </Reveal>
      </div>
    </section>
  )
}
