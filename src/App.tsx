import { Nav } from "@/components/navigation/Nav"
import { Hero } from "@/components/hero/Hero"
import { About } from "@/components/about/About"
import { Experience } from "@/components/experience/Experience"
import { Projects } from "@/components/projects/Projects"
import { SystemMap } from "@/components/skills/SystemMap"
import { Contact } from "@/components/contact/Contact"
import { CustomCursor } from "@/components/ui/CustomCursor"

function App() {
  return (
    <>
      <div className="grain" />
      <CustomCursor />
      <Nav />
      <main>
        <Hero />
        <About />
        <Experience />
        <Projects />
        <SystemMap />
        <Contact />
      </main>
    </>
  )
}

export default App
