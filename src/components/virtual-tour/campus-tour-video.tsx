const VIMEO_URL = "https://vimeo.com/1230811403"
const POSTER_URL = "https://vumbnail.com/1230811403.jpg"

const params = new URLSearchParams({
  autoplay: "true",
  loop: "true",
  autopause: "false",
  muted: "true",
  url: VIMEO_URL,
  poster: POSTER_URL,
  time: "false",
  progressBar: "false",
  playButton: "false",
  overlay: "false",
  muteButton: "false",
  fullscreenButton: "false",
  style: "light",
  logo: "false",
  quality: "1080p",
})

const playerSrc = `https://onelineplayer.com/player?${params.toString()}`

export function CampusTourVideo() {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-black shadow-2xl ring-1 ring-white/15">
      <div className="relative pt-[56.25%]">
        <iframe
          src={playerSrc}
          title="Indus Park Video"
          allow="autoplay; fullscreen; picture-in-picture; encrypted-media; web-share"
          allowFullScreen
          frameBorder="0"
          referrerPolicy="strict-origin-when-cross-origin"
          loading="lazy"
          className="absolute inset-0 size-full"
        />
      </div>
    </div>
  )
}
