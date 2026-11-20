import PageHeader from '../components/PageHeader'
import CandleIcon from '../components/CandleIcon'
import { config } from '../data/config'

// Each note gets a paper color and a tilt. They repeat in order.
const paperColors = ['#fde2e8', '#fff3dc', '#f9d3dc', '#f6ead9']
const tilts = ['-rotate-2', 'rotate-1', 'rotate-2', '-rotate-1']

function WishesPage() {
  return (
    <div className="min-h-screen pb-20">
      <PageHeader title="Wishes for you" />

      <main className="mx-auto mt-10 max-w-5xl px-5">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {config.wishes.map((wish, index) => (
            <article
              key={wish.from + index}
              className={`group relative rounded-sm p-6 pt-9 shadow-lg transition duration-300
                          hover:-translate-y-2 hover:rotate-0 hover:shadow-2xl ${tilts[index % tilts.length]}`}
              style={{ backgroundColor: paperColors[index % paperColors.length] }}
            >
              {/* tape on top of the note */}
              <span
                aria-hidden="true"
                className="absolute -top-3 left-1/2 h-6 w-20 -translate-x-1/2 -rotate-3 bg-rose/40"
              />
              <p className="text-lg leading-relaxed">{wish.message}</p>
              <footer className="mt-5 flex items-center justify-between">
                <span className="font-script text-2xl font-bold italic text-rose">{wish.from}</span>
                <CandleIcon className="h-8 w-6" />
              </footer>
            </article>
          ))}
        </div>
      </main>
    </div>
  )
}

export default WishesPage