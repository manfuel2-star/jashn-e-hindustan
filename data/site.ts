export const BLUR_DATA_URL =
  "data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHdpZHRoPSc0MCcgaGVpZ2h0PSczMCc+PHJlY3Qgd2lkdGg9JzQwJyBoZWlnaHQ9JzMwJyBmaWxsPScjMjgxMTEzJy8+PC9zdmc+";

export const navItems = [
  { href: "/", label: "Festival" },
  { href: "/schedule", label: "Schedule" },
  { href: "/programs-and-sessions", label: "Programs" },
  { href: "/visitors-guide", label: "Visit" },
  { href: "/faqs", label: "FAQs" },
];

export const grandStageEvents = [
  {
    title: "Raag of the Rising Sun",
    subtitle: "A dawn-to-dusk classical odyssey",
    image: "/images/instrument.jpg",
    meta: "Surya Manch · Friday 7:30 PM",
  },
  {
    title: "Kathak: A River in Motion",
    subtitle: "Rhythm, memory and contemporary form",
    image: "/images/classical-dance.jpg",
    meta: "Surya Manch · Saturday 8:15 PM",
  },
  {
    title: "One Sky, Many Songs",
    subtitle: "Folk voices from eight regions of India",
    image: "/images/folk-dance.jpg",
    meta: "Surya Manch · Sunday 7:45 PM",
  },
];

export const programs = [
  {
    title: "The Poetry of Belonging",
    category: "Literature",
    description:
      "Poets writing in Hindi, Urdu, Bangla, Kashmiri and Malayalam read new work on home, inheritance and the many ways a nation speaks.",
    image: "/images/diya.jpg",
  },
  {
    title: "Strings Across the Deccan",
    category: "Music",
    description:
      "An intimate dialogue between veena, sarangi and percussion—tracing resonances shared across Hindustani and Carnatic traditions.",
    image: "/images/musician.jpg",
  },
  {
    title: "The Living Loom",
    category: "Craft",
    description:
      "Master weavers and young designers discuss how handloom knowledge travels through families, regions and new creative economies.",
    image: "/images/weaving.jpg",
  },
  {
    title: "Kite Stories",
    category: "Family",
    description:
      "A playful workshop of paper, flight and oral histories inspired by kite-making traditions from Gujarat to Old Delhi.",
    image: "/images/kites.jpg",
  },
  {
    title: "Colours That Remember",
    category: "Visual Art",
    description:
      "Artists and natural-dye practitioners explore colour as material, memory and a language shared across generations.",
    image: "/images/colour.jpg",
  },
  {
    title: "After Dark: A Thousand Lamps",
    category: "Immersive",
    description:
      "A sound-and-light walk through the gardens, composed around field recordings, poetry and the warmth of handmade lamps.",
    image: "/images/lights.jpg",
  },
  {
    title: "Carved by Hand",
    category: "Demonstration",
    description:
      "Watch woodcarvers translate geometry, folklore and patience into objects that carry the touch of their maker.",
    image: "/images/woodcraft.jpg",
  },
  {
    title: "City as Archive",
    category: "Conversation",
    description:
      "Historians, photographers and writers read Delhi through courtyards, bazaars, monuments and the stories hidden between them.",
    image: "/images/qutub.jpg",
  },
];

export type ScheduleEvent = {
  day: "Friday" | "Saturday" | "Sunday";
  time: string;
  title: string;
  artist: string;
  stage: "Surya Manch" | "Katha Baithak" | "Rang Courtyard" | "Karigar Adda";
  type: string;
};

export const scheduleEvents: ScheduleEvent[] = [
  { day: "Friday", time: "4:00 PM", title: "Opening Procession: Many Indias", artist: "Led by 60 folk artists", stage: "Rang Courtyard", type: "Procession" },
  { day: "Friday", time: "5:15 PM", title: "The Poetry of Belonging", artist: "Five languages, five poets", stage: "Katha Baithak", type: "Poetry" },
  { day: "Friday", time: "6:00 PM", title: "Carved by Hand", artist: "Demonstration with master artisans", stage: "Karigar Adda", type: "Craft" },
  { day: "Friday", time: "7:30 PM", title: "Raag of the Rising Sun", artist: "Aditi Rao Ensemble", stage: "Surya Manch", type: "Music" },
  { day: "Friday", time: "9:00 PM", title: "A Thousand Lamps", artist: "Immersive garden walk", stage: "Rang Courtyard", type: "Immersive" },
  { day: "Saturday", time: "11:00 AM", title: "Kite Stories", artist: "Ages 7+ with Farah Ahmed", stage: "Karigar Adda", type: "Workshop" },
  { day: "Saturday", time: "12:30 PM", title: "City as Archive", artist: "A conversation on Delhi", stage: "Katha Baithak", type: "Conversation" },
  { day: "Saturday", time: "3:00 PM", title: "Strings Across the Deccan", artist: "Veena, sarangi & mridangam", stage: "Rang Courtyard", type: "Music" },
  { day: "Saturday", time: "5:30 PM", title: "The Living Loom", artist: "Weavers in conversation", stage: "Karigar Adda", type: "Craft" },
  { day: "Saturday", time: "8:15 PM", title: "Kathak: A River in Motion", artist: "Ira Sen Dance Company", stage: "Surya Manch", type: "Dance" },
  { day: "Sunday", time: "11:30 AM", title: "Flavours of the Coast", artist: "A culinary storytelling session", stage: "Katha Baithak", type: "Food" },
  { day: "Sunday", time: "1:00 PM", title: "Colours That Remember", artist: "Natural dye laboratory", stage: "Karigar Adda", type: "Workshop" },
  { day: "Sunday", time: "3:30 PM", title: "Languages Without Borders", artist: "Translators at work", stage: "Katha Baithak", type: "Literature" },
  { day: "Sunday", time: "5:00 PM", title: "Baul to Bhajan", artist: "A wandering music circle", stage: "Rang Courtyard", type: "Music" },
  { day: "Sunday", time: "7:45 PM", title: "One Sky, Many Songs", artist: "Voices from eight regions", stage: "Surya Manch", type: "Music" },
];

export const faqs = [
  { question: "When and where is Jashn-e-Hindustan?", answer: "The festival takes place 12–14 February 2027 at Sunder Nursery, New Delhi. Friday opens at 4 PM; Saturday and Sunday begin at 10:30 AM." },
  { question: "Do I need a ticket?", answer: "Entry to the festival grounds is ticketed. A festival pass includes all public stages, exhibitions and the craft bazaar. A small number of workshops require a free timed reservation because seating is limited." },
  { question: "Is the festival family-friendly?", answer: "Yes. Children are welcome across the festival, and the Karigar Adda hosts hands-on family workshops each day. Children under five enter free with a ticketed adult." },
  { question: "Are the venue and stages accessible?", answer: "Step-free routes connect the entrance, all four stages, accessible washrooms and the food court. Limited wheelchairs are available at the information desk, and reserved viewing areas are marked at each stage." },
  { question: "Can I bring food or water?", answer: "Reusable water bottles are encouraged; refill stations are available throughout the grounds. Outside meals, alcohol and glass containers are not permitted. Dietary and allergen information is displayed at every food stall." },
  { question: "What happens if it rains?", answer: "Most sessions continue under covered stages. Any schedule change will be posted on the website and festival noticeboards. Tickets remain valid if a session moves to another stage." },
  { question: "May I photograph performances?", answer: "Personal mobile photography is welcome without flash. Professional cameras, tripods and commercial filming require prior accreditation. Some artists may request a device-free performance; ushers will let you know." },
  { question: "How do I volunteer, partner or perform?", answer: "Volunteer and partnership calls open in September. Artistic programming is curated year-round and unsolicited proposals are reviewed only through the official submission window." },
];
