'use client'

import { AnimatePresence, motion } from 'framer-motion'
import Image from 'next/image'
import { Check, Heart, PartyPopper } from 'lucide-react'
import { useState } from 'react'
import { Reveal } from '@/components/reveal'
import { BASE_PATH } from '@/lib/base-path'
import { IS_RECEPTION } from '@/lib/wedding'

type Attendance = 'yes' | 'no'

// Functions is a multi-select (checkbox) in the Google Form. Labels must match exactly.
const FUNCTIONS = [
  '11th December - Tilak, Haldi, Engagement and Sangeet',
  '12th December - Baaraat, Varmala, Reception and Shaadi',
  'All In',
] as const
type FunctionAttending = (typeof FUNCTIONS)[number]

// Hindi display labels — the KEYS/values submitted to Google Form stay English
// (they must match the form's option text exactly) while the UI shows Hindi.
const FUNCTION_LABELS_HI: Record<FunctionAttending, string> = {
  '11th December - Tilak, Haldi, Engagement and Sangeet':
    '11 दिसंबर - तिलक, हल्दी, सगाई एवं संगीत',
  '12th December - Baaraat, Varmala, Reception and Shaadi':
    '12 दिसंबर - बारात, वरमाला, स्वागत एवं शुभ विवाह',
  'All In': 'सभी समारोह',
}

// Google Form: https://forms.gle/vL69PMZmWxkk4mQq5
const GOOGLE_FORM_URL =
  'https://docs.google.com/forms/d/e/1FAIpQLSdwui8cfI1jpLuuxjTqTfKOIX80N-PufR007KaHGTOY4gfouQ/formResponse'

const FORM_ENTRY = {
  name: 'entry.743993145',
  email: 'entry.1960690079',
  attendance: 'entry.2023774608',
  functions: 'entry.215163702',
  guests: 'entry.734892318',
  arrivalDate: 'entry.74938515',
  arrivalTime: 'entry.1530349637',
} as const

const ATTENDANCE_YES = 'Of course! 😎'
const ATTENDANCE_NO = "Can't make it unfortunately ☹️"

const inputClass =
  'w-full rounded-xl border border-cream/15 bg-cream/5 px-4 py-3 text-sm text-cream placeholder:text-cream/35 outline-none transition-colors focus:border-champagne/60 focus:bg-cream/10'
const labelClass =
  'mb-2 block font-hindi text-sm font-bold tracking-[0.04em] text-cream'

const CONFETTI = [
  ['8%', '#f6b934', '0s'],
  ['15%', '#d96b5f', '0.12s'],
  ['23%', '#91a86b', '0.24s'],
  ['32%', '#d786a8', '0.08s'],
  ['41%', '#f6b934', '0.32s'],
  ['50%', '#9b79c6', '0.16s'],
  ['59%', '#91a86b', '0.28s'],
  ['68%', '#d96b5f', '0.04s'],
  ['77%', '#e4c692', '0.2s'],
  ['86%', '#d786a8', '0.36s'],
  ['93%', '#f6b934', '0.1s'],
] as const

function CelebrationConfetti() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {CONFETTI.map(([left, color, delay], index) => (
        <span
          key={index}
          className="confetti-piece"
          style={{ left, backgroundColor: color, animationDelay: delay }}
        />
      ))}
    </div>
  )
}

export function Rsvp() {
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [attendance, setAttendance] = useState<Attendance>('yes')
  const [functions, setFunctions] = useState<Set<FunctionAttending>>(new Set(['All In']))
  const [guests, setGuests] = useState(1)

  function toggleFunction(option: FunctionAttending) {
    setFunctions((prev) => {
      const next = new Set(prev)
      if (next.has(option)) next.delete(option)
      else next.add(option)
      return next
    })
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSubmitting(true)
    setError('')

    const formData = new FormData(e.currentTarget)

    try {
      const googleFormData = new URLSearchParams()
      googleFormData.set(FORM_ENTRY.name, String(formData.get('name')))
      googleFormData.set(FORM_ENTRY.email, String(formData.get('email')))
      googleFormData.set(FORM_ENTRY.attendance, attendance === 'yes' ? ATTENDANCE_YES : ATTENDANCE_NO)
      googleFormData.set('fvv', '1')
      googleFormData.set('pageHistory', '0')

      if (attendance === 'yes') {
        // Checkbox field: append one param per selected value.
        for (const fn of functions) {
          googleFormData.append(FORM_ENTRY.functions, fn)
        }
        googleFormData.set(FORM_ENTRY.guests, guests === 2 ? 'Me + Mine' : 'Just me')

        const arrivalDate = String(formData.get('arrivalDate'))
        const dateParts = arrivalDate.match(/^(\d{4})-(\d{2})-(\d{2})$/)
        if (dateParts) {
          const [, year, month, day] = dateParts
          googleFormData.set(`${FORM_ENTRY.arrivalDate}_year`, year)
          googleFormData.set(`${FORM_ENTRY.arrivalDate}_month`, String(Number(month)))
          googleFormData.set(`${FORM_ENTRY.arrivalDate}_day`, String(Number(day)))
        }

        const arrivalTime = String(formData.get('arrivalTime') ?? '')
        const timeParts = arrivalTime.match(/^(\d{2}):(\d{2})$/)
        if (timeParts) {
          const [, hour, minute] = timeParts
          googleFormData.set(`${FORM_ENTRY.arrivalTime}_hour`, String(Number(hour)))
          googleFormData.set(`${FORM_ENTRY.arrivalTime}_minute`, String(Number(minute)))
        }
      }

      await fetch(GOOGLE_FORM_URL, {
        method: 'POST',
        mode: 'no-cors',
        body: googleFormData,
      })

      setSubmitted(true)
    } catch {
      setError('आपकी स्वीकृति सहेजी नहीं जा सकी। कृपया पुनः प्रयास करें।')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section id="rsvp" className="wedding-section section-sage relative px-2.5 py-10 sm:px-6 sm:py-20">
      {/* Ambient glow */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/3 -z-0 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-champagne/10 blur-[120px]"
        aria-hidden="true"
      />
      <div className="invitation-page-panel relative mx-auto max-w-2xl">
        <Reveal className="flex flex-col items-center gap-[10px] text-center">
          <Image
            src={`${BASE_PATH}/rsvp.png?v=2`}
            alt="RSVP"
            width={320}
            height={320}
            className="mx-auto h-36 w-auto object-contain sm:h-[10.8rem]"
            priority={false}
          />
          <h2 className="font-serif text-5xl font-semibold tracking-[0.08em] text-champagne sm:text-6xl">
            RSVP
          </h2>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="invitation-card glass mt-12 overflow-hidden rounded-3xl p-6 sm:p-9">
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="relative flex flex-col items-center overflow-hidden py-10 text-center"
                >
                  <CelebrationConfetti />
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.15, type: 'spring', stiffness: 200, damping: 14 }}
                    className="flex size-16 items-center justify-center rounded-full bg-champagne text-white"
                  >
                    {attendance === 'yes' ? (
                      <PartyPopper className="size-7" aria-hidden="true" />
                    ) : (
                      <Heart className="size-7" aria-hidden="true" />
                    )}
                  </motion.span>
                  <h3 lang="hi" className="font-serif mt-6 text-3xl font-light text-cream">
                    {attendance === 'yes'
                      ? 'आपकी उपस्थिति दर्ज हो गई!'
                      : 'आपकी कमी खलेगी।'}
                  </h3>
                  <p lang="hi" className="mt-3 max-w-sm text-sm leading-relaxed text-cream/60">
                    {attendance === 'yes'
                      ? 'छत्तीसगढ़ में मिलते हैं। आपके साथ उत्सव मनाने के लिए हम उत्सुक हैं।'
                      : 'बताने के लिए धन्यवाद - दूर से ही आपको हमारी शुभकामनाएँ।'}
                  </p>
                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    lang="hi"
                    className="mt-8 text-xs font-medium tracking-[0.1em] text-champagne/80 underline-offset-4 hover:underline"
                  >
                    एक और उत्तर भेजें
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="space-y-6"
                >
                  <div>
                    <label htmlFor="name" lang="hi" className={labelClass}>
                      पूरा नाम
                    </label>
                    <input
                      id="name"
                      name="name"
                      required
                      lang="hi"
                      placeholder="आपका नाम"
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label htmlFor="email" lang="hi" className={labelClass}>
                      ईमेल
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      placeholder="you@email.com"
                      className={inputClass}
                    />
                  </div>

                  <fieldset>
                    <legend lang="hi" className={labelClass}>उपस्थिति</legend>
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                      {(
                        [
                          { v: 'yes', label: 'जी बिल्कुल! 😎' },
                          { v: 'no', label: 'इस बार नहीं आ पायेंगे ☹️' },
                        ] as const
                      ).map((opt) => (
                        <label
                          key={opt.v}
                          lang="hi"
                          className={`flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 font-hindi text-sm transition-colors ${
                            attendance === opt.v
                              ? 'border-champagne/60 bg-champagne/10 text-cream'
                              : 'border-cream/15 bg-cream/5 text-cream/70 hover:border-cream/30'
                          }`}
                        >
                          <input
                            type="radio"
                            name="attendance"
                            value={opt.v}
                            checked={attendance === opt.v}
                            onChange={() => setAttendance(opt.v)}
                            className="sr-only"
                          />
                          <span
                            className={`flex size-4 items-center justify-center rounded-full border ${
                              attendance === opt.v
                                ? 'border-champagne bg-champagne'
                                : 'border-cream/40'
                            }`}
                            aria-hidden="true"
                          >
                            {attendance === opt.v && (
                              <Check className="size-3 text-white" />
                            )}
                          </span>
                          {opt.label}
                        </label>
                      ))}
                    </div>
                  </fieldset>

                  <AnimatePresence>
                    {attendance === 'yes' && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-6 overflow-hidden"
                      >
                        {!IS_RECEPTION && (
                          <fieldset>
                            <legend lang="hi" className={labelClass}>किन समारोहों में सम्मिलित होंगे</legend>
                            <p lang="hi" className="mb-3 -mt-1 font-hindi text-xs text-cream/45">जो लागू हों सभी चुनें।</p>
                            <div className="grid grid-cols-1 gap-3">
                              {FUNCTIONS.map((option) => {
                                const checked = functions.has(option)
                                return (
                                <label
                                  key={option}
                                  lang="hi"
                                  className={`flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 font-hindi text-sm transition-colors ${
                                    checked
                                      ? 'border-champagne/60 bg-champagne/10 text-cream'
                                      : 'border-cream/15 bg-cream/5 text-cream/70 hover:border-cream/30'
                                  }`}
                                >
                                  <input
                                    type="checkbox"
                                    name="functions"
                                    value={option}
                                    checked={checked}
                                    onChange={() => toggleFunction(option)}
                                    className="sr-only"
                                  />
                                  <span
                                    className={`flex size-4 items-center justify-center rounded border ${
                                      checked
                                        ? 'border-champagne bg-champagne'
                                        : 'border-cream/40'
                                    }`}
                                    aria-hidden="true"
                                  >
                                    {checked && (
                                      <Check className="size-3 text-white" />
                                    )}
                                  </span>
                                  {FUNCTION_LABELS_HI[option]}
                                </label>
                                )
                              })}
                            </div>
                          </fieldset>
                        )}

                        <div>
                          <label lang="hi" className={labelClass}>अतिथियों की संख्या</label>
                          <div className="flex gap-3">
                            {[1, 2].map((n) => (
                              <button
                                key={n}
                                type="button"
                                onClick={() => setGuests(n)}
                                lang="hi"
                                className={`flex-1 rounded-xl border px-4 py-3 text-sm transition-colors ${
                                  guests === n
                                    ? 'border-champagne/60 bg-champagne/10 text-cream'
                                    : 'border-cream/15 bg-cream/5 text-cream/70 hover:border-cream/30'
                                }`}
                              >
                                {n === 1 ? 'केवल मैं' : 'मैं और परिवार'}
                              </button>
                            ))}
                          </div>
                        </div>

                        {!IS_RECEPTION && (
                          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                            <div>
                              <label htmlFor="arrivalDate" lang="hi" className={labelClass}>
                                आगमन तिथि
                              </label>
                              <input
                                id="arrivalDate"
                                name="arrivalDate"
                                type="date"
                                className={inputClass}
                              />
                            </div>
                            <div>
                              <label htmlFor="arrivalTime" lang="hi" className={labelClass}>
                                आगमन समय
                              </label>
                              <input
                                id="arrivalTime"
                                name="arrivalTime"
                                type="time"
                                className={inputClass}
                              />
                            </div>
                          </div>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {error && (
                    <p role="alert" className="text-center text-sm text-red-300">
                      {error}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={submitting}
                    lang="hi"
                    className="diya-glow w-full rounded-xl bg-champagne py-3.5 text-sm font-semibold text-white transition-transform hover:scale-[1.01] active:scale-[0.99] disabled:cursor-wait disabled:opacity-60"
                  >
                    {submitting
                      ? 'भेजा जा रहा है…'
                      : attendance === 'yes'
                        ? 'मुझे सम्मिलित करें'
                        : 'उत्तर भेजें'}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
