import { Testimonial, FAQItem } from '../types';

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'test-1',
    quote: '"I would recommend SharePal for anybody looking to rent gaming gear or trekking gears, on time delivery, condition of products delivered were very good, super..."',
    name: 'Satyaki',
    initials: 'SB',
    cityAndCategory: 'Kolkata • Trekking Gear',
    rating: 5,
    avatarBgColor: 'bg-purple-100 text-purple-700',
  },
  {
    id: 'test-2',
    quote: '"Have used their services twice now. They never disappoint. Quick responses, polite, transparent, hassle free, great products as well. Rented gaming consoles..."',
    name: 'Afrana',
    initials: 'AS',
    cityAndCategory: 'Bangalore • Gaming Console',
    rating: 5,
    avatarBgColor: 'bg-blue-100 text-blue-700',
  },
  {
    id: 'test-3',
    quote: '"It\'s an amazing service, starting from the quality of the gear provided to the pickup and drop at doorstep facility. The staff is extremely helpful and supportive..."',
    name: 'Kanthikiran',
    initials: 'KK',
    cityAndCategory: 'Bangalore • Riding Gear',
    rating: 5,
    avatarBgColor: 'bg-indigo-100 text-indigo-700',
  },
  {
    id: 'test-4',
    quote: '"I am a regular customer and order ps4/ps5. It\'s very affordable and booking an order is super easy and user friendly website and polite staff."',
    name: 'Amal',
    initials: 'AA',
    cityAndCategory: 'Bangalore • Gaming Console',
    rating: 5,
    avatarBgColor: 'bg-emerald-100 text-emerald-700',
  },
  {
    id: 'test-5',
    quote: '"Rented PS5 for a weekend gaming tournament with friends. Setup was effortless, zero deposit hassles and games came pre-installed. Brilliant service!"',
    name: 'Rohit Verma',
    initials: 'RV',
    cityAndCategory: 'Bangalore • Gaming Console',
    rating: 5,
    avatarBgColor: 'bg-amber-100 text-amber-700',
  },
  {
    id: 'test-6',
    quote: '"Rented Meta Quest 3 for a VR exhibition. The kit was crystal clean, sanitised with protective headstraps and lens covers. Will definitely rent again."',
    name: 'Neha Patel',
    initials: 'NP',
    cityAndCategory: 'Bangalore • VR Headset',
    rating: 5,
    avatarBgColor: 'bg-rose-100 text-rose-700',
  },
];

export const FAQ_ITEMS: FAQItem[] = [
  {
    id: 'faq-1',
    question: 'How can I rent from SharePal?',
    answer: 'Simply pick your desired gaming console or gear, select your delivery and return dates, upload basic KYC verification documents, and place the booking with doorstep delivery across Bangalore!',
  },
  {
    id: 'faq-2',
    question: 'If I rent multiple products, do I need to extend the rental duration for all or partial extension is possible?',
    answer: 'Partial extension is definitely supported. You can selectively extend specific items directly from the "My Orders" tab on your dashboard or via our dedicated WhatsApp support team.',
  },
  {
    id: 'faq-3',
    question: 'When does the rental start?',
    answer: 'Your rental clock starts on the confirmed delivery date you picked, usually delivered between 10 AM to 6 PM. Return pickups occur smoothly on your selected pickup day between 9 AM to 1 PM.',
  },
  {
    id: 'faq-4',
    question: 'What will be the condition of the products at the time of delivery?',
    answer: 'Every gaming gadget undergoes rigorous 18-step testing, sanitation, and firmware updates. You receive clean, verified gear packed in a protective SharePal travel case with authentic cables and accessories.',
  },
  {
    id: 'faq-5',
    question: 'Why is verification required?',
    answer: 'Because we offer premium high-end gaming equipment with zero or minimal security deposits, brief ID and address verification ensures a safe, verified, and trusted community rental experience.',
  },
  {
    id: 'faq-6',
    question: 'Is security deposit required?',
    answer: 'Most verified orders do not require any security deposit. For certain high-end VR headsets or long-duration orders, a nominal refundable deposit may apply, which is returned within 24 hours of pickup.',
  },
  {
    id: 'faq-7',
    question: 'What if a game or controller stops working during rental?',
    answer: 'Our Bangalore technical support is available on WhatsApp and call. In case of any hardware malfunction not caused by physical damage, we provide free doorstep replacement within 4-6 hours.',
  },
];
