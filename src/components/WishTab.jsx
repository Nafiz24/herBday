import { useState } from 'react'
import { Link } from 'react-router-dom'
import CandleIcon from './CandleIcon'

// The Wishes tab for the bottom-left corner of the home page.
function WishTab() {
  const [spot, setSpot] = useState({ x: 0, y: 0 })

  function handleEnter(event) {
    const box = event.currentTarget.getBoundingClientRect()
    setSpot({ x: event.clientX - box.left, y: event.clientY - box.top })
  }

  return (
    <Link
      to="/wishes"
      onMouseEnter={handleEnter}
      className="group absolute bottom-6 left-6 z-10 flex h-32 w-48 items-center justify-center overflow-hidden rounded-3xl
                 border border-white/70 bg-white/70 text-wine shadow-xl backdrop-blur-md
                 transition-[height,color] duration-500 hover:h-60 hover:text-white
                 focus-visible:h-60 focus-visible:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
    >
      {/* warm color that spreads from where the mouse entered */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 scale-0 rounded-full
                   transition-transform duration-700 ease-out group-hover:scale-100 group-focus-visible:scale-100"
        style={{ left: spot.x, top: spot.y, background: 'linear-gradient(135deg, #ffd36b, #f2994a 50%, #d6456b)' }}
      />

      <span className="relative z-10 px-3 text-center">
        <span className="mb-1 flex justify-center">
          <CandleIcon />
        </span>
        <span className="block font-script text-3xl font-bold italic">Wishes</span>
        <span
          className="mt-2 block translate-y-3 text-base opacity-0 transition duration-500
                     group-hover:translate-y-0 group-hover:opacity-100
                     group-focus-visible:translate-y-0 group-focus-visible:opacity-100"
        >
          Wishes from your friends
        </span>
      </span>
    </Link>
  )
}

export default WishTab