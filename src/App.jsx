import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import PhotosPage from './pages/PhotosPage'
import VideosPage from './pages/VideosPage'
import VaultPage from './pages/VaultPage'
import WishesPage from './pages/WishPage'
import Chatbot from './components/Chatbot'   // NEW

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/photos" element={<PhotosPage />} />
        <Route path="/videos" element={<VideosPage />} />
        <Route path="/vault" element={<VaultPage />} />
        <Route path="/wishes" element={<WishesPage />} />
      </Routes>
      <Chatbot />   {/* NEW: floating chat icon */}
    </>
  )
}

export default App