import HeroSection from '@/components/sections/HeroSection'
import AboutSection from '@/components/sections/AboutSection'
import ProjectsSection from '@/components/sections/ProjectsSection'
import SkillsSection from '@/components/sections/SkillsSection'
import EducationSection from '@/components/sections/EducationSection'
import CertificatesSection from '@/components/sections/CertificatesSection'
import ContactSection from '@/components/sections/ContactSection'

export default function Home() {
  return (
    <main className="relative">
      <section id="home">
        <HeroSection />
      </section>

      <section id="about">
        <AboutSection />
      </section>

      <section id="skills">
        <SkillsSection />
      </section>

      <section id="education">
        <EducationSection />
      </section>

      <section id="projects">
        <ProjectsSection />
      </section>

      <section id="certificates">
        <CertificatesSection />
      </section>

      <section id="contact">
        <ContactSection />
      </section>
    </main>
  )
}