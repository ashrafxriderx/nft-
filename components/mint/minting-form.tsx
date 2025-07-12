"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Upload, Image, X, Eye } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface MintingFormProps {
  onImageSelect: (file: File | null) => void
  onMintingStatusChange: (status: 'idle' | 'minting' | 'success' | 'error') => void
}

export function MintingForm({ onImageSelect, onMintingStatusChange }: MintingFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    supply: "1",
    traits: [] as Array<{ trait_type: string; value: string }>
  })
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string>("")
  const [newTrait, setNewTrait] = useState({ trait_type: "", value: "" })
  const { toast } = useToast()

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        toast({
          title: "Invalid file type",
          description: "Please select an image file (JPEG, PNG, GIF, etc.)",
          variant: "destructive"
        })
        return
      }

      // Validate file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Please select an image smaller than 10MB",
          variant: "destructive"
        })
        return
      }

      setSelectedFile(file)
      onImageSelect(file)
      
      // Create preview URL
      const url = URL.createObjectURL(file)
      setPreviewUrl(url)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const addTrait = () => {
    if (newTrait.trait_type && newTrait.value) {
      setFormData(prev => ({
        ...prev,
        traits: [...prev.traits, { ...newTrait }]
      }))
      setNewTrait({ trait_type: "", value: "" })
    }
  }

  const removeTrait = (index: number) => {
    setFormData(prev => ({
      ...prev,
      traits: prev.traits.filter((_, i) => i !== index)
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!selectedFile) {
      toast({
        title: "No image selected",
        description: "Please upload an image for your NFT",
        variant: "destructive"
      })
      return
    }

    if (!formData.name || !formData.description) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields",
        variant: "destructive"
      })
      return
    }

    onMintingStatusChange('minting')

    try {
      // Simulate minting process
      await new Promise(resolve => setTimeout(resolve, 3000))
      
      // Here you would typically:
      // 1. Upload image to IPFS
      // 2. Create metadata JSON
      // 3. Upload metadata to IPFS
      // 4. Call smart contract to mint NFT
      
      onMintingStatusChange('success')
      toast({
        title: "NFT Minted Successfully!",
        description: "Your NFT has been created and is now live on the blockchain",
      })
    } catch (error) {
      onMintingStatusChange('error')
      toast({
        title: "Minting Failed",
        description: "There was an error minting your NFT. Please try again.",
        variant: "destructive"
      })
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Image Upload */}
      <div className="space-y-2">
        <Label htmlFor="image">NFT Image *</Label>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-primary transition-colors">
          <input
            type="file"
            id="image"
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
          />
          <label htmlFor="image" className="cursor-pointer">
            {!selectedFile ? (
              <div className="space-y-2">
                <Upload className="mx-auto h-8 w-8 text-gray-400" />
                <p className="text-sm text-gray-600">
                  Click to upload or drag and drop
                </p>
                <p className="text-xs text-gray-500">
                  PNG, JPG, GIF up to 10MB
                </p>
              </div>
            ) : (
              <div className="space-y-2">
                <Image className="mx-auto h-8 w-8 text-green-500" />
                <p className="text-sm text-gray-600">
                  {selectedFile.name}
                </p>
                <p className="text-xs text-gray-500">
                  {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
            )}
          </label>
        </div>
      </div>

      {/* Basic Information */}
      <div className="space-y-4">
        <div>
          <Label htmlFor="name">NFT Name *</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            placeholder="Enter your NFT name"
            required
          />
        </div>

        <div>
          <Label htmlFor="description">Description *</Label>
          <Textarea
            id="description"
            value={formData.description}
            onChange={(e) => handleInputChange('description', e.target.value)}
            placeholder="Describe your NFT"
            rows={3}
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="price">Price (ETH)</Label>
            <Input
              id="price"
              type="number"
              step="0.01"
              value={formData.price}
              onChange={(e) => handleInputChange('price', e.target.value)}
              placeholder="0.01"
            />
          </div>
          <div>
            <Label htmlFor="supply">Supply</Label>
            <Input
              id="supply"
              type="number"
              min="1"
              value={formData.supply}
              onChange={(e) => handleInputChange('supply', e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Traits */}
      <div className="space-y-4">
        <Label>Traits (Optional)</Label>
        <div className="space-y-3">
          {formData.traits.map((trait, index) => (
            <div key={index} className="flex items-center gap-2">
              <Badge variant="secondary" className="flex-1">
                {trait.trait_type}: {trait.value}
              </Badge>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => removeTrait(index)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
          
          <div className="flex gap-2">
            <Input
              placeholder="Trait type"
              value={newTrait.trait_type}
              onChange={(e) => setNewTrait(prev => ({ ...prev, trait_type: e.target.value }))}
            />
            <Input
              placeholder="Value"
              value={newTrait.value}
              onChange={(e) => setNewTrait(prev => ({ ...prev, value: e.target.value }))}
            />
            <Button type="button" onClick={addTrait} size="sm">
              Add
            </Button>
          </div>
        </div>
      </div>

      {/* Mint Button */}
      <Button type="submit" className="w-full" size="lg">
        Mint NFT
      </Button>
    </form>
  )
} 