type P = { size?: number; className?: string }

export function Facebook({ size = 18, className }: P) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M13.5 21v-7.5h2.6l.4-3h-3V8.6c0-.9.3-1.5 1.5-1.5h1.6V4.4c-.3 0-1.2-.1-2.3-.1-2.3 0-3.8 1.4-3.8 3.9v2.3H8v3h2.5V21h3z" />
    </svg>
  )
}

export function Instagram({ size = 18, className }: P) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className} aria-hidden>
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
    </svg>
  )
}

export function Pinterest({ size = 18, className }: P) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M12 3a9 9 0 0 0-3.3 17.4c-.1-.7-.1-1.8 0-2.6l1-4.2s-.3-.5-.3-1.3c0-1.2.7-2.1 1.6-2.1.7 0 1.1.6 1.1 1.2 0 .7-.5 1.8-.7 2.8-.2.8.4 1.5 1.2 1.5 1.5 0 2.7-1.6 2.7-3.9 0-2-1.5-3.5-3.6-3.5-2.5 0-3.9 1.9-3.9 3.800 0 .8.3 1.600.7 2.100.1.1.1.2.1.3l-.3 1c0 .2-.1.2-.3.1-1.100-.5-1.800-2.200-1.800-3.500 0-2.900 2.100-5.500 6-5.500 3.200 0 5.700 2.300 5.700 5.300 0 3.200-2 5.700-4.800 5.700-.9 0-1.800-.5-2.100-1.100l-.6 2.200c-.2.800-.8 1.800-1.200 2.400A9 9 0 1 0 12 3z" />
    </svg>
  )
}

export function WhatsApp({ size = 18, className }: P) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M12 2.5a9.4 9.4 0 0 0-8 14.3L2.6 21.5l4.800-1.300A9.400 9.400 0 1 0 12 2.500zm0 17.200c-1.400 0-2.800-.4-4-1.100l-.3-.2-2.800.8.800-2.700-.2-.3A7.800 7.800 0 1 1 12 19.700zm4.300-5.800c-.2-.1-1.400-.7-1.600-.8-.2-.1-.4-.1-.5.100l-.7.900c-.1.200-.3.200-.5.100-1.300-.6-2.100-1.100-3-2.500-.2-.4.200-.4.600-1.200.1-.1 0-.3 0-.4l-.7-1.600c-.2-.4-.3-.4-.5-.4h-.4c-.2 0-.4.100-.6.300-.2.200-.8.800-.8 1.900s.8 2.200.9 2.300c.1.200 1.600 2.500 3.900 3.500 1.500.6 2 .7 2.800.6.400-.1 1.400-.6 1.600-1.200.2-.6.2-1 .1-1.100-.1-.1-.2-.2-.4-.3z" />
    </svg>
  )
}
