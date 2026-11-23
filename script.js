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

  // Mobile menu: the hamburger button opens a full-width panel of links.
  const header = document.querySelector('.nav')
  const toggle = document.querySelector('.nav-toggle')
  const menu = document.getElementById('nav-menu')
  if (header && toggle && menu) {
    toggle.hidden = false
    header.classList.add('has-toggle')

    const closeMenu = () => {
      if (menu.classList.contains('active')) {
        // The menu stays visible for its 0.3s slide-out; inert keeps its links
        // unfocusable during that window. CSS visibility takes over afterwards.
        menu.inert = true
        setTimeout(() => {
          menu.inert = false
        }, 350)
      }
      menu.classList.remove('active')
      toggle.setAttribute('aria-expanded', 'false')
    }

    toggle.addEventListener('click', () => {
      const open = menu.classList.toggle('active')
      toggle.setAttribute('aria-expanded', String(open))
    })

    // Close when a link is chosen, on Escape, and when keyboard focus leaves
    // the header, so focus never lands on content hidden behind the menu.
    for (const link of menu.querySelectorAll('a')) {
      link.addEventListener('click', closeMenu)
    }
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && menu.classList.contains('active')) {
        closeMenu()
        toggle.focus()
      }
    })
    header.addEventListener('focusout', (e) => {
      if (e.relatedTarget && !header.contains(e.relatedTarget)) closeMenu()
    })
  }

  // Keep the footer year current.
  const year = document.getElementById('year')
  if (year) year.textContent = String(new Date().getFullYear())
})()
