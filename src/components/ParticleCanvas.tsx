import { useEffect, useRef } from 'react'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
}

const PARTICLE_COUNT = 80
const LINK_DISTANCE = 120
const MOUSE_RADIUS = 150
const FRICTION = 0.98
const GOLD = '201, 168, 76'

function createParticle(w: number, h: number): Particle {
  const angle = Math.random() * Math.PI * 2
  const speed = 0.3 + Math.random() * 0.5
  return {
    x: Math.random() * w,
    y: Math.random() * h,
    vx: Math.cos(angle) * speed,
    vy: Math.sin(angle) * speed,
    radius: 1.2 + Math.random() * 1.4,
  }
}

export default function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const isCoarse = window.matchMedia('(pointer: coarse)').matches
    let mouse = { x: -9999, y: -9999 }

    const resize = () => {
      const parent = canvas.parentElement
      if (!parent) return
      canvas.width = parent.offsetWidth
      canvas.height = parent.offsetHeight
    }
    resize()

    let particles: Particle[] = Array.from({ length: PARTICLE_COUNT }, () =>
      createParticle(canvas.width, canvas.height)
    )

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouse = { x: e.clientX - rect.left, y: e.clientY - rect.top }
    }
    const onMouseLeave = () => {
      mouse = { x: -9999, y: -9999 }
    }
    const onResize = () => {
      resize()
      particles = Array.from({ length: PARTICLE_COUNT }, () =>
        createParticle(canvas.width, canvas.height)
      )
    }

    if (!isCoarse) {
      canvas.addEventListener('mousemove', onMouseMove)
      canvas.addEventListener('mouseleave', onMouseLeave)
    }
    window.addEventListener('resize', onResize)

    let rafId: number

    const tick = () => {
      const w = canvas.width
      const h = canvas.height

      ctx.clearRect(0, 0, w, h)

      for (const p of particles) {
        // Mouse attraction
        if (!isCoarse) {
          const dx = mouse.x - p.x
          const dy = mouse.y - p.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < MOUSE_RADIUS && dist > 0) {
            const force = (MOUSE_RADIUS - dist) / MOUSE_RADIUS
            p.vx += (dx / dist) * force * 0.06
            p.vy += (dy / dist) * force * 0.06
          }
        }

        // Friction
        p.vx *= FRICTION
        p.vy *= FRICTION

        // Move
        p.x += p.vx
        p.y += p.vy

        // Bounce on edges
        if (p.x < p.radius) { p.x = p.radius; p.vx = Math.abs(p.vx) }
        else if (p.x > w - p.radius) { p.x = w - p.radius; p.vx = -Math.abs(p.vx) }
        if (p.y < p.radius) { p.y = p.radius; p.vy = Math.abs(p.vy) }
        else if (p.y > h - p.radius) { p.y = h - p.radius; p.vy = -Math.abs(p.vy) }

        // Draw dot
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${GOLD}, 0.7)`
        ctx.fill()
      }

      // Draw links
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i]
          const b = particles[j]
          const dx = a.x - b.x
          const dy = a.y - b.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < LINK_DISTANCE) {
            const alpha = (1 - dist / LINK_DISTANCE) * 0.35
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.strokeStyle = `rgba(${GOLD}, ${alpha})`
            ctx.lineWidth = 0.7
            ctx.stroke()
          }
        }
      }

      rafId = requestAnimationFrame(tick)
    }

    rafId = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('resize', onResize)
      if (!isCoarse) {
        canvas.removeEventListener('mousemove', onMouseMove)
        canvas.removeEventListener('mouseleave', onMouseLeave)
      }
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'auto',
        zIndex: 0,
      }}
    />
  )
}
