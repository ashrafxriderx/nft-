"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { 
  Eye, 
  Edit, 
  Play, 
  Pause, 
  MoreVertical, 
  Users,
  Calendar,
  Lock,
  Unlock,
  Video,
  Music,
  FileText,
  Image,
  ExternalLink
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface GatedContent {
  id: string
  title: string
  description: string
  type: 'video' | 'audio' | 'document' | 'image' | 'link'
  thumbnail?: string
  requiredNFT: string
  accessCount: number
  totalViews: number
  createdAt: string
  status: 'active' | 'inactive'
}

interface GatedContentListProps {
  content: GatedContent[]
  onEdit: (id: string) => void
  onToggleStatus: (id: string) => void
}

export function GatedContentList({ content, onEdit, onToggleStatus }: GatedContentListProps) {
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

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'video':
        return 'text-red-500'
      case 'audio':
        return 'text-purple-500'
      case 'document':
        return 'text-blue-500'
      case 'image':
        return 'text-green-500'
      case 'link':
        return 'text-orange-500'
      default:
        return 'text-gray-500'
    }
  }

  const getStatusColor = (status: string) => {
    return status === 'active' ? 'bg-green-500' : 'bg-gray-500'
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {content.map((item) => (
        <Card key={item.id} className="group hover:shadow-lg transition-all duration-200">
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <div className={`${getTypeColor(item.type)}`}>
                    {getTypeIcon(item.type)}
                  </div>
                  <CardTitle className="text-lg">{item.title}</CardTitle>
                  <Badge 
                    variant="secondary" 
                    className={getStatusColor(item.status)}
                  >
                    {item.status === 'active' ? 'Active' : 'Inactive'}
                  </Badge>
                </div>
                <CardDescription className="line-clamp-2">
                  {item.description}
                </CardDescription>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => onEdit(item.id)}>
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Content
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Eye className="h-4 w-4 mr-2" />
                    View Details
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => onToggleStatus(item.id)}>
                    {item.status === 'active' ? (
                      <>
                        <Pause className="h-4 w-4 mr-2" />
                        Deactivate
                      </>
                    ) : (
                      <>
                        <Play className="h-4 w-4 mr-2" />
                        Activate
                      </>
                    )}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </CardHeader>

          <CardContent className="space-y-4">
            {/* Thumbnail */}
            {item.thumbnail && (
              <div className="relative aspect-video overflow-hidden rounded-lg bg-gray-100">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button 
                      variant="ghost" 
                      className="absolute inset-0 w-full h-full p-0 opacity-0 hover:opacity-100 transition-opacity"
                    >
                      <Eye className="h-8 w-8 text-white" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl">
                    <DialogHeader>
                      <DialogTitle>{item.title}</DialogTitle>
                    </DialogHeader>
                    <div className="flex justify-center">
                      <img
                        src={item.thumbnail}
                        alt={item.title}
                        className="max-w-full max-h-[70vh] object-contain rounded-lg"
                      />
                    </div>
                  </DialogContent>
                </Dialog>
                
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {/* Content Info */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-muted-foreground">Required NFT</span>
                <Badge variant="outline" className="text-xs">
                  {item.requiredNFT}
                </Badge>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-1">
                    <Users className="h-3 w-3 text-blue-500" />
                    <span className="text-xs text-muted-foreground">Access</span>
                  </div>
                  <p className="text-sm font-semibold">{item.accessCount}</p>
                </div>
                
                <div className="space-y-1">
                  <div className="flex items-center gap-1">
                    <Eye className="h-3 w-3 text-green-500" />
                    <span className="text-xs text-muted-foreground">Views</span>
                  </div>
                  <p className="text-sm font-semibold">{item.totalViews}</p>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-muted-foreground">Created</span>
                <span className="text-sm">{new Date(item.createdAt).toLocaleDateString()}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="flex-1">
                <Eye className="h-4 w-4 mr-2" />
                View
              </Button>
              <Button variant="outline" size="sm" className="flex-1">
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
} 