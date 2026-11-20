import { useState } from 'react'
import Section from './Section'
import { config } from '../data/config'

// Everything inside src/assets/vault (photos AND videos) is shown after unlocking.
const vaultModules = import.meta.glob('../assets/vault/*.{jpg,jpeg,png,webp,gif,mp4,webm,mov}', {
  eager: true,
  query: '?url',
  import: 'default',
})
const vaultFiles = Object.values(vaultModules)
const isVideo = (path) => /\.(mp4|webm|mov)$/i.test(path)

function Vault() {
  const [unlocked, setUnlocked] = useState(false) // is the vault open?
  const [password, setPassword] = useState('') // what she is typing
  const [error, setError] = useState('') // wrong password message

  function handleSubmit(event) {
    event.preventDefault() // stops the page from reloading
    if (password === config.vaultPassword) {
      setUnlocked(true)
      setError('')
    } else {
      setError('That is not the password. Try again.')
    }
  }

  function lockAgain() {
    setUnlocked(false)
    setPassword('')
  }

  return (
    <Section id="vault" title="Our personal vault">
      {!unlocked ? (
        <form onSubmit={handleSubmit} className="max-w-sm rounded-xl bg-white p-6 shadow">
          <label htmlFor="vault-password" className="block font-semibold mb-2">
            Enter our password
          </label>
          <input
            id="vault-password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-lg border border-wine/30 px-3 py-2 focus:outline-2 focus:outline-rose"
          />
          <p className="mt-2 text-sm opacity-70">{config.vaultHint}</p>
          {error && <p className="mt-2 text-sm font-semibold text-rose">{error}</p>}
          <button
            type="submit"
            className="mt-4 rounded-full bg-wine px-6 py-2 font-semibold text-blush hover:bg-wine/85"
          >
            Unlock
          </button>
        </form>
      ) : (
        <div>
          <p className="text-lg mb-6">{config.vaultMessage}</p>
          {vaultFiles.length === 0 ? (
            <p>The vault is empty. Add files to <code>src/assets/vault</code>.</p>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
              {vaultFiles.map((src) =>
                isVideo(src) ? (
                  <video key={src} src={src} controls className="w-full rounded-lg shadow" />
                ) : (
                  <img key={src} src={src} alt="A private memory" className="w-full rounded-lg shadow" />
                ),
              )}
            </div>
          )}
          <button onClick={lockAgain} className="mt-6 rounded-full border border-wine px-5 py-2 font-semibold hover:bg-wine hover:text-blush">
            Lock the vault
          </button>
        </div>
      )}
    </Section>
  )
}

export default Vault
