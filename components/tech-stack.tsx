import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const techStack = [
  {
    category: "Frontend",
    technologies: ["React", "Next.js", "TailwindCSS"],
    color: "bg-blue-500",
  },
  {
    category: "Wallet Integration",
    technologies: ["Ethers.js", "wagmi", "viem"],
    color: "bg-purple-500",
  },
  {
    category: "Backend",
    technologies: ["Node.js", "Vercel Serverless Functions"],
    color: "bg-green-500",
  },
  {
    category: "Smart Contracts",
    technologies: ["Solidity", "Hardhat", "Foundry", "OpenZeppelin (ERC-721/ERC721A)"],
    color: "bg-orange-500",
  },
  {
    category: "Blockchain",
    technologies: ["Monad Testnet/Mainnet (EVM-compatible)"],
    color: "bg-red-500",
  },
  {
    category: "Database",
    technologies: ["PostgreSQL", "Supabase"],
    color: "bg-indigo-500",
  },
  {
    category: "Analytics",
    technologies: ["Envio (Custom indexers)", "real-time event tracking"],
    color: "bg-pink-500",
  },
  {
    category: "AI Tools",
    technologies: ["GPT-4", "Claude", "Galileo AI", "v0"],
    color: "bg-cyan-500",
  },
]

export function TechStack() {
  return (
    <section className="py-24 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Built with Modern Tech Stack</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Leveraging cutting-edge technologies to deliver a seamless, scalable, and secure NFT launchpad experience.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {techStack.map((stack, index) => (
            <Card key={index} className="relative overflow-hidden">
              <CardHeader className="pb-3">
                <div className={`w-full h-1 ${stack.color} rounded-full mb-4`} />
                <CardTitle className="text-lg">{stack.category}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {stack.technologies.map((tech, techIndex) => (
                    <Badge key={techIndex} variant="secondary" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
