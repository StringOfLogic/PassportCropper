import Navbar from './components/Navbar'
import CropperTool from './components/CropperTool'
import Footer from './components/Footer'

function App() {
  return (
    <div
      className="
        flex min-h-screen flex-col
        bg-white
        text-black
        transition-colors
        dark:bg-[#090909]
        dark:text-white
      "
    >
      <Navbar />

      <main className="flex-1">
        <CropperTool />
      </main>

      <Footer />
    </div>
  )
}

export default App
