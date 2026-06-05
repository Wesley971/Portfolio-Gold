import { useEffect } from 'react'

export default function Cursor() {
  useEffect(() => {
    const cur = document.getElementById('cur')!
    let mx = 0, my = 0, cx = 0, cy = 0
    let rafId: number

    const onMove  = (e: MouseEvent) => { mx = e.clientX; my = e.clientY }
    const onLeave = () => cur.classList.add('hidden')
    const onEnter = () => cur.classList.remove('hidden')

    document.addEventListener('mousemove', onMove)
    document.addEventListener('mouseleave', onLeave)
    document.addEventListener('mouseenter', onEnter)

    function loop() {
      cx += (mx - cx) * .18
      cy += (my - cy) * .18
      cur.style.left = cx + 'px'
      cur.style.top  = cy + 'px'
      rafId = requestAnimationFrame(loop)
    }
    rafId = requestAnimationFrame(loop)

    // Event delegation — works with any dynamically rendered element
    const onOver = (e: MouseEvent) => {
      const t = e.target as Element
      if (t.closest('a, .pcard, .chip, .cbtn, .sitem, .nav-logo')) {
        cur.classList.add('big')
      } else {
        cur.classList.remove('big')
      }
    }
    document.addEventListener('mouseover', onOver)

    return () => {
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseleave', onLeave)
      document.removeEventListener('mouseenter', onEnter)
      document.removeEventListener('mouseover', onOver)
      cancelAnimationFrame(rafId)
    }
  }, [])

  return <div id="cur" />
}
