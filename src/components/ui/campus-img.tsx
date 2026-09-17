import type { ImgHTMLAttributes } from "react"

import { gallerySrcAttrs } from "@/lib/media"
import { cn } from "@/lib/utils"

type CampusImgProps = ImgHTMLAttributes<HTMLImageElement> & {
  src: string
  alt: string
}

export function CampusImg({
  src,
  alt,
  sizes = "100vw",
  loading = "lazy",
  decoding = "async",
  className,
  ...rest
}: CampusImgProps) {
  const attrs = gallerySrcAttrs(src)

  return (
    <img
      {...rest}
      src={attrs.src}
      srcSet={attrs.srcSet}
      sizes={sizes}
      alt={alt}
      loading={loading}
      decoding={decoding}
      className={cn(className)}
    />
  )
}
