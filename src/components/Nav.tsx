import { useEffect, useRef, useState } from 'react'

export default function Nav() {
  const [scrolled, setScrolled]   = useState(false)
  const [activeId, setActiveId]   = useState('')
  const logoRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const io = new IntersectionObserver(
      entries => {
        entries.forEach(entry => { if (entry.isIntersecting) setActiveId(entry.target.id) })
      },
      { threshold: 0.35 }
    )
    document.querySelectorAll('section[id]').forEach(s => io.observe(s))
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    const el = logoRef.current
    if (!el) return
    const orig  = el.textContent ?? ''
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ·'
    let timerId: ReturnType<typeof setInterval> | null = null

    const onEnter = () => {
      if (timerId) clearInterval(timerId)
      let frame = 0
      const total = orig.length * 3
      timerId = setInterval(() => {
        el.textContent = orig.split('').map((c, i) => {
          if (c === ' ' || c === '.') return c
          if (frame > i * 3) return c
          return chars[Math.floor(Math.random() * chars.length)]
        }).join('')
        if (++frame > total) { el.textContent = orig; if (timerId) clearInterval(timerId) }
      }, 35)
    }

    el.addEventListener('mouseenter', onEnter)
    return () => { el.removeEventListener('mouseenter', onEnter); if (timerId) clearInterval(timerId) }
  }, [])

  const cls = (id: string, gold = false) =>
    [gold ? 'gc' : '', activeId === id ? 'active' : ''].filter(Boolean).join(' ') || undefined

  return (
    <nav className={scrolled ? 'sc' : undefined}>
      <span className="nav-logo" ref={logoRef}>W. ABDOUL</span>
      <ul>
        <li><a href="#projects" className={cls('projects')}>Projets</a></li>
        <li><a href="#about"    className={cls('about')}>Profil</a></li>
        <li><a href="#stack"    className={cls('stack')}>Stack</a></li>
        <li><a href="#contact"  className={cls('contact', true)}>Contact</a></li>
      </ul>
    </nav>
  )
}
