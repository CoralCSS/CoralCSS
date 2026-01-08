import { Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import Docs from './pages/Docs'
import Examples from './pages/Examples'
import Components from './pages/Components'
import Themes from './pages/Themes'

function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen flex flex-col bg-background text-foreground">
        <Header />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/components" element={<Components />} />
            <Route path="/themes" element={<Themes />} />
            <Route path="/docs" element={<Docs />} />
            <Route path="/examples" element={<Examples />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  )
}

export default App
