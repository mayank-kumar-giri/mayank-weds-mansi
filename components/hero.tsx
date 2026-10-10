'use client'

import { motion } from 'framer-motion'
import { Countdown } from '@/components/countdown'
import { GaneshEmblem } from '@/components/indian-ornaments'
import { BASE_PATH } from '@/lib/base-path'
import { IS_RECEPTION, RECEPTION, WEDDING } from '@/lib/wedding'

/**
 * Shared invitation content. All sizes are in `em`, relative to the font-size
 * set on the overlay wrapper. Each overlay below sets that base in `cqw`
 * (container-relative), so the whole block scales with its background's arch
 * and can be tuned bigger/smaller per layout by changing one number.
 */
function HeroContent() {
  return (
    <>
      {/* Ganesh + mantra */}
      <motion.div
        className="flex flex-col items-center"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
      >
        <GaneshEmblem className="h-[2em] w-[2em] object-contain" />
        <p lang="hi" className="font-hindi mt-[0.3em] text-[0.42em] tracking-[0.08em] text-[#a96949]">
          ॥ श्री गणेशाय नमः ॥
        </p>
      </motion.div>

      {/* मंगल परिणय + dates */}
      <motion.div
        className="mt-[0.9em] flex flex-col items-center gap-[0.12em]"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.1 }}
      >
        <p lang="hi" className="font-hindi-display text-champagne text-[1.1em] leading-tight">
          मंगल परिणय
        </p>
        <p lang="hi" className="text-cream/85 text-[0.62em] tracking-wide">
          11-12 दिसंबर, 2026
        </p>
      </motion.div>

      {/* Names - संग centered between equal-width name columns */}
      <motion.h1
        lang="hi"
        className="font-hindi-display mt-[1em] flex w-full items-baseline justify-center whitespace-nowrap leading-none text-cream"
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
      >
        <span className="flex-1 basis-0 pr-[0.4em] text-champagne text-right text-[1.62em]">{WEDDING.coupleHi[0]}</span>
        <span className="shrink-0 text-champagne/90 text-[0.85em]">संग</span>
        <span className="flex-1 basis-0 pl-[0.4em] text-champagne text-left text-[1.62em]">{WEDDING.coupleHi[1]}</span>
      </motion.h1>

      {/* प्रेषक */}
      <motion.div
        className="mt-[0.8em] flex flex-col items-center gap-[0.08em]"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        <p lang="hi" className="font-hindi text-[0.46em] font-medium text-[#a96949]">प्रेषक:</p>
        <p lang="hi" className="font-hindi text-cream text-[0.7em]">अतुल कुमार गिरि</p>
        <p lang="hi" className="font-hindi mt-[0.08em] text-[0.42em] leading-relaxed text-cream/70">
          <span className="block">प्लॉट - 123, फेज - 1, आनंद भूमि,</span>
          <span className="block">लाभांडी, रायपुर - 492012, छ.ग.</span>
        </p>
        <p lang="hi" className="font-hindi text-[0.42em] leading-relaxed text-cream/70">
          मो. 9589786763, 7000724665
        </p>
      </motion.div>

      {/* Countdown */}
      <motion.div
        className="mt-[1.5em]"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.7 }}
      >
        <Countdown target={IS_RECEPTION ? RECEPTION.date : WEDDING.date} />
      </motion.div>
    </>
  )
}

export function Hero() {
  return (
    <section className="hero-invitation relative w-full bg-[#f8f0dd]">
      {/* ---------- Phone / portrait ---------- */}
      <div className="relative mx-auto block w-full max-w-[560px] min-[900px]:hidden">
        <img
          src={`${BASE_PATH}/indian-wedding-hero-centered.png`}
          alt=""
          aria-hidden="true"
          className="block h-auto w-full select-none"
        />
        {/* content overlay establishes its own container; base font-size (cqw) scales the whole block */}
        <div className="absolute left-1/2 top-[11%] z-10 flex w-[80%] -translate-x-1/2 flex-col items-center text-center text-[6.4cqw] [container-type:inline-size]">
          <HeroContent />
        </div>
      </div>

      {/* ---------- Desktop / landscape ---------- */}
      <div className="relative mx-auto hidden w-full min-[900px]:block">
        <img
          src={`${BASE_PATH}/indian-wedding-hero-desktop-botanical.png`}
          alt=""
          aria-hidden="true"
          className="block h-auto w-full select-none"
        />
        {/* desktop arch is centred and narrower; container width tuned to it */}
        <div className="absolute left-1/2 top-[6%] z-10 flex w-[30%] -translate-x-1/2 flex-col items-center text-center text-[2.8cqw] [container-type:inline-size]">
          <HeroContent />
        </div>
      </div>
    </section>
  )
}
