import { useMemo, useRef, useState, useEffect } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Line, Sparkles } from "@react-three/drei"
import * as THREE from "three"
import { useMediaQuery } from "@/hooks/useMediaQuery"

type Node3 = { pos: THREE.Vector3; layer: number }
type Edge = { a: THREE.Vector3; b: THREE.Vector3 }

// Deterministic pseudo-random generator so the layout is stable across renders.
function mulberry32(seed: number) {
  return function () {
    seed |= 0
    seed = (seed + 0x6d2b79f5) | 0
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function buildGraph(density: "full" | "reduced") {
  const rand = mulberry32(7)
  const layerDefs =
    density === "full"
      ? [
          { x: -6.5, count: 3 },
          { x: -2.5, count: 5 },
          { x: 2, count: 5 },
          { x: 6, count: 2 },
        ]
      : [
          { x: -5, count: 2 },
          { x: -1.5, count: 3 },
          { x: 2, count: 3 },
          { x: 5, count: 2 },
        ]

  const nodes: Node3[] = []
  const layerGroups: Node3[][] = []

  layerDefs.forEach((def, layerIndex) => {
    const group: Node3[] = []
    for (let i = 0; i < def.count; i++) {
      const spread = 3.6
      const pos = new THREE.Vector3(
        def.x + (rand() - 0.5) * 0.6,
        (i - (def.count - 1) / 2) * (spread / Math.max(def.count - 1, 1)) + (rand() - 0.5) * 0.4,
        (rand() - 0.5) * 2.4
      )
      const node = { pos, layer: layerIndex }
      nodes.push(node)
      group.push(node)
    }
    layerGroups.push(group)
  })

  const edges: Edge[] = []
  for (let l = 0; l < layerGroups.length - 1; l++) {
    const from = layerGroups[l]
    const to = layerGroups[l + 1]
    from.forEach((node) => {
      const connections = 1 + Math.floor(rand() * 2)
      for (let c = 0; c < connections; c++) {
        const target = to[Math.floor(rand() * to.length)]
        edges.push({ a: node.pos, b: target.pos })
      }
    })
  }

  return { nodes, edges }
}

function Pulse({ edge, speed, delay }: { edge: Edge; speed: number; delay: number }) {
  const ref = useRef<THREE.Mesh>(null)
  const start = useMemo(() => performance.now() / 1000 + delay, [delay])

  useFrame(() => {
    if (!ref.current) return
    const t = ((performance.now() / 1000 - start) * speed) % 1
    const clamped = t < 0 ? t + 1 : t
    ref.current.position.lerpVectors(edge.a, edge.b, clamped)
    const mat = ref.current.material as THREE.MeshBasicMaterial
    mat.opacity = Math.sin(clamped * Math.PI)
  })

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.045, 8, 8]} />
      <meshBasicMaterial color="#ffcb84" transparent opacity={0} />
    </mesh>
  )
}

function GraphGroup({ reduceMotion, density }: { reduceMotion: boolean; density: "full" | "reduced" }) {
  const group = useRef<THREE.Group>(null)
  const { nodes, edges } = useMemo(() => buildGraph(density), [density])
  const pulseEdges = useMemo(() => {
    const count = density === "full" ? 14 : 6
    const rand = mulberry32(42)
    const picked: Edge[] = []
    for (let i = 0; i < count; i++) {
      picked.push(edges[Math.floor(rand() * edges.length)])
    }
    return picked
  }, [edges, density])

  const pointer = useRef({ x: 0, y: 0 })

  useEffect(() => {
    function handleMove(e: MouseEvent) {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1
      pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1
    }
    window.addEventListener("mousemove", handleMove)
    return () => window.removeEventListener("mousemove", handleMove)
  }, [])

  useFrame((_, delta) => {
    if (!group.current) return
    if (!reduceMotion) {
      group.current.rotation.y += delta * 0.045
    }
    const targetX = reduceMotion ? 0 : pointer.current.y * 0.15
    const targetZ = reduceMotion ? 0 : pointer.current.x * 0.1
    group.current.rotation.x += (targetX - group.current.rotation.x) * 0.03
    group.current.rotation.z += (targetZ - group.current.rotation.z) * 0.03
  })

  return (
    <group ref={group}>
      {edges.map((edge, i) => (
        <Line
          key={i}
          points={[edge.a, edge.b]}
          color="#3a3934"
          transparent
          opacity={0.55}
          lineWidth={1}
        />
      ))}

      {nodes.map((node, i) => (
        <mesh key={i} position={node.pos}>
          <icosahedronGeometry args={[node.layer === 0 || node.layer === 3 ? 0.11 : 0.08, 0]} />
          <meshBasicMaterial
            color={node.layer === 0 || node.layer === 3 ? "#e8a34c" : "#f5f4f0"}
            transparent
            opacity={node.layer === 0 || node.layer === 3 ? 0.95 : 0.5}
          />
        </mesh>
      ))}

      {!reduceMotion &&
        pulseEdges.map((edge, i) => (
          <Pulse key={i} edge={edge} speed={0.18 + (i % 5) * 0.05} delay={i * 0.6} />
        ))}
    </group>
  )
}

export function PipelineScene({ reduceMotion = false }: { reduceMotion?: boolean }) {
  const isMobile = useMediaQuery("(max-width: 768px)")
  const [dpr, setDpr] = useState(1.5)

  useEffect(() => {
    setDpr(Math.min(window.devicePixelRatio, isMobile ? 1.5 : 2))
  }, [isMobile])

  return (
    <Canvas
      dpr={dpr}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      camera={{ fov: 45, position: [0, 0, 11] }}
      style={{ pointerEvents: "none" }}
    >
      <ambientLight intensity={0.6} />
      <GraphGroup reduceMotion={reduceMotion} density={isMobile ? "reduced" : "full"} />
      {!isMobile && (
        <Sparkles count={90} scale={[14, 8, 6]} size={1.1} speed={0.15} color="#6f6d67" opacity={0.35} />
      )}
    </Canvas>
  )
}
