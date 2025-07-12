import { Hero } from "@/components/hero"
import { Features } from "@/components/features"
import { TechStack } from "@/components/tech-stack"
import { CTA } from "@/components/cta"

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Hero />
      <Features />
      <TechStack />
      <CTA />
    </main>
  )
}
