"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Eye, ZoomIn, Download, Share2, Info } from "lucide-react"

interface ImagePreviewProps {
  image: File | null
}

export function ImagePreview({ image }: ImagePreviewProps) {
  const [isZoomed, setIsZoomed] = useState(false)
  const [previewUrl, setPreviewUrl] = useState<string>("")

  // Use useEffect to update previewUrl when image changes
  useEffect(() => {
    if (image) {
      const url = URL.createObjectURL(image)
      setPreviewUrl(url)
      return () => URL.revokeObjectURL(url)
    } else {
      setPreviewUrl("")
    }
  }, [image])

  if (!image) {
    return (
      <div className="flex items-center justify-center h-64 bg-gray-100 rounded-lg border-2 border-dashed border-gray-300">
        <div className="text-center">
          <Eye className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <p className="text-gray-500">Upload an image to see preview</p>
        </div>
      </div>
    )
  }

  const handleDownload = () => {
    if (previewUrl) {
      const link = document.createElement('a')
      link.href = previewUrl
      link.download = image.name
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }

  const handleShare = async () => {
    if (navigator.share && image) {
      try {
        await navigator.share({
          title: image.name,
          text: 'Check out this NFT!',
          files: [image]
        })
      } catch (error) {
        console.log('Error sharing:', error)
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(previewUrl)
    }
  }

  return (
    <div className="space-y-4">
      {/* Main Preview */}
      <div className="relative group">
        <div className="relative overflow-hidden rounded-lg border bg-gray-50">
          {previewUrl && (
            <img
              src={previewUrl}
              alt={image.name}
              className={`w-full h-auto transition-transform duration-300 ${
                isZoomed ? 'scale-110' : 'scale-100'
              }`}
              onMouseEnter={() => setIsZoomed(true)}
              onMouseLeave={() => setIsZoomed(false)}
            />
          )}
          
          {/* Overlay with actions */}
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
            <div className="flex gap-2">
              <Dialog>
                <DialogTrigger asChild>
                  <Button size="sm" variant="secondary">
                    <ZoomIn className="h-4 w-4" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl">
                  <DialogHeader>
                    <DialogTitle>NFT Preview - {image.name}</DialogTitle>
                  </DialogHeader>
                  <div className="flex justify-center">
                    {previewUrl && (
                      <img
                        src={previewUrl}
                        alt={image.name}
                        className="max-w-full max-h-[70vh] object-contain"
                      />
                    )}
                  </div>
                </DialogContent>
              </Dialog>
              
              <Button size="sm" variant="secondary" onClick={handleDownload}>
                <Download className="h-4 w-4" />
              </Button>
              
              <Button size="sm" variant="secondary" onClick={handleShare}>
                <Share2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Image Info */}
      <Card>
        <CardContent className="pt-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">File Name</span>
              <span className="text-sm text-gray-600">{image.name}</span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">File Size</span>
              <span className="text-sm text-gray-600">
                {(image.size / 1024 / 1024).toFixed(2)} MB
              </span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">File Type</span>
              <Badge variant="outline">{image.type}</Badge>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Last Modified</span>
              <span className="text-sm text-gray-600">
                {new Date(image.lastModified).toLocaleDateString()}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* NFT Metadata Preview */}
      <Card>
        <CardContent className="pt-4">
          <div className="flex items-center gap-2 mb-3">
            <Info className="h-4 w-4" />
            <span className="text-sm font-medium">NFT Metadata Preview</span>
          </div>
          
          <div className="bg-gray-50 rounded p-3 text-xs font-mono">
            <pre className="whitespace-pre-wrap">
{`{
  "name": "Your NFT Name",
  "description": "Your NFT Description",
  "image": "ipfs://...",
  "attributes": [
    {
      "trait_type": "Background",
      "value": "Blue"
    },
    {
      "trait_type": "Rarity",
      "value": "Legendary"
    }
  ]
}`}
            </pre>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 