"use client"

import { useState } from "react"
import { AuthForm } from "@/components/auth/auth-form"
import { WalletConnect } from "@/components/auth/wallet-connect"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Zap } from "lucide-react"

export default function AuthPage() {
  const [authMode, setAuthMode] = useState<"signin" | "signup">("signin")

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-950 dark:to-blue-950 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-primary rounded-lg p-2">
              <Zap className="w-6 h-6 text-primary-foreground" />
            </div>
          </div>
          <CardTitle className="text-2xl">Welcome to NFT Terminal</CardTitle>
          <CardDescription>The no-code NFT launchpad on Monad</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={authMode} onValueChange={(value) => setAuthMode(value as "signin" | "signup")}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="signin">Sign In</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>
            <TabsContent value="signin" className="space-y-4">
              <AuthForm mode="signin" />
              <WalletConnect />
            </TabsContent>
            <TabsContent value="signup" className="space-y-4">
              <AuthForm mode="signup" />
              <WalletConnect />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
