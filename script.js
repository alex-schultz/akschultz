// Highlights the nav link for the section currently in view.
(() => {
  const links = new Map(
    [...document.querySelectorAll('.nav nav a[href^="#"]')].map((a) => [
      a.getAttribute('href').slice(1),
      a,
    ]),
  )

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          for (const [id, link] of links) {
            const current = id === entry.target.id
            link.classList.toggle('current', current)
            if (current) link.setAttribute('aria-current', 'true')
            else link.removeAttribute('aria-current')
          }
        }
      },
      // A thin band a third of the way down the viewport.
      { rootMargin: '-35% 0px -60% 0px' },
    )
    for (const id of links.keys()) {
      const section = document.getElementById(id)
      if (section) observer.observe(section)
    }
  }

  // Keep the footer year current.
  const year = document.getElementById('year')
  if (year) year.textContent = String(new Date().getFullYear())
})()
