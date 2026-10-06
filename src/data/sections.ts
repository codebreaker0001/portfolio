export type SectionDef = {
  id: string
  label: string
  index: string
}

export const sections: SectionDef[] = [
  { id: "home", label: "Home", index: "00" },
  { id: "experience", label: "Experience", index: "02" },
  { id: "projects", label: "Projects", index: "03" },
  { id: "contact", label: "Contact", index: "05" },
]
