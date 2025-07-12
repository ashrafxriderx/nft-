"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  Home, 
  BarChart3, 
  Plus, 
  Users, 
  Lock, 
  Settings,
  Wallet,
  Image,
  FileText
} from "lucide-react"

export function Navigation() {
  const pathname = usePathname()

  const navigationItems = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: Home,
      description: "Overview and analytics"
    },
    {
      name: "Mint NFT",
      href: "/mint",
      icon: Plus,
      description: "Create and mint NFTs",
      badge: "New"
    },
    {
      name: "Collections",
      href: "/collections",
      icon: Image,
      description: "Manage your collections"
    },
    {
      name: "Analytics",
      href: "/analytics",
      icon: BarChart3,
      description: "Performance insights"
    },
    {
      name: "Gated Content",
      href: "/gated-content",
      icon: Lock,
      description: "Exclusive content access"
    },
    {
      name: "Whitelist",
      href: "/whitelist",
      icon: Users,
      description: "Manage early access"
    },
    {
      name: "Create Collection",
      href: "/create",
      icon: FileText,
      description: "Launch new collection"
    }
  ]

  return (
    <nav className="bg-background border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
              <Wallet className="h-5 w-5 text-white" />
            </div>
            <span className="font-bold text-xl">NFT Terminal</span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-1">
            {navigationItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link key={item.href} href={item.href}>
                  <Button
                    variant={isActive ? "default" : "ghost"}
                    className="relative"
                  >
                    <item.icon className="h-4 w-4 mr-2" />
                    {item.name}
                    {item.badge && (
                      <Badge variant="secondary" className="ml-2 text-xs">
                        {item.badge}
                      </Badge>
                    )}
                  </Button>
                </Link>
              )
            })}
          </div>

          {/* Mobile Menu */}
          <div className="md:hidden">
            <Button variant="ghost" size="sm">
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </nav>
  )
} 