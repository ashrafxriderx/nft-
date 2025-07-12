"use client"

import { useState } from "react"
import { MintingForm } from "@/components/mint/minting-form"
import { ImagePreview } from "@/components/mint/image-preview"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Wallet, Image, Settings, BarChart3 } from "lucide-react"

export default function MintPage() {
  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const [mintingStatus, setMintingStatus] = useState<'idle' | 'minting' | 'success' | 'error'>('idle')

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold tracking-tight">Mint Your NFT</h1>
          <p className="text-muted-foreground mt-2">
            Create and mint your unique NFT with our easy-to-use platform
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Left Column - Minting Form */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Wallet className="h-5 w-5" />
                  Mint New NFT
                </CardTitle>
                <CardDescription>
                  Upload your image and fill in the details to create your NFT
                </CardDescription>
              </CardHeader>
              <CardContent>
                <MintingForm 
                  onImageSelect={setSelectedImage}
                  onMintingStatusChange={setMintingStatus}
                />
              </CardContent>
            </Card>

            {/* Minting Status */}
            {mintingStatus !== 'idle' && (
              <Card>
                <CardHeader>
                  <CardTitle>Minting Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2">
                    {mintingStatus === 'minting' && (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
                        <span>Minting your NFT...</span>
                      </>
                    )}
                    {mintingStatus === 'success' && (
                      <>
                        <Badge variant="default" className="bg-green-500">
                          Success
                        </Badge>
                        <span>Your NFT has been minted successfully!</span>
                      </>
                    )}
                    {mintingStatus === 'error' && (
                      <>
                        <Badge variant="destructive">Error</Badge>
                        <span>Failed to mint NFT. Please try again.</span>
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Right Column - Preview and Features */}
          <div className="space-y-6">
            {/* Image Preview */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Image className="h-5 w-5" />
                  Image Preview
                </CardTitle>
                <CardDescription>
                  Preview your NFT before minting
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ImagePreview image={selectedImage} />
              </CardContent>
            </Card>

            {/* Features Overview */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  NFT Features
                </CardTitle>
                <CardDescription>
                  What you get with your minted NFT
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="features" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="features">Features</TabsTrigger>
                    <TabsTrigger value="benefits">Benefits</TabsTrigger>
                    <TabsTrigger value="analytics">Analytics</TabsTrigger>
                  </TabsList>
                  <TabsContent value="features" className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary">✓</Badge>
                        <span className="text-sm">Unique token ID</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary">✓</Badge>
                        <span className="text-sm">Metadata storage</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary">✓</Badge>
                        <span className="text-sm">IPFS decentralized storage</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary">✓</Badge>
                        <span className="text-sm">Blockchain verification</span>
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="benefits" className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary">🎁</Badge>
                        <span className="text-sm">Exclusive content access</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary">🎁</Badge>
                        <span className="text-sm">Community membership</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary">🎁</Badge>
                        <span className="text-sm">Future airdrops</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary">🎁</Badge>
                        <span className="text-sm">Trading rights</span>
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="analytics" className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <BarChart3 className="h-4 w-4" />
                        <span className="text-sm">Real-time price tracking</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <BarChart3 className="h-4 w-4" />
                        <span className="text-sm">Transaction history</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <BarChart3 className="h-4 w-4" />
                        <span className="text-sm">Holder analytics</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <BarChart3 className="h-4 w-4" />
                        <span className="text-sm">Market performance</span>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
} 