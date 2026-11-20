import { useState } from 'react'
import PageHeader from '../components/PageHeader'
import photosBg from '../assets/photos-bg.jpg'

const photoModules = import.meta.glob('../assets/photos/*.{jpg,jpeg,png,webp,gif,JPG,JPEG,PNG}', {
  eager: true,
  query: '?url',
  import: 'default',
})
const photos = Object.values(photoModules)

function PhotosPage() {
  const [selected, setSelected] = useState(null)

  return (
    <div className="relative min-h-screen">
  
      <div
        aria-hidden="true"
        className="fixed inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${photosBg})` }}
      />

      {/* Everything else sits above the background (relative) */}
      <div className="relative pb-16">
        {/* Soft bar behind the title, so it stays readable over the dark kiss pattern */}
        <div className="bg-blush/80 pb-6 backdrop-blur">
          <PageHeader title="YOUR SWEET FACE" />
        </div>

        <main className="mx-auto mt-8 max-w-5xl px-5">
          {/* Frosted panel so the photos stand out from the background */}
          <div className="rounded-3xl border border-white/70 bg-white/60 p-6 shadow-xl backdrop-blur-md">
            {photos.length === 0 ? (
              <p>No photos yet. Add images to <code>src/assets/photos</code>.</p>
            ) : (
              <div className="columns-2 gap-4 space-y-4 md:columns-3">
                {photos.map((src) => (
                  <button
                    key={src}
                    onClick={() => setSelected(src)}
                    className="block w-full overflow-hidden rounded-lg shadow transition-shadow hover:shadow-xl focus-visible:outline-2 focus-visible:outline-rose"
                  >
                    <img src={src} alt="A memory of us" loading="lazy" className="w-full" />
                  </button>
                ))}
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Big view. Only shows when a photo is selected. Click anywhere to close. */}
      {selected && (
        <div
          className="fixed inset-0 z-30 flex items-center justify-center bg-black/85 p-4"
          onClick={() => setSelected(null)}
        >
          <img src={selected} alt="Opened memory" className="max-h-full max-w-full rounded-lg" />
        </div>
      )}
    </div>
  )
}

export default PhotosPage