import { BASE_PATH } from '@/lib/base-path'

// Google Maps links (shared across event venues)
export const MAPS = {
  groomHome: 'https://maps.app.goo.gl/nhMPZHmJdr8KFt377', // Anand Bhoomi, Raipur
  mainVenue: 'https://maps.app.goo.gl/smVBdhKWKrtFXKJn9', // Jharokha, Bhilai
  brideHome: 'https://maps.app.goo.gl/yfQgBJcSGi88coZe9', // Supela, Bhilai (used in bride versions)
}

export const WEDDING = {
  couple: ['Mayank', 'Mansi'] as const,
  coupleHi: ['मयंक', 'मानसी'] as const,
  dateLabel: 'December 10 - 12, 2026',
  location: 'Raipur & Bhilai, Chhattisgarh',
  venue: 'Jharokha - The Wedding Palace',
  venueAddress: 'Near Durg Bypass, NH - 06, Pushpak Nagar, Bhilai (C.G.)',
  // First celebration - used for the hero countdown (local ISO, IST)
  date: new Date('2026-12-10T07:00:00+05:30'),
  mapsUrl: MAPS.mainVenue,
  musicUrl: 'https://music.youtube.com/watch?v=Het4pXDENBI&si=Q5SzqQqMNPfFrXeB',
  // Version b (Hindi / traditional) - groom-side parents edition
  inviteLineHi: 'सादर आमंत्रण',
}

export const IS_RECEPTION = process.env.NEXT_PUBLIC_SITE === 'reception'

export const RECEPTION = {
  dateLabel: 'December 12, 2026',
  location: 'Bhilai, Chhattisgarh',
  venue: 'Jharokha - The Wedding Palace',
  venueAddress: 'Near Durg Bypass, NH - 06, Pushpak Nagar, Bhilai (C.G.)',
  date: new Date('2026-12-12T13:00:00+05:30'),
  mapsUrl: MAPS.mainVenue,
  inviteLine: 'we cordially invite you to our wedding',
}

export type EventKind = 'puja' | 'mehndi' | 'tilak' | 'haldi' | 'sangeet' | 'baraat' | 'bhoj' | 'vivah'

export type ScheduleItem = {
  title: string
  kind: EventKind
  time: string
  start: Date
  durationMinutes: number
  venue: string
  address: string
  description: string
  note?: string
  calendarLocation?: string
  mapsUrl?: string
  art?: string
}

export type ScheduleDay = {
  label: string
  dateLabel: string
  events: ScheduleItem[]
  separated?: boolean
}

const ANAND_BHOOMI = 'Anand Bhoomi, Raipur (C.G.)'
const JHAROKHA = 'Jharokha - The Wedding Palace, Bhilai (C.G.)'
const JHAROKHA_FULL = 'Jharokha - The Wedding Palace, Near Durg Bypass, NH - 06, Pushpak Nagar, Bhilai (C.G.)'

export const SCHEDULE: ScheduleDay[] = [
  {
    label: 'मांगलिक क्षण',
    dateLabel: 'Thursday, December 10, 2026',
    events: [
      {
        title: 'सत्यनारायण पूजा',
        kind: 'puja',
        art: 'event-1.png',
        time: 'प्रातः 7:00 बजे से',
        start: new Date('2026-12-10T07:00:00+05:30'),
        durationMinutes: 180,
        venue: 'Anand Bhoomi',
        address: ANAND_BHOOMI,
        description: 'सत्यनारायण पूजा',
        mapsUrl: MAPS.groomHome,
      },
      {
        title: 'मेहंदी',
        kind: 'mehndi',
        art: 'event-2.png',
        time: 'दोपहर 2:00 बजे से',
        start: new Date('2026-12-10T14:00:00+05:30'),
        durationMinutes: 240,
        venue: 'Anand Bhoomi',
        address: ANAND_BHOOMI,
        description: 'मेहंदी',
        calendarLocation: ANAND_BHOOMI,
        mapsUrl: MAPS.groomHome,
      },
    ],
  },
  {
    label: 'उत्सव के रंग',
    dateLabel: 'Friday, December 11, 2026',
    events: [
      {
        title: 'नेग तिलक',
        kind: 'tilak',
        art: 'event-3.png',
        time: 'प्रातः 9:00 बजे से',
        start: new Date('2026-12-11T09:00:00+05:30'),
        durationMinutes: 180,
        venue: 'Jharokha - The Wedding Palace',
        address: JHAROKHA,
        description: 'नेग तिलक',
        mapsUrl: MAPS.mainVenue,
      },
      {
        title: 'हल्दी',
        kind: 'haldi',
        art: 'event-4.png',
        time: 'दोपहर 1:00 बजे से',
        start: new Date('2026-12-11T13:00:00+05:30'),
        durationMinutes: 180,
        venue: 'Jharokha - The Wedding Palace',
        address: JHAROKHA,
        description: 'हल्दी',
        mapsUrl: MAPS.mainVenue,
      },
      {
        title: 'संगीत',
        kind: 'sangeet',
        art: 'event-5.png',
        time: 'सायं 7:00 बजे से',
        start: new Date('2026-12-11T19:00:00+05:30'),
        durationMinutes: 300,
        venue: 'Jharokha - The Wedding Palace',
        address: JHAROKHA,
        description: 'संगीत',
        calendarLocation: JHAROKHA_FULL,
        mapsUrl: MAPS.mainVenue,
      },
    ],
  },
  {
    label: 'शुभ विवाह',
    dateLabel: 'Saturday, December 12, 2026',
    events: [
      {
        title: 'बारात',
        kind: 'baraat',
        art: 'event-6.png',
        time: 'प्रातः 11:00 बजे से',
        start: new Date('2026-12-12T11:00:00+05:30'),
        durationMinutes: 120,
        venue: 'Jharokha - The Wedding Palace',
        address: JHAROKHA,
        description: 'बारात',
        mapsUrl: MAPS.mainVenue,
      },
      {
        title: 'आशीर्वाद एवं प्रीति भोज',
        kind: 'bhoj',
        art: 'event-7.png',
        time: 'दोपहर 1:00 बजे से',
        start: new Date('2026-12-12T13:00:00+05:30'),
        durationMinutes: 240,
        venue: 'Jharokha - The Wedding Palace',
        address: JHAROKHA,
        description: 'आशीर्वाद समारोह एवं प्रीति भोज',
        mapsUrl: MAPS.mainVenue,
      },
      {
        title: 'पाणिग्रहण',
        kind: 'vivah',
        art: 'event-8.png',
        time: 'शुभ लग्न में',
        start: new Date('2026-12-12T18:00:00+05:30'),
        durationMinutes: 180,
        venue: 'Jharokha - The Wedding Palace',
        address: JHAROKHA,
        description: 'पाणिग्रहण (शुभ लग्न)',
        calendarLocation: JHAROKHA_FULL,
        mapsUrl: MAPS.mainVenue,
      },
    ],
  },
]

export const RECEPTION_SCHEDULE: ScheduleDay[] = SCHEDULE

export const PALETTE = [
  { name: 'Espresso', hex: '#3b2f27' },
  { name: 'Clay', hex: '#a9744f' },
  { name: 'Champagne', hex: '#e4c692' },
  { name: 'Cream', hex: '#f2ead9' },
  { name: 'Sage', hex: '#8a8b6f' },
]

export const DRESS_CARDS = [
  {
    title: 'Cocktail & Dancefloor Ready',
    body: 'Elevated but easy. Think flowing fabrics, tailored suits, and shoes you can actually move in.',
  },
  {
    title: 'Warm & Earthy Tones',
    body: 'Lean into the palette — espresso, clay, champagne, cream. Skip stark white and neon.',
  },
  {
    title: 'December Evenings Get Cool',
    body: 'Chhattisgarh winter nights turn crisp. Bring a beautiful layer you will not mind dancing in.',
  },
]

export type Moment = {
  src: string
  alt: string
  span?: 'row' | 'col'
}

export const MOMENTS: Moment[] = [
  { src: `${BASE_PATH}/moment-1.jpeg`, alt: 'Mayank & Mansi', span: 'row' },
  { src: `${BASE_PATH}/moment-2.jpeg`, alt: 'Mayank & Mansi' },
  { src: `${BASE_PATH}/moment-3.jpeg`, alt: 'Mayank & Mansi' },
  { src: `${BASE_PATH}/moment-4.jpeg`, alt: 'Mayank & Mansi', span: 'row' },
  { src: `${BASE_PATH}/moment-5.jpeg`, alt: 'Mayank & Mansi' },
  { src: `${BASE_PATH}/moment-6.jpeg`, alt: 'Mayank & Mansi' },
]
