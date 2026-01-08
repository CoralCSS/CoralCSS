import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import Docs from './pages/Docs'
import Examples from './pages/Examples'

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/docs" element={<Docs />} />
          <Route path="/examples" element={<Examples />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App
