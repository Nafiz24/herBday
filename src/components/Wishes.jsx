import Section from './Section'
import { config } from '../data/config'

// Shows one card for each wish in config.js
function Wishes() {
  return (
    <Section id="wishes" title="Your wishes">
      <div className="grid gap-5 md:grid-cols-2">
        {config.wishes.map((wish) => (
          <blockquote key={wish.from} className="rounded-xl bg-white p-6 shadow border-l-4 border-rose">
            <p className="text-lg">{wish.message}</p>
            <footer className="mt-3 font-semibold text-rose">{wish.from}</footer>
          </blockquote>
        ))}
      </div>
    </Section>
  )
}

export default Wishes
