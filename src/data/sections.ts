export type SectionDef = {
  id: string
  label: string
  index: string
}

export const sections: SectionDef[] = [
  { id: "home", label: "Home", index: "00" },
  { id: "about", label: "About", index: "01" },
  { id: "experience", label: "Experience", index: "02" },
  { id: "projects", label: "Projects", index: "03" },
  { id: "engineering", label: "Engineering", index: "04" },
  { id: "contact", label: "Contact", index: "05" },
]
