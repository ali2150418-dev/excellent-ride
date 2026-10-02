import type { Locale } from "@/lib/i18n"

export type Post = {
  slug: string
  title: string
  excerpt: string
  category: string
  image: string
  readTime: string
  date: string
  sections: { heading: string; paragraphs: string[] }[]
}

const en: Post[] = [
  {
    slug: "hire-personal-driver-special-occasion",
    title: "How to Hire a Personal Driver for a Special Occasion",
    excerpt:
      "Organising a night out, a wedding or an anniversary? Here's a simple guide to booking a personal driver so you can enjoy every moment.",
    category: "Guides",
    image: "/img/hd/exit-car.jpg",
    readTime: "4 min read",
    date: "2026-06-12",
    sections: [
      {
        heading: "Why a driver makes the occasion better",
        paragraphs: [
          "Special occasions are about the people you celebrate with — not about traffic, parking or worrying how you'll get home. A personal driver removes all of that, so you arrive relaxed and leave whenever you're ready.",
          "Because our chauffeurs drive your own car, there's no need to arrange a separate vehicle. You keep your comfort and your car comes home safely with you.",
        ],
      },
      {
        heading: "Choose the right plan",
        paragraphs: [
          "For a single event, our Per Ride option starts from AED 80 and is ideal for a dinner or a short celebration. If you have several stops — a ceremony, photos and a reception — the Per Day plan gives you 10 hours of dedicated service for AED 400.",
          "Running late? Overtime is always a simple AED 60 per hour, so you never have to cut the evening short.",
        ],
      },
      {
        heading: "Book early, share the details",
        paragraphs: [
          "Weekends and wedding season are busy in Dubai. Message us on WhatsApp with the date, pick-up area, approximate timings and number of stops. We'll confirm quickly and match you with a well-presented, RTA-approved chauffeur.",
          "Let us know about any special requests — dress code, a specific route, or a surprise you're planning — and your driver will be briefed in advance.",
        ],
      },
      {
        heading: "On the day",
        paragraphs: [
          "Your chauffeur arrives at your doorstep on time, handles every drive between venues and waits while you celebrate. At the end of the night, you and your car are driven home safely — the perfect finish to a perfect day.",
        ],
      },
    ],
  },
  {
    slug: "safe-driver-services-luxury-cars-dubai",
    title: "Easy Travel with Safe Driver Services and Luxury Cars in Dubai",
    excerpt:
      "Dubai is renowned for world-class roads and a refined way of life. Discover how a professional safe driver makes every journey stress-free.",
    category: "Travel",
    image: "/img/hd/hero-sedan.jpg",
    readTime: "5 min read",
    date: "2026-05-28",
    sections: [
      {
        heading: "Great roads, real challenges",
        paragraphs: [
          "Dubai's highways are among the best in the world, yet rush-hour traffic, complex interchanges and limited parking can turn a simple trip into a stressful one — especially for newcomers and visitors.",
          "A safe driver service lets you enjoy the city's infrastructure without the pressure of navigating it yourself.",
        ],
      },
      {
        heading: "Your luxury car, professionally driven",
        paragraphs: [
          "Owning a premium vehicle is one thing; enjoying it from the back seat is another. Our chauffeurs are experienced with executive sedans, luxury SUVs and performance cars, and treat every vehicle with care.",
          "You get the comfort of your own car — your settings, your music, your space — with an expert at the wheel.",
        ],
      },
      {
        heading: "Safety you can rely on",
        paragraphs: [
          "Every Excellent Ride chauffeur is RTA-approved, fully licensed and thoroughly screened. They know Dubai's road network, communities and business districts, which means efficient routes and on-time arrivals.",
        ],
      },
      {
        heading: "Flexible for every lifestyle",
        paragraphs: [
          "Whether you need a driver for one ride, one day, one week or every day of the month, there's a plan that fits — from AED 80 per ride to our best-value AED 5,000 monthly package.",
        ],
      },
    ],
  },
  {
    slug: "chauffeur-services-luxury-travel-dubai",
    title: "Why Chauffeur Services Are the Preferred Choice for Luxury Travel in Dubai",
    excerpt:
      "From executives to visiting families — why more people choose a trusted chauffeur partner on Dubai's roads.",
    category: "Insights",
    image: "/img/hd/executive.jpg",
    readTime: "6 min read",
    date: "2026-05-09",
    sections: [
      {
        heading: "Time is the ultimate luxury",
        paragraphs: [
          "For busy professionals, every minute behind the wheel is a minute not spent preparing for a meeting, answering emails or simply resting. A chauffeur turns travel time into productive — or peaceful — time.",
        ],
      },
      {
        heading: "Arrive composed, every time",
        paragraphs: [
          "First impressions matter in business. Arriving on time, without the stress of parking or navigation, lets executives walk into every meeting focused and prepared.",
          "Our corporate drivers manage multi-stop schedules and understand the importance of discretion.",
        ],
      },
      {
        heading: "Peace of mind for families",
        paragraphs: [
          "Families choose chauffeur services for school runs, shopping and appointments because consistency builds trust. With a monthly driver, the same vetted professional handles your daily routine.",
        ],
      },
      {
        heading: "A partner, not just a ride",
        paragraphs: [
          "At Excellent Ride, customer satisfaction sits at the heart of everything we do. With 24/7 availability, every payment method accepted and booking in minutes by WhatsApp, we make premium travel effortless.",
        ],
      },
    ],
  },
]

const ar: Post[] = [
  {
    ...en[0],
    title: "كيف تستأجر سائقاً خاصاً لمناسبة مميزة",
    excerpt: "تخطّط لسهرة أو زفاف أو ذكرى سنوية؟ إليك دليلاً بسيطاً لحجز سائق خاص لتستمتع بكل لحظة.",
    category: "أدلة",
    readTime: "4 دقائق قراءة",
    sections: [
      {
        heading: "لماذا يجعل السائق مناسبتك أجمل",
        paragraphs: [
          "المناسبات الخاصة تدور حول من تحتفل معهم — لا حول الزحام والمواقف أو القلق بشأن العودة. السائق الخاص يزيل كل ذلك، فتصل مرتاحاً وتغادر متى شئت.",
          "ولأن سائقينا يقودون سيارتك الخاصة، فلا حاجة لترتيب مركبة أخرى. تحتفظ براحتك وتعود سيارتك معك بأمان.",
        ],
      },
      {
        heading: "اختر الباقة المناسبة",
        paragraphs: [
          "لمناسبة واحدة، يبدأ خيار الرحلة الواحدة من 80 درهماً وهو مثالي لعشاء أو احتفال قصير. وإذا كانت لديك عدة محطات — مراسم وتصوير واستقبال — فالباقة اليومية تمنحك 10 ساعات من الخدمة المخصّصة مقابل 400 درهم.",
          "تأخّرت الأمسية؟ الساعة الإضافية دائماً بـ 60 درهماً فقط، فلا تضطر لإنهاء السهرة مبكراً.",
        ],
      },
      {
        heading: "احجز مبكراً وشاركنا التفاصيل",
        paragraphs: [
          "عطلات نهاية الأسبوع وموسم الأعراس مزدحمة في دبي. راسلنا عبر واتساب بالتاريخ ومنطقة الاستلام والتوقيتات التقريبية وعدد المحطات، وسنؤكّد بسرعة ونوفّر لك سائقاً معتمداً بمظهر لائق.",
          "أخبرنا بأي طلبات خاصة — قواعد اللباس أو مسار معيّن أو مفاجأة تخطّط لها — وسيتم إطلاع سائقك مسبقاً.",
        ],
      },
      {
        heading: "في يوم المناسبة",
        paragraphs: [
          "يصل سائقك إلى بابك في الموعد، ويتولّى كل التنقلات بين الأماكن وينتظرك أثناء الاحتفال. وفي نهاية الليلة، تعود أنت وسيارتك إلى المنزل بأمان — ختام مثالي ليوم مثالي.",
        ],
      },
    ],
  },
  {
    ...en[1],
    title: "تنقّل سهل مع خدمات السائق الآمن والسيارات الفاخرة في دبي",
    excerpt: "تشتهر دبي بطرقها العالمية وأسلوب حياتها الراقي. اكتشف كيف يجعل السائق المحترف كل رحلة خالية من التوتر.",
    category: "سفر",
    readTime: "5 دقائق قراءة",
    sections: [
      {
        heading: "طرق رائعة وتحديات حقيقية",
        paragraphs: [
          "طرق دبي السريعة من بين الأفضل في العالم، لكن زحام ساعات الذروة والتقاطعات المعقدة وقلة المواقف قد تحوّل رحلة بسيطة إلى تجربة مرهقة — خاصة للقادمين الجدد والزوار.",
          "تتيح لك خدمة السائق الآمن الاستمتاع ببنية المدينة التحتية دون ضغط القيادة بنفسك.",
        ],
      },
      {
        heading: "سيارتك الفاخرة بقيادة محترفة",
        paragraphs: [
          "امتلاك سيارة فاخرة شيء، والاستمتاع بها من المقعد الخلفي شيء آخر. سائقونا متمرّسون في قيادة السيدان التنفيذية وسيارات الدفع الرباعي الفاخرة والسيارات الرياضية، ويعتنون بكل مركبة.",
          "تحصل على راحة سيارتك الخاصة — إعداداتك وموسيقاك ومساحتك — مع خبير خلف المقود.",
        ],
      },
      {
        heading: "سلامة يمكنك الاعتماد عليها",
        paragraphs: [
          "كل سائق في إكسلنت رايد معتمد من هيئة الطرق ومرخّص بالكامل ومفحوص بدقة. يعرفون شبكة طرق دبي ومجتمعاتها ومناطق أعمالها، ما يعني مسارات أذكى ووصولاً في الموعد.",
        ],
      },
      {
        heading: "مرونة تناسب كل أسلوب حياة",
        paragraphs: [
          "سواء احتجت سائقاً لرحلة واحدة أو يوم أو أسبوع أو كل يوم في الشهر، هناك باقة تناسبك — من 80 درهماً للرحلة إلى الباقة الشهرية الأفضل قيمة بـ 5,000 درهم.",
        ],
      },
    ],
  },
  {
    ...en[2],
    title: "لماذا أصبحت خدمات السائق الخيار المفضّل للتنقّل الفاخر في دبي",
    excerpt: "من التنفيذيين إلى العائلات الزائرة — لماذا يختار المزيد من الناس شريكاً موثوقاً على طرق دبي.",
    category: "رؤى",
    readTime: "6 دقائق قراءة",
    sections: [
      {
        heading: "الوقت هو الرفاهية الحقيقية",
        paragraphs: [
          "بالنسبة للمهنيين المشغولين، كل دقيقة خلف المقود هي دقيقة لا تُقضى في التحضير لاجتماع أو الرد على الرسائل أو الراحة. السائق يحوّل وقت التنقل إلى وقت منتج — أو هادئ.",
        ],
      },
      {
        heading: "اصل بهدوء في كل مرة",
        paragraphs: [
          "الانطباع الأول مهم في عالم الأعمال. الوصول في الموعد دون عناء المواقف أو البحث عن الطريق يتيح للتنفيذيين دخول كل اجتماع بتركيز واستعداد.",
          "يدير سائقو الشركات لدينا الجداول متعددة المحطات ويدركون أهمية التكتّم.",
        ],
      },
      {
        heading: "راحة بال للعائلات",
        paragraphs: [
          "تختار العائلات خدمات السائق لتوصيل المدارس والتسوق والمواعيد لأن الاستمرارية تبني الثقة. مع السائق الشهري، يتولّى نفس المحترف المفحوص روتينك اليومي.",
        ],
      },
      {
        heading: "شريك، لا مجرد رحلة",
        paragraphs: [
          "في إكسلنت رايد، رضا العملاء في صميم كل ما نقوم به. مع التوفّر على مدار الساعة وقبول جميع طرق الدفع والحجز خلال دقائق عبر واتساب، نجعل التنقّل الفاخر سهلاً.",
        ],
      },
    ],
  },
]

export const posts: Record<Locale, Post[]> = { en, ar }
