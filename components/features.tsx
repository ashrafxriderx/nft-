import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Code, Zap, BarChart3, Shield, Palette, Users } from "lucide-react"

const features = [
  {
    icon: Code,
    title: "No-Code Deployment",
    description:
      "Artists and influencers can deploy mint contracts, manage allowlists, and launch collections without touching code.",
    badge: "Easy Setup",
  },
  {
    icon: Zap,
    title: "Unified Workflow",
    description:
      "Everything — minting, whitelisting, analytics, and token gating — is handled in a single, streamlined dashboard.",
    badge: "All-in-One",
  },
  {
    icon: Shield,
    title: "Token Gating Made Simple",
    description:
      "Creators get auto-generated code snippets to restrict access to gated content based on NFT ownership.",
    badge: "Secure",
  },
  {
    icon: BarChart3,
    title: "Built-In Holder Analytics",
    description:
      "Track key metrics like holder count, mint volume, and whale concentration to better engage communities.",
    badge: "Insights",
  },
  {
    icon: Palette,
    title: "Monad Powered",
    description:
      "Leverages Monad's high throughput and near-zero gas fees to ensure scalable, affordable launches without congestion.",
    badge: "Fast & Cheap",
  },
  {
    icon: Users,
    title: "Creator Economy",
    description:
      "Built specifically for the creator economy with tools designed for artists, influencers, and content creators.",
    badge: "Creator-First",
  },
]

export function Features() {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose NFT Terminal?</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            NFT Terminal solves key challenges faced by NFT creators with powerful, easy-to-use tools.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <Card key={index} className="relative overflow-hidden group hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <div className="flex items-center justify-between mb-4">
                  <div className="bg-primary/10 rounded-lg p-3">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <Badge variant="secondary">{feature.badge}</Badge>
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed">{feature.description}</CardDescription>
              </CardContent>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
