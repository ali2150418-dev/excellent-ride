// Locale-independent business details (https://excellentride.ae).
// Translatable copy lives in lib/content/{en,ar}.ts.

export const contact = {
  phone: "+971 55 933 9348",
  phoneHref: "tel:+971559339348",
  whatsapp: "https://api.whatsapp.com/send/?phone=971559339348",
  whatsappNumber: "971559339348",
  email: "info@excellentride.ae",
  social: {
    facebook: "https://www.facebook.com/SafeDriverDubai1",
    instagram: "https://www.instagram.com/excellentride/",
  },
}

export const navKeys = [
  { key: "home", href: "/" },
  { key: "about", href: "/about" },
  { key: "services", href: "/services" },
  { key: "pricing", href: "/pricing" },
  { key: "blog", href: "/blog" },
  { key: "contact", href: "/contact" },
] as const

export const waLink = (text: string) =>
  `https://wa.me/${contact.whatsappNumber}?text=${encodeURIComponent(text)}`
