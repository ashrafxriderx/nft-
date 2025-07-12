"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Zap, Sparkles } from "lucide-react"
import Link from "next/link"

export function Hero() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 dark:from-purple-950 dark:via-blue-950 dark:to-indigo-950 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      <div className="container mx-auto px-4 text-center relative z-10">
        <div
          className={`transition-all duration-1000 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <Badge variant="secondary" className="mb-6 px-4 py-2">
            <Sparkles className="w-4 h-4 mr-2" />
            Powered by Monad Blockchain
          </Badge>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            NFT Terminal
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            The all-in-one NFT launchpad on Monad for creators, influencers, and artists.
            <span className="block mt-2 font-semibold text-foreground">
              Launch fast, grow smart — mint, gate, analyze, and scale on Monad.
            </span>
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Link href="/auth">
              <Button size="lg" className="px-8 py-6 text-lg">
                <Zap className="w-5 h-5 mr-2" />
                Launch Your NFT
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="px-8 py-6 text-lg bg-transparent">
              View Demo
            </Button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">2.8K+</div>
              <div className="text-sm text-muted-foreground">NFTs Minted</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">150+</div>
              <div className="text-sm text-muted-foreground">Collections</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-indigo-600">45.6 MON</div>
              <div className="text-sm text-muted-foreground">Total Volume</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">1.2K+</div>
              <div className="text-sm text-muted-foreground">Active Users</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
