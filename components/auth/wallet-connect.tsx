"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/hooks/use-toast"
import { Wallet, Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"

export function WalletConnect() {
  const [isConnecting, setIsConnecting] = useState(false)
  const { toast } = useToast()
  const router = useRouter()

  const handleWalletConnect = async () => {
    setIsConnecting(true)

    // Simulate wallet connection
    setTimeout(() => {
      setIsConnecting(false)
      toast({
        title: "Wallet Connected!",
        description: "Your wallet has been connected successfully.",
      })
      router.push("/dashboard")
    }, 2000)
  }

  return (
    <div className="space-y-4">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <Separator />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
        </div>
      </div>

      <Button variant="outline" className="w-full bg-transparent" onClick={handleWalletConnect} disabled={isConnecting}>
        {isConnecting && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
        <Wallet className="w-4 h-4 mr-2" />
        Connect Wallet
      </Button>
    </div>
  )
}
