// English content — business facts sourced from https://excellentride.ae

export type IconName =
  | "shield"
  | "calendar"
  | "user"
  | "plane"
  | "briefcase"
  | "school"
  | "route"
  | "map"
  | "moon"

const en = {
  dir: "ltr" as "ltr" | "rtl",
  aed: "AED",

  meta: {
    title: "Excellent Ride | Safe Driver & Chauffeur Service in Dubai",
    description:
      "Hire an RTA-approved safe driver in Dubai from AED 80. Monthly, personal, corporate and airport chauffeur services — available 24/7.",
    about: "About Us",
    services: "Chauffeur Services",
    pricing: "Pricing",
    blog: "Insights",
    contact: "Contact",
  },

  company: {
    name: "Excellent Ride",
    legalName: "Excellent Ride Fleet Vehicle Management LLC",
    sub: "Fleet Vehicle Management",
    city: "Dubai, United Arab Emirates",
    hours: "24 hours · 7 days a week",
  },

  nav: {
    home: "Home",
    about: "About",
    services: "Services",
    pricing: "Pricing",
    blog: "Insights",
    contact: "Contact",
    book: "Book a Driver",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    switchTo: "العربية",
    switchShort: "ع",
  },

  common: {
    exploreService: "Explore service",
    allServices: "All services",
    viewAll: "View all",
    readArticle: "Read article",
    from: "Starting from",
    perRide: "AED 80 / ride",
    available: "Available 24/7",
    bestValue: "Best value",
    choose: "Choose",
    hours: "Hours",
    days: "Days",
    overtime: "Overtime",
    backToTop: "Back to top",
    whatsapp: "Chat on WhatsApp",
    scroll: "Scroll",
    service: "Service",
  },

  hero: {
    badges: ["RTA Approved", "Available 24/7", "Trusted by Dubai families"],
    line1: "Your safe driver",
    line2: "in Dubai,",
    accent: "any hour, any day.",
    text: "Premium chauffeur service at your doorstep — monthly, personal, corporate and airport drivers, starting from just AED 80.",
    primary: "Book a Driver",
    secondary: "View Pricing",
    slides: ["Downtown Dubai", "Sheikh Zayed Road", "Executive Class"],
  },

  booking: {
    eyebrow: "Instant booking",
    title: "Plan your ride",
    service: "Service",
    plan: "Plan",
    date: "Date",
    area: "Pick-up area",
    areaPlaceholder: "e.g. Dubai Marina",
    submit: "Request via WhatsApp",
    note: "Fast confirmation · No booking fees",
    msgHello: "Hello Excellent Ride, I'd like to book a driver.",
    msgService: "Service",
    msgPlan: "Plan",
    msgDate: "Start date",
    msgArea: "Pick-up area",
  },

  stats: [
    { value: 80, prefix: "AED ", suffix: "", label: "Rides starting from" },
    { value: 24, prefix: "", suffix: "/7", label: "Dispatch & support" },
    { value: 9, prefix: "", suffix: "", label: "Chauffeur services" },
    { value: 100, prefix: "", suffix: "%", label: "RTA-approved drivers" },
  ],

  marquee: [
    "RTA Approved Chauffeurs",
    "Available 24/7",
    "Monthly Driver Plans",
    "Airport Transfers",
    "Corporate Executive Travel",
    "School Runs",
    "All Payment Methods",
    "Book by WhatsApp",
  ],

  manifesto: {
    eyebrow: "Our promise",
    text: "We are more than a driver service. We are your trusted partner for safe, accessible and dependable transportation across Dubai — so you can relax, focus on what matters, and simply enjoy the ride.",
  },

  about: {
    eyebrow: "Who we are",
    title: "Chauffeur service at your doorstep,",
    accent: "built on trust.",
    lead: "Excellent Ride delivers professional, reliable and affordable chauffeur services for residents, tourists, business executives and families across the UAE.",
    body: "Our chauffeurs know Dubai's road network, landmarks, residential communities and business districts — so every journey is efficient, punctual and stress-free. Every driver is thoroughly screened and trained to meet our standards.",
    chips: [
      { k: "Monthly", v: "Dedicated drivers" },
      { k: "Corporate", v: "Executive travel" },
      { k: "Airport", v: "Flight-tracked transfers" },
      { k: "Family", v: "School runs & errands" },
    ],
    cta: "More about us",
    rta: "RTA Approved",
    rtaSub: "Licensed UAE chauffeurs",
    ring: "SAFE · PUNCTUAL · PROFESSIONAL · ",
  },

  servicesSection: {
    eyebrow: "Our services",
    title: "Every journey,",
    accent: "professionally driven.",
    text: "From daily commutes and school runs to airport transfers and executive travel — one trusted partner for every ride in Dubai.",
  },

  services: [
    {
      slug: "safe-driver-dubai",
      title: "Safe Driver in Dubai",
      short: "A professional, RTA-approved driver at your doorstep who drives your own car — safely and on time.",
      description:
        "Navigating Dubai's busy roads, finding parking and dealing with traffic can be challenging. Our professional chauffeurs handle every aspect of your journey so you can relax, focus on work, spend time with family, or simply enjoy the ride.",
      icon: "shield" as IconName,
      image: "/img/hd/chauffeur-wheel.jpg",
      features: ["RTA-approved, fully licensed drivers", "Drives your own vehicle", "Available 24/7 across Dubai", "Starting from AED 80"],
      idealFor: ["Residents", "Tourists", "Families", "Executives"],
    },
    {
      slug: "monthly-driver-dubai",
      title: "Monthly Driver Dubai",
      short: "A dedicated chauffeur for daily commutes, school runs, shopping trips and appointments — 26 days a month.",
      description:
        "Avoid the hassle of parking and traffic with a dedicated monthly driver. Consistent 10-hour daily service, 5–6 days a week, from a chauffeur who learns your routine and your city.",
      icon: "calendar" as IconName,
      image: "/img/hd/backseat.jpg",
      features: ["10 hours of service per day", "26 working days per month", "Same trusted chauffeur", "Overtime at AED 60/hr"],
      idealFor: ["Daily commuters", "Busy families", "Expats", "Long-stay visitors"],
    },
    {
      slug: "personal-driver-dubai",
      title: "Personal Chauffeur",
      short: "A qualified driver takes the wheel of your car for a stress-free and secure journey, wherever you need to be.",
      description:
        "Our personal chauffeur service puts a qualified, discreet professional behind the wheel of your own car. Every chauffeur undergoes thorough screening and training to meet our high service standards.",
      icon: "user" as IconName,
      image: "/img/hd/interior-mercedes.jpg",
      features: ["Discreet, well-presented chauffeurs", "Thorough screening & training", "Flexible hourly or daily booking", "Knowledge of every Dubai district"],
      idealFor: ["VIPs", "Professionals", "Visitors", "Special occasions"],
    },
    {
      slug: "airport-transfer-dubai",
      title: "Airport Transfer",
      short: "On-time pickups and drop-offs at DXB and DWC. We track your flight and adapt to any delay.",
      description:
        "Travelling to or from the airport? Our professional drivers track your flight schedule, allowing for adjustments in case of delays — making every airport transfer comfortable and hassle-free.",
      icon: "plane" as IconName,
      image: "/img/hd/airport.jpg",
      features: ["Live flight tracking", "Meet & greet on arrival", "Luggage assistance", "Early morning & late-night runs"],
      idealFor: ["Business travellers", "Families", "Tourists", "Guests & VIPs"],
    },
    {
      slug: "corporate-driver-dubai",
      title: "Corporate Driver",
      short: "Executive transportation for business meetings, client visits, roadshows and corporate events.",
      description:
        "Arrive composed and prepared. Our corporate chauffeurs understand the importance of punctuality and discretion, giving executives a productive, reliable way to move across Dubai's business districts.",
      icon: "briefcase" as IconName,
      image: "/img/hd/chauffeur-van.jpg",
      features: ["Punctual, discreet executive drivers", "Multi-stop meeting schedules", "Corporate monthly contracts", "Event & delegation support"],
      idealFor: ["Corporates", "Executives", "Delegations", "Event teams"],
    },
    {
      slug: "school-pick-up-drop-off",
      title: "School Pick-up & Drop-off",
      short: "Your child picked up from home and dropped at school on schedule — safely, every day.",
      description:
        "Arrange for your child to be picked up from home and dropped off at school on schedule. Trusted, vetted drivers give parents peace of mind on every school run.",
      icon: "school" as IconName,
      image: "/img/hd/school.jpg",
      features: ["Vetted, child-friendly drivers", "Fixed daily schedules", "Punctual morning & afternoon runs", "Updates for parents"],
      idealFor: ["Parents", "Working families", "Multiple children", "Term contracts"],
    },
    {
      slug: "pick-up-and-drop-off",
      title: "Pick-up & Drop-off",
      short: "Convenient point-to-point transportation for appointments, shopping, meetings and errands.",
      description:
        "Whether it's a medical appointment, a shopping trip or a meeting across town, our pick-up and drop-off service gets you there comfortably — without the stress of driving or parking.",
      icon: "route" as IconName,
      image: "/img/hd/pickup-aerial.jpg",
      features: ["Point-to-point rides", "Book in minutes by WhatsApp", "Return-trip scheduling", "Transparent per-ride pricing"],
      idealFor: ["Errands", "Appointments", "Shopping", "Meetings"],
    },
    {
      slug: "dubai-tour-guide",
      title: "Dubai Tour Chauffeur",
      short: "Explore the city's famous attractions with a chauffeur who knows every landmark and shortcut.",
      description:
        "Our chauffeurs have extensive knowledge of Dubai's landmarks, residential communities, business districts and tourist attractions — the perfect companion for visitors exploring the city.",
      icon: "map" as IconName,
      image: "/img/hd/burj-al-arab.jpg",
      features: ["Custom city itineraries", "Landmark & photo stops", "Full-day or half-day tours", "Extended road journeys"],
      idealFor: ["Tourists", "Visiting family", "Guests", "Corporate guests"],
    },
    {
      slug: "after-party-chauffeur",
      title: "After-Party Chauffeur",
      short: "Enjoy the night — we'll drive you and your car home safely after events and celebrations.",
      description:
        "Celebrating a wedding, anniversary or a night out? Our after-party chauffeurs make sure you and your vehicle get home safely, so you never have to choose between enjoying the evening and getting home.",
      icon: "moon" as IconName,
      image: "/img/hd/night-drive.jpg",
      features: ["Late-night availability", "Drives you home in your car", "Weddings, events & parties", "One call, fast dispatch"],
      idealFor: ["Night outs", "Weddings", "Events", "Celebrations"],
    },
  ],

  process: {
    eyebrow: "How it works",
    title: "From booking to doorstep",
    accent: "in three steps.",
    steps: [
      { title: "Request", text: "Book online, by phone or on WhatsApp in minutes — tell us when, where and which plan." },
      { title: "Confirm", text: "We match you with a vetted, RTA-approved chauffeur and confirm your booking fast." },
      { title: "Ride", text: "Your driver arrives at your doorstep on time. Sit back — we handle traffic and parking." },
    ],
  },

  why: {
    eyebrow: "Why Excellent Ride",
    title: "Elegance, convenience and",
    accent: "peace of mind.",
    text: "Whether you need a safe driver for a night out, a dedicated monthly chauffeur, airport transfers or executive transportation — we're there around the clock, seven days a week.",
    pillars: [
      { title: "Safety First", text: "Every chauffeur is professionally trained, thoroughly vetted and committed to a secure, comfortable journey every time." },
      { title: "Always Punctual", text: "Extensive knowledge of Dubai's road network means efficient routes and on-time arrivals — every single trip." },
      { title: "100% Digital Booking", text: "Book online, by phone or WhatsApp in minutes. Fast confirmations, easy scheduling and 24/7 availability." },
      { title: "Every Payment Method", text: "Pay the way you prefer — cash, cards, bank transfer or digital payments for a hassle-free experience." },
    ],
  },

  fleet: {
    eyebrow: "Any car. Any class.",
    title: "Your vehicle, in",
    accent: "expert hands.",
    text: "Our chauffeurs are trained to handle every class of vehicle with care — from executive saloons to full-size SUVs and family vans.",
    items: [
      { name: "Executive Sedan", examples: "S-Class · 7 Series · Lexus LS", image: "/img/hd/sedan.jpg" },
      { name: "Luxury SUV", examples: "Escalade · Range Rover · Yukon", image: "/img/hd/suv.jpg" },
      { name: "4×4 & Performance", examples: "G-Class · Land Cruiser · Porsche", image: "/img/hd/gclass.jpg" },
      { name: "Family & Business Van", examples: "V-Class · Alphard · Carnival", image: "/img/hd/van.jpg" },
    ],
  },

  pricingSection: {
    eyebrow: "Transparent pricing",
    title: "Premium service,",
    accent: "honest rates.",
    text: "No hidden fees. Choose a single ride, a full day, a week or our best-value monthly plan. Overtime is always AED 60/hr.",
  },

  plans: [
    {
      name: "Per Ride",
      price: 80,
      unit: "per ride",
      summary: "Efficient, responsible driver service for a single trip.",
      hours: "1 Hour",
      days: "On demand",
      overtime: "AED 60/hr",
      featured: false,
      perks: ["Driver at your doorstep", "RTA-approved chauffeur", "Book by call or WhatsApp"],
    },
    {
      name: "Per Day",
      price: 400,
      unit: "per day",
      summary: "10 hours of dedicated chauffeur service for a full day.",
      hours: "10 Hours",
      days: "1 Day",
      overtime: "AED 60/hr",
      featured: false,
      perks: ["Full-day availability", "Multiple stops included", "Ideal for events & visitors"],
    },
    {
      name: "Weekly",
      price: 1800,
      unit: "per week",
      summary: "Reliable 10-hour daily service, 5–6 days a week.",
      hours: "10 Hrs / day",
      days: "5–6 Days",
      overtime: "AED 60/hr",
      featured: false,
      perks: ["Same dedicated driver", "Flexible daily schedule", "Great for short stays"],
    },
    {
      name: "Monthly",
      price: 5000,
      unit: "per month",
      summary: "Best value — consistent daily service for 26 days a month.",
      hours: "10 Hrs / day",
      days: "26 Days",
      overtime: "AED 60/hr",
      featured: true,
      perks: ["Best-value plan", "Dedicated monthly chauffeur", "School runs, office & family use", "Priority support 24/7"],
    },
  ],

  compare: {
    eyebrow: "Compare",
    title: "Find the plan",
    accent: "that fits.",
    plan: "Plan",
    rows: {
      initial: "Initial charge",
      hours: "Hours included",
      days: "Days",
      overtime: "Overtime",
      rta: "RTA-approved chauffeur",
      book: "Book via WhatsApp / phone",
      same: "Same dedicated driver",
      family: "School runs & family use",
      priority: "Priority 24/7 support",
    },
    payments: "We accept cash, cards, bank transfers and digital payments.",
  },

  reviewsSection: {
    eyebrow: "Client stories",
    title: "Trusted on Dubai's roads,",
    accent: "every single day.",
    text: "Our clients rely on us for professionalism, timeliness and a flawless travel experience — from safe driver services to corporate chauffeur solutions.",
    rated: "Rated 5 stars by our clients",
  },

  reviews: [
    {
      name: "Abdul Rehman",
      location: "JBR, Dubai Marina",
      avatar: "/img/review.png",
      text: "Excellent Ride provides a very reliable monthly driver service in Dubai. The driver was professional, punctual, polite, and drove very safely. Perfect for daily travel, office trips, family use and long-term monthly driver needs.",
    },
    {
      name: "Ferlyn Biliran",
      location: "Arabian Ranches",
      avatar: "/img/review-1.png",
      text: "A very reliable monthly driver service for us in Arabian Ranches. The driver was always punctual, polite, and professional. Their safe driver service made our daily travel easy, comfortable, and stress-free.",
    },
    {
      name: "Shakil Advertisers",
      location: "Dubai",
      avatar: "/img/review-2.png",
      text: "I got a driver in just one call. Very fast service — the most recommended driver company in Dubai.",
    },
    {
      name: "Michael Patrick Foley",
      location: "Visiting Dubai",
      avatar: "/img/review-3.png",
      text: "The service was invariably impeccable. The car was always in top shape, and the driver was helpful, knowledgeable and very professional. Lots of options, and the staff is extremely well trained.",
    },
  ],

  areasSection: {
    eyebrow: "Coverage",
    title: "Across every major area of Dubai —",
    accent: "expanding UAE-wide.",
  },

  areas: [
    "Downtown Dubai", "Dubai Marina", "JBR", "Palm Jumeirah", "Business Bay", "DIFC", "Arabian Ranches",
    "Dubai Hills", "Jumeirah", "Al Barsha", "Deira", "DXB Airport", "JLT", "Mirdif",
  ],

  faqSection: {
    eyebrow: "FAQ",
    title: "Questions,",
    accent: "answered.",
    text: "Everything you need to know about hiring a safe driver in Dubai. Can't find your answer? Our team is one message away.",
    cta: "Ask us anything",
    pricingTitle: "Pricing",
    pricingAccent: "questions.",
  },

  faqs: [
    { q: "How much is a Safe Driver in Dubai?", a: "Our safe driver service in Dubai starts from just AED 80 per ride. Daily service is AED 400, weekly AED 1,800 and our best-value monthly plan is AED 5,000. Overtime is charged at AED 60/hr." },
    { q: "Do you offer drivers for transfers to and from the airport?", a: "Yes. We handle Dubai airport transfers on schedule with experienced, well-trained drivers who track your flight, pick you up on time and make sure your trip is comfortable." },
    { q: "Where are your safe driver services available?", a: "Our drivers cover all of Dubai's major areas, and we are actively expanding our service throughout the UAE." },
    { q: "Are your drivers RTA approved and fully licensed in the UAE?", a: "Yes. Our safe drivers are professionally trained, hold the necessary RTA permits and UAE licences, and always put your comfort and safety first." },
    { q: "How can I get a personal driver in Dubai for a month?", a: "Choose our Monthly plan — a dedicated chauffeur for 10 hours a day, 26 days a month. Get in touch by phone or WhatsApp and we'll match you with a driver." },
    { q: "What kind of rides do you cover?", a: "Everything: travel and activities, airport transfers, Dubai chauffeur service, RTA evaluation, pick-up and drop-off, monthly personal drivers, extended road journeys, and guest & VIP trips." },
  ],

  insights: {
    eyebrow: "Insights",
    title: "News &",
    accent: "articles.",
    backToAll: "All articles",
    related: "Keep reading",
  },

  cta: {
    eyebrow: "Chauffeur at your doorstep",
    title: "Skip the traffic. Skip the parking.",
    accent: "Just ride.",
    text: "Get a professional, RTA-approved driver in one call. Fast confirmations and 24/7 availability across Dubai.",
    primary: "Book your driver",
    call: "Call",
  },

  pages: {
    about: {
      eyebrow: "About Excellent Ride",
      title: "More than a driver service —",
      accent: "your trusted partner.",
      text: "We provide safe, accessible and dependable transportation across Dubai for residents, tourists, business executives and families.",
      storyEyebrow: "Our story",
      storyTitle: "Premium transportation,",
      storyAccent: "made simple.",
      story1:
        "When it comes to premium transportation, choosing a trusted chauffeur service in Dubai makes all the difference. At Excellent Ride, we are committed to professional, reliable and affordable chauffeur services tailored to everyone who calls this city home — or comes to explore it.",
      story2:
        "Navigating busy roads, finding parking and dealing with traffic can be challenging. Our chauffeurs handle every aspect of your journey, so you can relax, focus on work, spend time with family or simply enjoy the ride. Our reputation is built on safety, punctuality and professionalism — and every chauffeur is thoroughly screened and trained.",
      statLabels: ["Availability, every day of the year", "Specialised chauffeur services", "Starting price per ride", "RTA-approved, licensed drivers"],
      valuesEyebrow: "Our values",
      valuesTitle: "What drives",
      valuesAccent: "every ride.",
      values: [
        { title: "Safety", text: "Professionally trained, thoroughly vetted chauffeurs on every trip." },
        { title: "Punctuality", text: "We track flights, plan routes and arrive on time — because your schedule matters." },
        { title: "Professionalism", text: "Courteous, discreet and well-presented drivers who uphold the highest standards." },
        { title: "Care", text: "Customer satisfaction is at the heart of everything we do — we aim to exceed expectations." },
      ],
    },
    services: {
      eyebrow: "Our services",
      title: "One trusted partner for",
      accent: "every ride in Dubai.",
      text: "Nine specialised chauffeur services — each delivered by RTA-approved, professionally trained drivers, available 24/7.",
    },
    serviceDetail: {
      back: "All services",
      label: "Service",
      book: "Book this service",
      rates: "See rates",
      overview: "Overview",
      overviewTitle: "What's",
      overviewAccent: "included.",
      idealFor: "Ideal for",
      ratesEyebrow: "Rates",
      ratesTitle: "Flexible plans for",
      ratesAccent: "every need.",
      moreEyebrow: "Explore more",
      moreTitle: "Other",
      moreAccent: "services.",
      next: "Next",
    },
    pricing: {
      eyebrow: "Pricing",
      title: "Transparent rates,",
      accent: "zero surprises.",
      text: "Top-tier chauffeur service in Dubai at unbeatable rates — from a single ride to a dedicated monthly driver.",
    },
    blog: {
      eyebrow: "Insights",
      title: "Stories from",
      accent: "the road.",
      text: "Guides, tips and perspectives on safe driving, chauffeur services and travelling well in Dubai.",
    },
    contact: {
      eyebrow: "Contact",
      title: "Let's get you",
      accent: "on the road.",
      text: "Feedback, enquiries or a booking — reach us through any channel below. Our team is available around the clock.",
      call: "Call us",
      whatsapp: "WhatsApp",
      whatsappValue: "Chat instantly",
      email: "Email",
      hours: "Hours",
      serving: "Serving all major areas of Dubai, UAE",
      formTitle: "Send us a message",
      formSub: "We usually reply within minutes on WhatsApp.",
      name: "Full name",
      namePh: "Your name",
      phone: "Phone",
      message: "Message",
      messagePh: "Dates, pick-up area, any special requests…",
      send: "Send via WhatsApp",
      sent: "WhatsApp opened with your message — just hit send.",
      msgHello: "Hello Excellent Ride, my name is",
      msgPhone: "Phone",
      msgMessage: "Message",
    },
    notFound: {
      title: "Wrong turn.",
      text: "The page you're looking for doesn't exist — let's get you back on route.",
      cta: "Back to home",
    },
  },

  footer: {
    about:
      "More than just a driver service — your trusted partner for safe, accessible and dependable transportation across Dubai. RTA-approved chauffeurs, available 24/7.",
    company: "Company",
    services: "Services",
    contact: "Get in touch",
    rights: "All rights reserved.",
    strip: "RTA-approved chauffeurs · Available 24/7 · Dubai, UAE",
  },

  intro: "Chauffeur service · Dubai",
}

export type Dict = typeof en
export default en
