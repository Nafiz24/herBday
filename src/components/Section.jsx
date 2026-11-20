// A reusable wrapper. Every section (Photos, Videos...) uses it,
// so they all get the same spacing and heading style.
function Section({ id, title, children }) {
  return (
    <section id={id} className="mx-auto max-w-5xl px-5 py-16 scroll-mt-16">
      <h2 className="font-script text-4xl md:text-5xl italic font-bold mb-8">{title}</h2>
      {children}
    </section>
  )
}

export default Section
