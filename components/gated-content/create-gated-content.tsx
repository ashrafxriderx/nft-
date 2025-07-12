"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Upload, X, Eye, Video, Music, FileText, Image, ExternalLink } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface CreateGatedContentProps {
  onClose: () => void
  onSubmit: (data: any) => void
}

export function CreateGatedContent({ onClose, onSubmit }: CreateGatedContentProps) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    type: "video" as 'video' | 'audio' | 'document' | 'image' | 'link',
    contentUrl: "",
    requiredNFT: "",
    thumbnail: null as File | null
  })
  const [previewUrl, setPreviewUrl] = useState<string>("")
  const { toast } = useToast()

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      if (!file.type.startsWith('image/')) {
        toast({
          title: "Invalid file type",
          description: "Please select an image file for the thumbnail",
          variant: "destructive"
        })
        return
      }

      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Please select an image smaller than 5MB",
          variant: "destructive"
        })
        return
      }

      setFormData(prev => ({ ...prev, thumbnail: file }))
      const url = URL.createObjectURL(file)
      setPreviewUrl(url)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.title || !formData.description || !formData.requiredNFT) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields",
        variant: "destructive"
      })
      return
    }

    onSubmit({
      ...formData,
      id: Date.now().toString(),
      accessCount: 0,
      totalViews: 0,
      createdAt: new Date().toISOString(),
      status: 'active'
    })
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'video':
        return <Video className="h-4 w-4" />
      case 'audio':
        return <Music className="h-4 w-4" />
      case 'document':
        return <FileText className="h-4 w-4" />
      case 'image':
        return <Image className="h-4 w-4" />
      case 'link':
        return <ExternalLink className="h-4 w-4" />
      default:
        return <FileText className="h-4 w-4" />
    }
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create Gated Content</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="title">Content Title *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                placeholder="Enter content title"
                required
              />
            </div>

            <div>
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Describe your gated content"
                rows={3}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="type">Content Type *</Label>
                <Select
                  value={formData.type}
                  onValueChange={(value: any) => setFormData(prev => ({ ...prev, type: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="video">
                      <div className="flex items-center gap-2">
                        <Video className="h-4 w-4" />
                        Video
                      </div>
                    </SelectItem>
                    <SelectItem value="audio">
                      <div className="flex items-center gap-2">
                        <Music className="h-4 w-4" />
                        Audio
                      </div>
                    </SelectItem>
                    <SelectItem value="document">
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4" />
                        Document
                      </div>
                    </SelectItem>
                    <SelectItem value="image">
                      <div className="flex items-center gap-2">
                        <Image className="h-4 w-4" />
                        Image
                      </div>
                    </SelectItem>
                    <SelectItem value="link">
                      <div className="flex items-center gap-2">
                        <ExternalLink className="h-4 w-4" />
                        Link
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="requiredNFT">Required NFT *</Label>
                <Input
                  id="requiredNFT"
                  value={formData.requiredNFT}
                  onChange={(e) => setFormData(prev => ({ ...prev, requiredNFT: e.target.value }))}
                  placeholder="e.g., Cosmic Cats #1-100"
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="contentUrl">Content URL *</Label>
              <Input
                id="contentUrl"
                value={formData.contentUrl}
                onChange={(e) => setFormData(prev => ({ ...prev, contentUrl: e.target.value }))}
                placeholder="https://..."
                required
              />
            </div>
          </div>

          {/* Thumbnail Upload */}
          <div className="space-y-4">
            <Label>Thumbnail (Optional)</Label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-primary transition-colors">
              <input
                type="file"
                id="thumbnail"
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
              />
              <label htmlFor="thumbnail" className="cursor-pointer">
                {!formData.thumbnail ? (
                  <div className="space-y-2">
                    <Upload className="mx-auto h-8 w-8 text-gray-400" />
                    <p className="text-sm text-gray-600">
                      Click to upload thumbnail
                    </p>
                    <p className="text-xs text-gray-500">
                      PNG, JPG up to 5MB
                    </p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <div className="relative inline-block">
                      <img
                        src={previewUrl}
                        alt="Thumbnail preview"
                        className="h-20 w-20 object-cover rounded mx-auto"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute -top-2 -right-2 h-6 w-6 p-0"
                        onClick={() => {
                          setFormData(prev => ({ ...prev, thumbnail: null }))
                          setPreviewUrl("")
                        }}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                    <p className="text-sm text-gray-600">
                      {formData.thumbnail.name}
                    </p>
                  </div>
                )}
              </label>
            </div>
          </div>

          {/* Preview */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Content Preview</CardTitle>
              <CardDescription>
                How your gated content will appear
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  {getTypeIcon(formData.type)}
                  <span className="font-medium">{formData.title || "Your Content Title"}</span>
                  <Badge variant="secondary">Active</Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  {formData.description || "Your content description will appear here"}
                </p>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground">Required NFT:</span>
                  <Badge variant="outline" className="text-xs">
                    {formData.requiredNFT || "Select NFT"}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex gap-2 justify-end">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              Create Content
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
} 