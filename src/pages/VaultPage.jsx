import { useState } from 'react'
import PageHeader from '../components/PageHeader'
import LockIcon from '../components/LockIcon'
import { config } from '../data/config'
import vaultBg from '../assets/vault-bg.jpg'

const vaultModules = import.meta.glob('../assets/vault/*.{jpg,jpeg,png,webp,gif,mp4,webm,mov}', {
  eager: true,
  query: '?url',
  import: 'default',
})
const vaultFiles = Object.values(vaultModules)
const isVideo = (path) => /\.(mp4|webm|mov)$/i.test(path)

function VaultPage() {
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
    <div className="relative flex min-h-screen flex-col">
      {/* The background picture. "fixed" keeps it still while the page scrolls. */}
      <div
        aria-hidden="true"
        className="fixed inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${vaultBg})` }}
      />

      {/* Everything else sits above the background (relative) */}
      <div className="relative flex flex-1 flex-col">
        <PageHeader title="Our Vault" />

        {!unlocked ? (
          // Locked: the password box sits low, so it doesn't cover the two touching hands
          <main className="flex flex-1 items-end justify-center px-5 pb-12 pt-10">
            <form
              onSubmit={handleSubmit}
              className="w-full max-w-sm rounded-3xl border border-white/70 bg-white/70 p-6 shadow-xl backdrop-blur-md"
            >
              <LockIcon className="mb-3 h-10 w-10 text-rose" />
              <label htmlFor="vault-password" className="mb-2 block font-semibold">
                Enter our password
              </label>
              <input
                id="vault-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-lg border border-wine/30 bg-white/80 px-3 py-2 focus:outline-2 focus:outline-rose"
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
          </main>
        ) : (
          // Unlocked: photos and videos sit inside a soft frosted panel so they stay easy to see
          <main className="mx-auto mt-8 w-full max-w-5xl px-5 pb-16">
            <div className="rounded-3xl border border-white/70 bg-white/60 p-6 shadow-xl backdrop-blur-md">
              <p className="mb-6 text-lg">{config.vaultMessage}</p>
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
              <button
                onClick={lockAgain}
                className="mt-6 rounded-full border border-wine px-5 py-2 font-semibold hover:bg-wine hover:text-blush"
              >
                Lock the vault
              </button>
            </div>
          </main>
        )}
      </div>
    </div>
  )
}

export default VaultPage