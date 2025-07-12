"use client"

import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Bell, Plus, Settings, Zap } from "lucide-react"
import Link from "next/link"

export function DashboardHeader() {
  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/" className="flex items-center space-x-2">
              <div className="bg-primary rounded-lg p-2">
                <Zap className="w-6 h-6 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold">NFT Terminal</span>
            </Link>
            <Badge variant="secondary">Dashboard</Badge>
          </div>

          <div className="flex items-center space-x-4">
            <Link href="/create">
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Create Collection
              </Button>
            </Link>
            <Link href="/notifications">
              <Button variant="ghost" size="icon">
                <Bell className="w-5 h-5" />
              </Button>
            </Link>
            <Link href="/settings">
              <Button variant="ghost" size="icon">
                <Settings className="w-5 h-5" />
              </Button>
            </Link>
            <Link href="/profile">
              <Avatar>
                <AvatarImage src="/placeholder-user.jpg" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}
