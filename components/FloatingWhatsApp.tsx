import { contact } from "@/lib/site"
import { WhatsApp } from "./social"

export function FloatingWhatsApp() {
  return (
    <a
      href={contact.whatsapp}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="WhatsApp us"
      className="fixed bottom-5 right-5 z-40 flex items-center gap-2 rounded-full bg-[#25d366] px-4 py-3 text-sm font-semibold text-white shadow-[0_12px_30px_-8px_rgba(37,211,102,0.7)] transition hover:-translate-y-1"
    >
      <WhatsApp size={22} />
      <span className="hidden sm:inline">WhatsApp us</span>
    </a>
  )
}
