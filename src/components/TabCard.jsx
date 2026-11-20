import { useState } from 'react'
import { Link } from 'react-router-dom'

// Props: to = page address, label = always-visible name, hoverText = text on hover,
// gradient = colors that spread on hover, icon = optional icon that rotates on hover.
function TabCard({ to, label, hoverText, gradient, icon }) {
  const [spot, setSpot] = useState({ x: 0, y: 0 })

  function handleEnter(event) {
    const box = event.currentTarget.getBoundingClientRect()
    setSpot({ x: event.clientX - box.left, y: event.clientY - box.top })
  }

  return (
    <Link
      to={to}
      onMouseEnter={handleEnter}
      className="group relative flex h-44 w-64 items-center justify-center overflow-hidden rounded-3xl
                 border border-white/70 bg-white/70 text-wine shadow-xl backdrop-blur-md
                 transition-[height,color] duration-500 hover:h-80 hover:text-white
                 focus-visible:h-80 focus-visible:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute h-[900px] w-[900px] -translate-x-1/2 -translate-y-1/2 scale-0 rounded-full
                   transition-transform duration-700 ease-out group-hover:scale-100 group-focus-visible:scale-100"
        style={{ left: spot.x, top: spot.y, background: gradient }}
      />

      <span className="relative z-10 px-4 text-center">
        {/* The icon spins a full turn when the mouse is on the card */}
        {icon && (
          <span
            className="mb-2 flex justify-center transition-transform duration-700
                       group-hover:rotate-[360deg] group-focus-visible:rotate-[360deg]"
          >
            {icon}
          </span>
        )}
        <span className="block font-script text-4xl font-bold italic">{label}</span>
        <span
          className="mt-3 block translate-y-3 text-lg opacity-0 transition duration-500
                     group-hover:translate-y-0 group-hover:opacity-100
                     group-focus-visible:translate-y-0 group-focus-visible:opacity-100"
        >
          {hoverText}
        </span>
      </span>
    </Link>
  )
}

export default TabCard