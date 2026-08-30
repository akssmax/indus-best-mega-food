import * as React from "react"

import { Input } from "@/components/ui/input"
import { sanitizePhoneInput } from "@/lib/phone"
import { cn } from "@/lib/utils"

function PhoneInput({ className, onInput, ...props }: React.ComponentProps<typeof Input>) {
  return (
    <Input
      type="tel"
      inputMode="tel"
      autoComplete="tel"
      className={cn(className)}
      onInput={(event) => {
        const input = event.currentTarget
        const sanitized = sanitizePhoneInput(input.value)
        if (sanitized !== input.value) {
          input.value = sanitized
        }
        onInput?.(event)
      }}
      {...props}
    />
  )
}

export { PhoneInput }
