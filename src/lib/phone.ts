const DISALLOWED_CHARS = /[^\d+\s\-()]/g

export function sanitizePhoneInput(value: string): string {
  let next = value.replace(DISALLOWED_CHARS, "")
  const hasLeadingPlus = next.startsWith("+")
  next = next.replace(/\+/g, "")
  return hasLeadingPlus ? `+${next}` : next
}

export function isValidPhone(value: string): boolean {
  const digits = value.replace(/\D/g, "")
  return digits.length >= 10 && digits.length <= 15
}
