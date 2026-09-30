import Navbar from './components/Navbar'
import CropperTool from './components/CropperTool'
import Footer from './components/Footer'

function App() {
  return (
    <div
      className="
        min-h-screen
        bg-white
        text-black
        transition-colors
        dark:bg-[#090909]
        dark:text-white
      "
    >
      <Navbar />

      <CropperTool />

      <Footer />
    </div>
  )
}

export default App