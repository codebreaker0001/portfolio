import { Suspense, lazy, useState, useEffect } from "react"
import { usePrefersReducedMotion } from "@/hooks/useReducedMotion"

const PipelineScene = lazy(() =>
  import("@/components/three/PipelineScene").then((m) => ({ default: m.PipelineScene }))
)

export function HeroScene() {
  const reduceMotion = usePrefersReducedMotion()
  const [mounted, setMounted] = useState(false)
  const [webglOk, setWebglOk] = useState(true)

  useEffect(() => {
    setMounted(true)
    try {
      const canvas = document.createElement("canvas")
      const gl = canvas.getContext("webgl2") || canvas.getContext("webgl")
      if (!gl) setWebglOk(false)
    } catch {
      setWebglOk(false)
    }
  }, [])

  return (
    <div className="absolute inset-0 -z-10" aria-hidden="true">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(232,163,76,0.06),transparent_60%)]" />
      {mounted && webglOk && (
        <Suspense fallback={null}>
          <PipelineScene reduceMotion={reduceMotion} />
        </Suspense>
      )}
    </div>
  )
}
