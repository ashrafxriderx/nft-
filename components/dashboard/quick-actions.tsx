import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, BarChart3, Settings, Code } from "lucide-react"
import Link from "next/link"

export function QuickActions() {
  const actions = [
    {
      icon: Plus,
      title: "Create Collection",
      description: "Launch a new NFT collection",
      href: "/create",
      color: "bg-blue-500",
    },
    {
      icon: BarChart3,
      title: "View Analytics",
      description: "Detailed performance metrics",
      href: "/analytics",
      color: "bg-green-500",
    },
    {
      icon: Code,
      title: "Token Gating",
      description: "Generate access code snippets",
      href: "/gating",
      color: "bg-purple-500",
    },
    {
      icon: Settings,
      title: "Settings",
      description: "Configure your account",
      href: "/settings",
      color: "bg-orange-500",
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
        <CardDescription>Common tasks and shortcuts</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-3">
          {actions.map((action, index) => (
            <Link key={index} href={action.href}>
              <Button variant="ghost" className="w-full justify-start h-auto p-4">
                <div className={`${action.color} rounded-lg p-2 mr-3`}>
                  <action.icon className="w-4 h-4 text-white" />
                </div>
                <div className="text-left">
                  <div className="font-medium">{action.title}</div>
                  <div className="text-sm text-muted-foreground">{action.description}</div>
                </div>
              </Button>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
