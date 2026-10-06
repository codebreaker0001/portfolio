import { Nav } from "@/components/navigation/Nav"
import { Hero } from "@/components/hero/Hero"
import { Experience } from "@/components/experience/Experience"
import { Projects } from "@/components/projects/Projects"
import { Contact } from "@/components/contact/Contact"
import { CustomCursor } from "@/components/ui/CustomCursor"

function App() {
  return (
    <>
      <div className="grain" />
      <CustomCursor />
      <Nav />
      <main>
        <div id="page-overview">
          <Hero />
          <Experience />
        </div>
        <div id="page-work">
          <Projects />
          <Contact />
        </div>
      </main>
    </>
  )
}

export default App
