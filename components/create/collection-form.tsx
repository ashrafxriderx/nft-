"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Upload, ArrowRight, ArrowLeft } from "lucide-react"
import { useRef } from "react"

interface CollectionFormProps {
  data: any
  setData: (data: any) => void
  currentStep: number
  setCurrentStep: (step: number) => void
}

export function CreateCollectionForm({ data, setData, currentStep, setCurrentStep }: CollectionFormProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // Only accept images up to 10MB
      if (file.size > 10 * 1024 * 1024) {
        alert("File size exceeds 10MB limit.")
        return
      }
      const reader = new FileReader()
      reader.onload = (event) => {
        setData({ ...data, image: event.target?.result })
      }
      reader.readAsDataURL(file)
    }
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    const file = e.dataTransfer.files?.[0]
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        alert("File size exceeds 10MB limit.")
        return
      }
      const reader = new FileReader()
      reader.onload = (event) => {
        setData({ ...data, image: event.target?.result })
      }
      reader.readAsDataURL(file)
    }
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
  }

  const handleDeploy = async () => {
    try {
      const response = await fetch('/api/collections', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })
      const result = await response.json()
      if (response.ok) {
        alert('Collection deployed successfully!')
        // Optionally, reset form or redirect
      } else {
        alert('Failed to deploy collection: ' + (result.error || 'Unknown error'))
      }
    } catch (error) {
      alert('Failed to deploy collection: ' + (error instanceof Error ? error.message : 'Unknown error'))
    }
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Collection Name</Label>
              <Input
                id="name"
                placeholder="Enter collection name"
                value={data.name}
                onChange={(e) => setData({ ...data, name: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="symbol">Symbol</Label>
              <Input
                id="symbol"
                placeholder="e.g., CC for Cosmic Cats"
                value={data.symbol}
                onChange={(e) => setData({ ...data, symbol: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Describe your NFT collection"
                value={data.description}
                onChange={(e) => setData({ ...data, description: e.target.value })}
                rows={4}
              />
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="maxSupply">Max Supply</Label>
              <Input
                id="maxSupply"
                type="number"
                placeholder="1000"
                value={data.maxSupply}
                onChange={(e) => setData({ ...data, maxSupply: Number.parseInt(e.target.value) })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="mintPrice">Mint Price (MON)</Label>
              <Input
                id="mintPrice"
                type="number"
                step="0.01"
                placeholder="0.1"
                value={data.mintPrice}
                onChange={(e) => setData({ ...data, mintPrice: Number.parseFloat(e.target.value) })}
              />
            </div>

            <div className="space-y-2">
              <Label>Collection Image</Label>
              <div
                className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center cursor-pointer relative"
                onClick={() => fileInputRef.current?.click()}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                style={{ minHeight: 180 }}
              >
                {data.image ? (
                  <img
                    src={data.image}
                    alt="Collection preview"
                    className="mx-auto mb-4 rounded-lg object-contain"
                    style={{ maxHeight: 120, maxWidth: "100%" }}
                  />
                ) : (
                  <>
                    <Upload className="w-8 h-8 mx-auto mb-4 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">Click to upload or drag and drop</p>
                    <p className="text-xs text-muted-foreground mt-1">PNG, JPG, GIF up to 10MB</p>
                  </>
                )}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/png,image/jpeg,image/jpg,image/gif"
                  className="hidden"
                  onChange={handleImageChange}
                />
              </div>
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-lg font-semibold mb-2">Review & Deploy</h3>
              <p className="text-muted-foreground">Review your collection details before deploying to Monad</p>
            </div>

            <div className="space-y-4 p-4 bg-muted/50 rounded-lg">
              <div className="flex justify-between">
                <span className="font-medium">Name:</span>
                <span>{data.name || "Not set"}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Symbol:</span>
                <span>{data.symbol || "Not set"}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Max Supply:</span>
                <span>{data.maxSupply || "Not set"}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Mint Price:</span>
                <span>{data.mintPrice || "Not set"} MON</span>
              </div>
            </div>

            <Button className="w-full" size="lg" onClick={handleDeploy}>
              Deploy Collection
            </Button>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          Step {currentStep}:{" "}
          {currentStep === 1 ? "Basic Information" : currentStep === 2 ? "Collection Settings" : "Review & Deploy"}
        </CardTitle>
        <CardDescription>
          {currentStep === 1
            ? "Set up your collection name, symbol, and description"
            : currentStep === 2
              ? "Configure supply, pricing, and upload artwork"
              : "Review your settings and deploy to Monad"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {renderStep()}

        <div className="flex justify-between mt-8">
          <Button variant="outline" onClick={handlePrev} disabled={currentStep === 1}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Previous
          </Button>

          {currentStep < 3 && (
            <Button onClick={handleNext}>
              Next
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
