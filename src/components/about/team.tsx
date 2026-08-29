import { aboutPage } from "@/content/about"
import { Card } from "@/components/ui/card"
import { Eyebrow, Section } from "@/components/landing/section"
import { MotionItem, Reveal, Stagger } from "@/components/landing/motion"

function memberInitials(name: string) {
  return name
    .replace(/^(Maj\.|Dr)\s+/i, "")
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase()
}

function MemberPhoto({
  member,
}: {
  member: (typeof aboutPage.team.members)[number]
}) {
  const photo = member.image ? (
    <img
      src={member.image.src}
      alt={member.image.alt}
      className="absolute inset-0 size-full object-cover object-[center_18%] transition-transform duration-500 hover-fine:group-hover/card:scale-[1.03]"
    />
  ) : (
    <span
      aria-hidden
      className="flex size-full items-center justify-center bg-primary/10 font-heading text-4xl font-semibold text-primary"
    >
      {memberInitials(member.name)}
    </span>
  )

  const frame = (
    <div className="relative aspect-[4/5] w-full overflow-hidden bg-secondary/40 sm:aspect-[5/6]">
      {photo}
      <div
        aria-hidden
        className="absolute inset-0 bg-linear-to-t from-black/25 via-transparent to-transparent"
      />
    </div>
  )

  if (member.linkedin) {
    return (
      <a
        href={member.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        className="block transition-opacity hover:opacity-95"
        aria-label={`${member.name} on LinkedIn`}
      >
        {frame}
      </a>
    )
  }

  return frame
}

export function AboutTeam() {
  const { team } = aboutPage

  return (
    <Section id={team.id}>
      <Reveal className="max-w-2xl">
        <Eyebrow>{team.eyebrow}</Eyebrow>
        <h2 className="mt-3 text-3xl sm:text-4xl">{team.title}</h2>
        <p className="mt-4 leading-relaxed text-muted-foreground">{team.body}</p>
      </Reveal>

      <Stagger className="mt-10 grid gap-6 sm:grid-cols-2">
        {team.members.map((member) => (
          <MotionItem key={member.name}>
            <Card className="group/card h-full gap-0 overflow-hidden p-0">
              <MemberPhoto member={member} />
              <div className="p-5 sm:p-6">
                <p className="text-xs font-medium tracking-[0.18em] text-primary uppercase">
                  {member.role}
                </p>
                <h3 className="mt-2 font-heading text-xl leading-snug font-semibold sm:text-2xl">
                  {member.name}
                  {"credentials" in member && member.credentials ? (
                    <span className="ml-1.5 text-base font-medium text-muted-foreground">
                      , {member.credentials}
                    </span>
                  ) : null}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {member.bio}
                </p>
              </div>
            </Card>
          </MotionItem>
        ))}
      </Stagger>
    </Section>
  )
}
