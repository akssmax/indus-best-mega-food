"use client"

import { useCallback, useEffect, useState } from "react"

import { cn } from "@/lib/utils"
import {
  exportHeroDropSnapshot,
  patchHeroDropAnchor,
  patchHeroDropTuning,
  resetHeroDropTuning,
  type HeroDropPhase,
} from "@/lib/vgpu/fft-ocean/tuning-runtime"
import { OCEAN_TUNING } from "@/lib/vgpu/fft-ocean/tuning"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  HeroBgControlPanel,
  type HeroBgAnchorValues,
  type HeroBgHoverValues,
  type HeroBgInitialValues,
} from "@/components/design-system/hero-bg-control-panel"

function readInitialDefaults(): HeroBgInitialValues {
  const base = OCEAN_TUNING.heroDrop.initial
  const c = base.camera
  const p = base.particles
  const b = base.bloom
  return {
    cameraEyeX: c.eye[0],
    cameraEyeY: c.eye[1],
    cameraEyeZ: c.eye[2],
    cameraTargetX: c.target[0],
    cameraTargetY: c.target[1],
    cameraTargetZ: c.target[2],
    cameraFov: c.fovDegrees,
    cameraPitch: c.pitchDegrees,
    cameraYawRange: c.yawRange,
    cameraPitchRange: c.pitchRange,
    lookStrengthX: base.lookStrengthX,
    lookStrengthY: base.lookStrengthY,
    pointSize: p.pointSize,
    bloomStrength: b.strength,
    bloomThreshold: b.threshold,
    oceanR: p.oceanColor[0],
    oceanG: p.oceanColor[1],
    oceanB: p.oceanColor[2],
    neonR: p.neonColor[0],
    neonG: p.neonColor[1],
    neonB: p.neonColor[2],
    foamR: p.foamColor[0],
    foamG: p.foamColor[1],
    foamB: p.foamColor[2],
  }
}

function readHoverDefaults(): HeroBgHoverValues {
  const base = OCEAN_TUNING.heroDrop.hover
  const d = OCEAN_TUNING.dropMorph
  const c = base.camera
  const b = base.bloom
  return {
    dropRadius: d.radius,
    dropScale: d.scale,
    dropScaleX: d.scaleX,
    dropScaleY: d.scaleY,
    dropScaleZ: d.scaleZ,
    dropDepthScale: d.depthScale,
    dropSpecular: d.specular,
    dropHalfWidth: d.halfWidth,
    dropTipOffset: d.tipOffset,
    tiltStrengthX: d.tiltStrengthX,
    tiltStrengthY: d.tiltStrengthY,
    proximityRadius: d.proximityRadius,
    lookStrengthX: base.lookStrengthX,
    lookStrengthY: base.lookStrengthY,
    cameraEyeX: c.eye[0],
    cameraEyeY: c.eye[1],
    cameraEyeZ: c.eye[2],
    cameraTargetX: c.target[0],
    cameraTargetY: c.target[1],
    cameraTargetZ: c.target[2],
    cameraFov: c.fovDegrees,
    cameraPitch: c.pitchDegrees,
    cameraYawRange: c.yawRange,
    cameraPitchRange: c.pitchRange,
    pointSize: base.particles.pointSize,
    bloomStrength: b.strength,
    bloomThreshold: b.threshold,
    bodyR: d.bodyColor[0],
    bodyG: d.bodyColor[1],
    bodyB: d.bodyColor[2],
    rimR: d.rimColor[0],
    rimG: d.rimColor[1],
    rimB: d.rimColor[2],
    highlightR: d.highlightColor[0],
    highlightG: d.highlightColor[1],
    highlightB: d.highlightColor[2],
  }
}

function readAnchorDefaults(): HeroBgAnchorValues {
  const a = OCEAN_TUNING.heroDrop.anchor
  return {
    cornerInsetPx: a.cornerInsetPx,
    anchorOffsetX: a.anchorOffsetX,
    anchorOffsetY: a.anchorOffsetY,
  }
}

function applyInitial(values: HeroBgInitialValues) {
  patchHeroDropTuning("initial", {
    lookStrengthX: values.lookStrengthX,
    lookStrengthY: values.lookStrengthY,
    camera: {
      eye: [values.cameraEyeX, values.cameraEyeY, values.cameraEyeZ],
      target: [values.cameraTargetX, values.cameraTargetY, values.cameraTargetZ],
      fovDegrees: values.cameraFov,
      pitchDegrees: values.cameraPitch,
      yawRange: values.cameraYawRange,
      pitchRange: values.cameraPitchRange,
    },
    particles: {
      pointSize: values.pointSize,
      oceanColor: [values.oceanR, values.oceanG, values.oceanB, 0],
      neonColor: [values.neonR, values.neonG, values.neonB, 0],
      foamColor: [values.foamR, values.foamG, values.foamB, 0],
    },
    bloom: {
      strength: values.bloomStrength,
      threshold: values.bloomThreshold,
    },
  })
}

function applyHover(values: HeroBgHoverValues) {
  patchHeroDropTuning("hover", {
    dropMorph: {
      radius: values.dropRadius,
      scale: values.dropScale,
      scaleX: values.dropScaleX,
      scaleY: values.dropScaleY,
      scaleZ: values.dropScaleZ,
      depthScale: values.dropDepthScale,
      specular: values.dropSpecular,
      halfWidth: values.dropHalfWidth,
      tipOffset: values.dropTipOffset,
      tiltStrengthX: values.tiltStrengthX,
      tiltStrengthY: values.tiltStrengthY,
      proximityRadius: values.proximityRadius,
      lookStrengthX: values.lookStrengthX,
      lookStrengthY: values.lookStrengthY,
      bodyColor: [values.bodyR, values.bodyG, values.bodyB, 0],
      rimColor: [values.rimR, values.rimG, values.rimB, 0],
      highlightColor: [values.highlightR, values.highlightG, values.highlightB, 0],
    },
    dropCamera: {
      eye: [values.cameraEyeX, values.cameraEyeY, values.cameraEyeZ],
      target: [values.cameraTargetX, values.cameraTargetY, values.cameraTargetZ],
      fovDegrees: values.cameraFov,
      pitchDegrees: values.cameraPitch,
      yawRange: values.cameraYawRange,
      pitchRange: values.cameraPitchRange,
    },
    particles: { pointSize: values.pointSize },
    bloom: {
      strength: values.bloomStrength,
      threshold: values.bloomThreshold,
    },
  })
}

function applyAnchor(values: HeroBgAnchorValues) {
  patchHeroDropAnchor({
    cornerInsetPx: values.cornerInsetPx,
    anchorOffsetX: values.anchorOffsetX,
    anchorOffsetY: values.anchorOffsetY,
  })
}

function applyAll(
  initial: HeroBgInitialValues,
  hover: HeroBgHoverValues,
  anchor: HeroBgAnchorValues
) {
  applyInitial(initial)
  applyHover(hover)
  applyAnchor(anchor)
}

type HeroBgControlsProps = {
  className?: string
  description?: string
  tab?: HeroDropPhase
  onTabChange?: (tab: HeroDropPhase) => void
}

/** Live WGSL hero-drop controls — homepage hero only; does not affect page headers. */
export function HeroBgControls({
  className,
  description = "Drop is the default hero state. Particles is the field after you click the drop.",
  tab: tabProp,
  onTabChange,
}: HeroBgControlsProps) {
  const [initial, setInitial] = useState(readInitialDefaults)
  const [hover, setHover] = useState(readHoverDefaults)
  const [anchor, setAnchor] = useState(readAnchorDefaults)
  const [copied, setCopied] = useState(false)
  const [tabInternal, setTabInternal] = useState<HeroDropPhase>("hover")
  const tab = tabProp ?? tabInternal

  const setTab = (value: HeroDropPhase) => {
    if (tabProp === undefined) setTabInternal(value)
    onTabChange?.(value)
  }

  const setInitialField = useCallback((key: keyof HeroBgInitialValues, value: number) => {
    setInitial((current) => {
      const next = { ...current, [key]: value }
      applyInitial(next)
      return next
    })
  }, [])

  const setHoverField = useCallback((key: keyof HeroBgHoverValues, value: number) => {
    setHover((current) => {
      const next = { ...current, [key]: value }
      applyHover(next)
      return next
    })
  }, [])

  const setAnchorField = useCallback((key: keyof HeroBgAnchorValues, value: number) => {
    setAnchor((current) => {
      const next = { ...current, [key]: value }
      applyAnchor(next)
      return next
    })
  }, [])

  const reset = () => {
    resetHeroDropTuning()
    const nextInitial = readInitialDefaults()
    const nextHover = readHoverDefaults()
    const nextAnchor = readAnchorDefaults()
    setInitial(nextInitial)
    setHover(nextHover)
    setAnchor(nextAnchor)
    applyAll(nextInitial, nextHover, nextAnchor)
  }

  const copySnapshot = async () => {
    await navigator.clipboard.writeText(exportHeroDropSnapshot())
    setCopied(true)
    window.setTimeout(() => setCopied(false), 2000)
  }

  useEffect(() => {
    applyAll(initial, hover, anchor)
    return () => resetHeroDropTuning()
  }, [])

  const panel = (
    <HeroBgControlPanel
      tab={tab}
      initial={initial}
      hover={hover}
      anchor={anchor}
      onInitialField={setInitialField}
      onHoverField={setHoverField}
      onAnchorField={setAnchorField}
    />
  )

  return (
    <aside
      className={cn(
        "flex flex-col overflow-hidden bg-card/95 ring-border backdrop-blur-md",
        className
      )}
    >
      <div className="border-b border-border px-4 py-3">
        <Tabs
          value={tab}
          onValueChange={(value) => setTab(value as HeroDropPhase)}
          className="gap-3"
        >
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0 flex-1">
              <p className="text-xs font-medium tracking-[0.14em] uppercase text-primary">
                Hero BG controls
              </p>
              <p className="mt-1 text-[11px] leading-relaxed text-muted-foreground">
                {description}
              </p>
            </div>
          </div>
          <TabsList className="mt-3 grid h-8 w-full grid-cols-2">
            <TabsTrigger value="hover" className="text-xs">
              Drop
            </TabsTrigger>
            <TabsTrigger value="initial" className="text-xs">
              Particles
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {panel}

      <div className="flex gap-2 border-t border-border p-3">
        <Button type="button" variant="outline" size="sm" className="flex-1" onClick={reset}>
          Reset
        </Button>
        <Button type="button" size="sm" className="flex-1" onClick={copySnapshot}>
          {copied ? "Copied" : "Copy JSON"}
        </Button>
      </div>
    </aside>
  )
}
