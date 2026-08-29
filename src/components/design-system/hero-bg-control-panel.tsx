"use client"

import type { ReactNode } from "react"

import { Label } from "@/components/ui/label"
import type { HeroDropPhase } from "@/lib/vgpu/fft-ocean/tuning-runtime"
import { cn } from "@/lib/utils"

type SliderSpec = {
  label: string
  min: number
  max: number
  step: number
  value: number
  format?: (value: number) => string
  onChange: (value: number) => void
}

export type HeroBgInitialValues = {
  cameraEyeX: number
  cameraEyeY: number
  cameraEyeZ: number
  cameraTargetX: number
  cameraTargetY: number
  cameraTargetZ: number
  cameraFov: number
  cameraPitch: number
  cameraYawRange: number
  cameraPitchRange: number
  lookStrengthX: number
  lookStrengthY: number
  pointSize: number
  bloomStrength: number
  bloomThreshold: number
  oceanR: number
  oceanG: number
  oceanB: number
  neonR: number
  neonG: number
  neonB: number
  foamR: number
  foamG: number
  foamB: number
}

export type HeroBgHoverValues = {
  dropRadius: number
  dropScale: number
  dropScaleX: number
  dropScaleY: number
  dropScaleZ: number
  dropDepthScale: number
  dropSpecular: number
  dropHalfWidth: number
  dropTipOffset: number
  tiltStrengthX: number
  tiltStrengthY: number
  proximityRadius: number
  lookStrengthX: number
  lookStrengthY: number
  cameraEyeX: number
  cameraEyeY: number
  cameraEyeZ: number
  cameraTargetX: number
  cameraTargetY: number
  cameraTargetZ: number
  cameraFov: number
  cameraPitch: number
  cameraYawRange: number
  cameraPitchRange: number
  pointSize: number
  bloomStrength: number
  bloomThreshold: number
  bodyR: number
  bodyG: number
  bodyB: number
  rimR: number
  rimG: number
  rimB: number
  highlightR: number
  highlightG: number
  highlightB: number
}

export type HeroBgAnchorValues = {
  cornerInsetPx: number
  anchorOffsetX: number
  anchorOffsetY: number
}

function SliderRow({
  label,
  min,
  max,
  step,
  value,
  format,
  onChange,
}: SliderSpec) {
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between gap-2">
        <Label className="text-xs text-muted-foreground">{label}</Label>
        <span className="font-mono text-[10px] text-foreground/80">
          {format ? format(value) : value.toFixed(step < 1 ? 2 : 0)}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        className="h-1.5 w-full cursor-pointer accent-primary"
      />
    </div>
  )
}

function ControlSection({
  title,
  children,
  defaultOpen = false,
}: {
  title: string
  children: ReactNode
  defaultOpen?: boolean
}) {
  return (
    <details className="group border-b border-border/80 pb-3" open={defaultOpen}>
      <summary className="cursor-pointer list-none py-2 text-xs font-medium tracking-[0.12em] uppercase text-foreground/80 marker:content-none [&::-webkit-details-marker]:hidden">
        {title}
      </summary>
      <div className="mt-2 space-y-3">{children}</div>
    </details>
  )
}

type CameraFields = {
  cameraEyeX: number
  cameraEyeY: number
  cameraEyeZ: number
  cameraTargetX: number
  cameraTargetY: number
  cameraTargetZ: number
  cameraFov: number
  cameraPitch: number
  cameraYawRange: number
  cameraPitchRange: number
}

function CameraSliders({
  values,
  onChange,
}: {
  values: CameraFields
  onChange: (key: keyof CameraFields, value: number) => void
}) {
  return (
    <>
      <SliderRow label="Eye X" min={-40} max={60} step={1} value={values.cameraEyeX} onChange={(v) => onChange("cameraEyeX", v)} />
      <SliderRow label="Eye Y" min={5} max={60} step={1} value={values.cameraEyeY} onChange={(v) => onChange("cameraEyeY", v)} />
      <SliderRow label="Eye Z" min={30} max={120} step={1} value={values.cameraEyeZ} onChange={(v) => onChange("cameraEyeZ", v)} />
      <SliderRow label="Target X" min={-20} max={40} step={1} value={values.cameraTargetX} onChange={(v) => onChange("cameraTargetX", v)} />
      <SliderRow label="Target Y" min={0} max={30} step={1} value={values.cameraTargetY} onChange={(v) => onChange("cameraTargetY", v)} />
      <SliderRow label="Target Z" min={0} max={80} step={1} value={values.cameraTargetZ} onChange={(v) => onChange("cameraTargetZ", v)} />
      <SliderRow label="FOV" min={40} max={110} step={1} value={values.cameraFov} onChange={(v) => onChange("cameraFov", v)} />
      <SliderRow label="Pitch" min={-40} max={10} step={1} value={values.cameraPitch} onChange={(v) => onChange("cameraPitch", v)} />
      <SliderRow label="Yaw range" min={0} max={40} step={1} value={values.cameraYawRange} onChange={(v) => onChange("cameraYawRange", v)} />
      <SliderRow label="Pitch range" min={0} max={30} step={1} value={values.cameraPitchRange} onChange={(v) => onChange("cameraPitchRange", v)} />
    </>
  )
}

export type HeroBgControlPanelProps = {
  tab: HeroDropPhase
  initial: HeroBgInitialValues
  hover: HeroBgHoverValues
  anchor: HeroBgAnchorValues
  onInitialField: (key: keyof HeroBgInitialValues, value: number) => void
  onHoverField: (key: keyof HeroBgHoverValues, value: number) => void
  onAnchorField: (key: keyof HeroBgAnchorValues, value: number) => void
  className?: string
}

/** Scrollable slider groups for the hero BG tuner — Drop and Particles tabs. */
export function HeroBgControlPanel({
  tab,
  initial,
  hover,
  anchor,
  onInitialField,
  onHoverField,
  onAnchorField,
  className,
}: HeroBgControlPanelProps) {
  return (
    <div className={cn("flex-1 overflow-y-auto px-4 py-3", className)}>
      {tab === "hover" ? (
        <>
          <ControlSection title="Position" defaultOpen>
            <SliderRow label="Pocket X" min={0} max={1} step={0.02} value={anchor.anchorOffsetX} onChange={(v) => onAnchorField("anchorOffsetX", v)} />
            <SliderRow label="Pocket Y" min={0} max={1} step={0.02} value={anchor.anchorOffsetY} onChange={(v) => onAnchorField("anchorOffsetY", v)} />
            <SliderRow label="Tip offset" min={0} max={0.2} step={0.01} value={hover.dropTipOffset} onChange={(v) => onHoverField("dropTipOffset", v)} />
          </ControlSection>
          <ControlSection title="Scale" defaultOpen>
            <SliderRow label="Scale" min={0.3} max={2.6} step={0.05} value={hover.dropScale} onChange={(v) => onHoverField("dropScale", v)} />
            <SliderRow label="Scale X" min={0.3} max={2.4} step={0.05} value={hover.dropScaleX} onChange={(v) => onHoverField("dropScaleX", v)} />
            <SliderRow label="Scale Y" min={0.3} max={2.4} step={0.05} value={hover.dropScaleY} onChange={(v) => onHoverField("dropScaleY", v)} />
            <SliderRow label="Scale Z" min={0.3} max={2.4} step={0.05} value={hover.dropScaleZ} onChange={(v) => onHoverField("dropScaleZ", v)} />
          </ControlSection>
          <ControlSection title="3D shape">
            <SliderRow label="Radius" min={20} max={90} step={1} value={hover.dropRadius} onChange={(v) => onHoverField("dropRadius", v)} />
            <SliderRow label="Depth" min={0.4} max={2.8} step={0.05} value={hover.dropDepthScale} onChange={(v) => onHoverField("dropDepthScale", v)} />
            <SliderRow label="Half width" min={0.2} max={0.6} step={0.01} value={hover.dropHalfWidth} onChange={(v) => onHoverField("dropHalfWidth", v)} />
          </ControlSection>
          <ControlSection title="Glow" defaultOpen>
            <SliderRow label="Specular" min={0} max={3} step={0.05} value={hover.dropSpecular} onChange={(v) => onHoverField("dropSpecular", v)} />
            <SliderRow label="Bloom strength" min={0} max={0.16} step={0.002} value={hover.bloomStrength} onChange={(v) => onHoverField("bloomStrength", v)} />
            <SliderRow label="Bloom threshold" min={0.1} max={0.9} step={0.01} value={hover.bloomThreshold} onChange={(v) => onHoverField("bloomThreshold", v)} />
            <SliderRow label="Point size" min={0.2} max={2} step={0.05} value={hover.pointSize} onChange={(v) => onHoverField("pointSize", v)} />
          </ControlSection>
          <ControlSection title="Drop camera">
            <CameraSliders
              values={hover}
              onChange={(key, value) => onHoverField(key, value)}
            />
            <SliderRow label="Camera look X" min={0} max={1.2} step={0.01} value={hover.lookStrengthX} onChange={(v) => onHoverField("lookStrengthX", v)} />
            <SliderRow label="Camera look Y" min={0} max={1.2} step={0.01} value={hover.lookStrengthY} onChange={(v) => onHoverField("lookStrengthY", v)} />
          </ControlSection>
          <ControlSection title="Drop colours">
            <SliderRow label="Body R" min={0} max={1} step={0.01} value={hover.bodyR} onChange={(v) => onHoverField("bodyR", v)} />
            <SliderRow label="Body G" min={0} max={1} step={0.01} value={hover.bodyG} onChange={(v) => onHoverField("bodyG", v)} />
            <SliderRow label="Body B" min={0} max={1} step={0.01} value={hover.bodyB} onChange={(v) => onHoverField("bodyB", v)} />
            <SliderRow label="Rim R" min={0} max={1} step={0.01} value={hover.rimR} onChange={(v) => onHoverField("rimR", v)} />
            <SliderRow label="Rim G" min={0} max={1} step={0.01} value={hover.rimG} onChange={(v) => onHoverField("rimG", v)} />
            <SliderRow label="Rim B" min={0} max={1} step={0.01} value={hover.rimB} onChange={(v) => onHoverField("rimB", v)} />
            <SliderRow label="Highlight R" min={0} max={1} step={0.01} value={hover.highlightR} onChange={(v) => onHoverField("highlightR", v)} />
            <SliderRow label="Highlight G" min={0} max={1} step={0.01} value={hover.highlightG} onChange={(v) => onHoverField("highlightG", v)} />
            <SliderRow label="Highlight B" min={0} max={1} step={0.01} value={hover.highlightB} onChange={(v) => onHoverField("highlightB", v)} />
          </ControlSection>
        </>
      ) : (
        <>
          <ControlSection title="Ocean camera" defaultOpen>
            <CameraSliders
              values={initial}
              onChange={(key, value) => onInitialField(key, value)}
            />
          </ControlSection>
          <ControlSection title="Pointer look">
            <SliderRow label="Look X" min={0} max={1.2} step={0.01} value={initial.lookStrengthX} onChange={(v) => onInitialField("lookStrengthX", v)} />
            <SliderRow label="Look Y" min={0} max={1.2} step={0.01} value={initial.lookStrengthY} onChange={(v) => onInitialField("lookStrengthY", v)} />
          </ControlSection>
          <ControlSection title="Particles & bloom">
            <SliderRow label="Point size" min={0.2} max={2} step={0.05} value={initial.pointSize} onChange={(v) => onInitialField("pointSize", v)} />
            <SliderRow label="Bloom strength" min={0} max={0.12} step={0.002} value={initial.bloomStrength} onChange={(v) => onInitialField("bloomStrength", v)} />
            <SliderRow label="Bloom threshold" min={0.1} max={0.9} step={0.01} value={initial.bloomThreshold} onChange={(v) => onInitialField("bloomThreshold", v)} />
          </ControlSection>
          <ControlSection title="Particle colours">
            <SliderRow label="Ocean R" min={0} max={1} step={0.01} value={initial.oceanR} onChange={(v) => onInitialField("oceanR", v)} />
            <SliderRow label="Ocean G" min={0} max={1} step={0.01} value={initial.oceanG} onChange={(v) => onInitialField("oceanG", v)} />
            <SliderRow label="Ocean B" min={0} max={1} step={0.01} value={initial.oceanB} onChange={(v) => onInitialField("oceanB", v)} />
            <SliderRow label="Neon R" min={0} max={1} step={0.01} value={initial.neonR} onChange={(v) => onInitialField("neonR", v)} />
            <SliderRow label="Neon G" min={0} max={1} step={0.01} value={initial.neonG} onChange={(v) => onInitialField("neonG", v)} />
            <SliderRow label="Neon B" min={0} max={1} step={0.01} value={initial.neonB} onChange={(v) => onInitialField("neonB", v)} />
            <SliderRow label="Foam R" min={0} max={1} step={0.01} value={initial.foamR} onChange={(v) => onInitialField("foamR", v)} />
            <SliderRow label="Foam G" min={0} max={1} step={0.01} value={initial.foamG} onChange={(v) => onInitialField("foamG", v)} />
            <SliderRow label="Foam B" min={0} max={1} step={0.01} value={initial.foamB} onChange={(v) => onInitialField("foamB", v)} />
          </ControlSection>
        </>
      )}
    </div>
  )
}
