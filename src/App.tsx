import { Hero } from './sections/Hero'
import Introduction from './sections/Introduction'
import Services from './sections/Techstack'
import Projects from './sections/Projects'
import Lenis from 'lenis'
import Outro from './sections/Outro'
import { Chatbot } from './services/Chatbot'
import { motion } from "motion/react"



function App() {
  // Initialize Lenis
  const _lenis = new Lenis({
    autoRaf: true, 
  });
 
  return (
    <>
      <div className='bg-[#121111] flex flex-col min-h-screen text-white relative'>
        <motion.div
          initial={{ opacity: 0, y: 50, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className='fixed bottom-20 sm:bottom-30 right-3 sm:right-6 z-50 flex flex-col items-end gap-3'
        >
          <Chatbot />
        </motion.div>
        <Hero />
        <Introduction />
        <Services />
        <Projects />
        <Outro />
      </div>
    </>
  )
}

export default App
