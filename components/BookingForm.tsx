"use client"

import { useState, type FormEvent } from "react"
import { CalendarDays, Phone, User } from "lucide-react"
import { services, waLink } from "@/lib/site"
import { Dot } from "./ui"

const options = ["Per Ride", "Per Day Driver", "Weekly Driver", "Monthly Driver", ...services.map((s) => s.label)]
const input = "field !border-white/20 !bg-white/5 !text-[#f3f0e8] placeholder:!text-white/50"

/** Hero booking card. Sends the request to WhatsApp (the old site's booking channel). */
export function BookingForm({ className = "" }: { className?: string }) {
  const [sent, setSent] = useState(false)

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const f = new FormData(e.currentTarget)
    const text = [
      "Hello Excellent Ride, I would like to book a driver.",
      `Name: ${f.get("name")}`,
      `Phone: ${f.get("phone")}`,
      `Service: ${f.get("service")}`,
      f.get("date") ? `Date: ${f.get("date")}` : "",
      f.get("note") ? `Details: ${f.get("note")}` : "",
    ]
      .filter(Boolean)
      .join("\n")
    window.open(waLink(text), "_blank", "noopener,noreferrer")
    setSent(true)
  }

  return (
    <form
      onSubmit={submit}
      className={`relative overflow-hidden rounded-2xl border border-white/10 bg-[#111113] p-7 text-[#f3f3f1] shadow-[var(--shadow)] md:p-8 ${className}`}
      aria-labelledby="booking-title"
    >
      <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-accent/20 blur-3xl" aria-hidden />
      <p className="eyebrow">Hire a Safe Driver in Dubai</p>
      <h2 id="booking-title" className="mt-3 font-display text-2xl font-semibold md:text-3xl">
        Book Now
      </h2>

      <div className="mt-7 grid gap-3">
        <label className="relative block">
          <span className="sr-only">Name</span>
          <User size={16} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-white/50" />
          <input name="name" required placeholder="Your name" autoComplete="name" className={`${input} !pl-11`} />
        </label>
        <label className="relative block">
          <span className="sr-only">Phone</span>
          <Phone size={16} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-white/50" />
          <input name="phone" required type="tel" placeholder="Phone / WhatsApp" autoComplete="tel" className={`${input} !pl-11`} />
        </label>
        <label className="block">
          <span className="sr-only">Service</span>
          <select name="service" required defaultValue="" className={input}>
            <option value="" disabled>
              Select a service
            </option>
            {options.map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>
        </label>
        <label className="relative block">
          <span className="sr-only">Date</span>
          <CalendarDays size={16} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-white/50" />
          <input name="date" type="date" className={`${input} !pl-11 [color-scheme:dark]`} />
        </label>
        <label className="block">
          <span className="sr-only">Pick-up and drop-off details</span>
          <textarea name="note" rows={2} placeholder="Pick-up and drop-off details" className={`${input} resize-none`} />
        </label>
      </div>

      <button type="submit" className="btn btn-primary mt-6 w-full">
        Let&apos;s Ride Now! <Dot />
      </button>
      {sent && (
        <p role="status" className="mt-3 text-center text-sm text-white/60">
          WhatsApp opened with your details.
        </p>
      )}
    </form>
  )
}
