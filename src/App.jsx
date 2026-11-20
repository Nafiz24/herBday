import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import PhotosPage from './pages/PhotosPage'
import VideosPage from './pages/VideosPage'
import VaultPage from './pages/VaultPage'
import WishesPage from './pages/WishPage'

// Each <Route> says: "when the address is THIS, show THAT page".
function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/photos" element={<PhotosPage />} />
      <Route path="/videos" element={<VideosPage />} />
      <Route path="/vault" element={<VaultPage />} />
      <Route path="/wishes" element={<WishesPage />} />
    </Routes>
  )
}

export default App
