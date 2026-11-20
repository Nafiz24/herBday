import { Link } from 'react-router-dom'

// The top of the Photos / Videos pages: a back link and a title.
function PageHeader({ title }) {
  return (
    <header className="mx-auto max-w-5xl px-5 pt-8">
      <Link to="/" className="font-semibold text-rose hover:underline">
        &larr; Back home
      </Link>
      <h1 className="mt-4 font-script text-5xl font-bold italic md:text-6xl">{title}</h1>
    </header>
  )
}

export default PageHeader
