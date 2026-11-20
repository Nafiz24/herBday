import PageHeader from '../components/PageHeader'
import videosBg from '../assets/videos-bg.jpg'

// Same trick as photos: every video in src/assets/videos shows up automatically.
const videoModules = import.meta.glob('../assets/videos/*.{mp4,webm,mov,MP4}', {
  eager: true,
  query: '?url',
  import: 'default',
})
const videos = Object.values(videoModules)

function VideosPage() {
  return (
    <div className="relative min-h-screen">

      <div
        aria-hidden="true"
        className="fixed inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${videosBg})` }}
      />


      <div className="relative pb-16">
        <PageHeader title="YOUR SWEET VIDEOS" />

        <main className="mx-auto mt-8 max-w-5xl px-5">
          {videos.length === 0 ? (
            // No videos yet: a small note, so the camera in the middle stays visible
            <p className="inline-block rounded-2xl border border-white/70 bg-white/70 px-5 py-3 shadow backdrop-blur-md">
              No videos yet. Add files to <code>src/assets/videos</code>.
            </p>
          ) : (
            // Frosted panel so the videos stand out from the background
            <div className="rounded-3xl border border-white/70 bg-white/60 p-6 shadow-xl backdrop-blur-md">
              <div className="grid gap-6 md:grid-cols-2">
                {videos.map((src) => (
                  <video key={src} src={src} controls preload="metadata" className="w-full rounded-xl bg-black shadow-lg" />
                ))}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}

export default VideosPage