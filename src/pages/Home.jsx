import TabCard from '../components/TabCard'
import LockIcon from '../components/LockIcon'
import WishTab from '../components/WishTab'
import { config } from '../data/config'
import cover from '../assets/cover.jpg'

// The first page: the love collage as background, with the tabs in front of it.
function Home() {
  return (
    <div
      className="relative flex min-h-screen flex-col items-center justify-center gap-12 bg-cover bg-center px-5 py-10"
      style={{ backgroundImage: `url(${cover})` }}
    >
      {/* A soft dark layer so the tabs stand out from the busy background */}
      <div className="absolute inset-0 bg-wine/25" />

      <div className="relative rounded-3xl bg-blush/80 px-8 py-5 text-center shadow-xl backdrop-blur">
        <p className="text-3xl font-script text-2xl italic text-rose">{config.herName}</p>
        <h1 className="font-script text-4xl font-bold italic md:text-6xl">{config.title}</h1>
      </div>

      <div className="relative flex flex-wrap items-center justify-center gap-8">
        <TabCard
          to="/photos"
          label="Photos"
          hoverText="The photos of yours"
          gradient="linear-gradient(135deg, #d6456b, #f08bb0 55%, #e5a93d)"
        />
        <TabCard
          to="/videos"
          label="Videos"
          hoverText="The videos of yours"
          gradient="linear-gradient(135deg, #3d1028, #a3245a 55%, #d6456b)"
        />
        <TabCard
          to="/vault"
          label="Our Vault"
          hoverText="Only for us. Enter the password"
          gradient="linear-gradient(135deg, #e5a93d, #d6456b 60%, #3d1028)"
          icon={<LockIcon />}
        />
      </div>
         <WishTab />
    </div>
  )
}

export default Home
