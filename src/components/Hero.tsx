import { useEffect, useRef } from 'react'

export default function Hero() {
  const heroLeftRef = useRef<HTMLDivElement>(null)
  const availRef    = useRef<HTMLDivElement>(null)
  const scrlRef     = useRef<HTMLDivElement>(null)

  // Parallax — wait for avail slideR animation before applying transform to it
  useEffect(() => {
    const heroLeft = heroLeftRef.current
    const avail    = availRef.current
    if (!heroLeft || !avail) return

    let availDone = false
    const onAnimEnd = () => { availDone = true }
    avail.addEventListener('animationend', onAnimEnd, { once: true })

    const onScroll = () => {
      const y = window.scrollY
      if (y < window.innerHeight) {
        heroLeft.style.transform = `translateY(${y * 0.13}px)`
        if (availDone) avail.style.transform = `translateY(${y * 0.07}px)`
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Scroll indicator — hide on first scroll
  useEffect(() => {
    const scrl = scrlRef.current
    if (!scrl) return
    let hidden = false
    const onScroll = () => {
      if (!hidden && window.scrollY > 80) { hidden = true; scrl.classList.add('out') }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <section id="hero">
      <div className="wrap hero-body">
        <div className="hero-left" ref={heroLeftRef}>
          <p className="hero-tags">Full-Stack &middot; React &middot; NestJS &middot; Docker</p>
          <div>
            <span className="hero-fn">Wesley</span>
            <span className="hero-ln">Abdoul</span>
          </div>
          <div className="hero-bar" />
          <p className="hero-sub">Développeur Full-Stack</p>
        </div>
        <div className="avail" ref={availRef}>
          <div className="avail-ttl">Disponible</div>
          <div className="avail-sep" />
          <div className="avail-stack">
            React &middot; TypeScript<br />
            NestJS &middot; Prisma<br />
            Docker &middot; Node.js
          </div>
          <a href="#contact" className="avail-cta">→ Discutons</a>
        </div>
      </div>
      <div className="scrl" ref={scrlRef}>
        <div className="scrl-line" />
        <span className="scrl-txt">Scroll</span>
      </div>
    </section>
  )
}
