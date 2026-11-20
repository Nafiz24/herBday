import Section from './Section'
import { config } from '../data/config'

// Section 1: the "origin" video.
function Origin() {
  return (
    <Section id="origin" title="Your origin">
      <p className="mb-6 text-lg">{config.originText}</p>
      <video
        className="w-full rounded-xl shadow-lg bg-black"
        src={config.originVideo}
        controls
        preload="metadata"
      >
        Your browser does not support video.
      </video>
      <p className="mt-3 text-sm opacity-70">
        Video not showing? Put your file in the <code>public</code> folder and match its name in{' '}
        <code>src/data/config.js</code>.
      </p>
    </Section>
  )
}

export default Origin
