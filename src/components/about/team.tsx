import { aboutPage } from "@/content/about"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Eyebrow, Section } from "@/components/landing/section"
import { MotionItem, Reveal, Stagger } from "@/components/landing/motion"
import { cn } from "@/lib/utils"

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

export function AboutTeam() {
  const { team } = aboutPage

  return (
    <Section id={team.id}>
      <Reveal className="max-w-2xl">
        <Eyebrow>{team.eyebrow}</Eyebrow>
        <h2 className="mt-3 text-3xl sm:text-4xl">{team.title}</h2>
        <p className="mt-4 leading-relaxed text-muted-foreground">{team.body}</p>
      </Reveal>

      <Stagger className="mt-10 grid gap-5 sm:grid-cols-2">
        {team.members.map((member) => (
          <MotionItem key={member.name}>
            <Card className="h-full overflow-hidden">
              <CardHeader className="flex-row items-start gap-4 space-y-0">
                <span
                  aria-hidden
                  className={cn(
                    "flex size-14 shrink-0 items-center justify-center rounded-2xl",
                    "bg-primary/10 font-heading text-lg font-semibold text-primary"
                  )}
                >
                  {memberInitials(member.name)}
                </span>
                <div className="min-w-0 space-y-1">
                  <p className="text-xs font-medium tracking-[0.18em] text-primary uppercase">
                    {member.role}
                  </p>
                  <CardTitle className="font-heading text-xl leading-snug sm:text-2xl">
                    {member.name}
                    {"credentials" in member && member.credentials ? (
                      <span className="ml-1.5 text-base font-medium text-muted-foreground">
                        , {member.credentials}
                      </span>
                    ) : null}
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {member.bio}
                </p>
              </CardContent>
            </Card>
          </MotionItem>
        ))}
      </Stagger>
    </Section>
  )
}
