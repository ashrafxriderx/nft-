"use client"

import { useState, useEffect } from "react"

interface User {
  id: string
  email: string
  wallet?: string
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate auth check
    const timer = setTimeout(() => {
      // For demo purposes, assume user is logged in
      setUser({
        id: "1",
        email: "demo@nftterminal.com",
        wallet: "0x1234...5678",
      })
      setLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  return { user, loading }
}
