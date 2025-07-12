"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { 
  Eye, 
  Edit, 
  Pause, 
  Play, 
  MoreVertical, 
  TrendingUp,
  Users,
  DollarSign,
  Calendar,
  ExternalLink
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface Collection {
  id: string
  name: string
  description: string
  image: string
  creator: string
  totalSupply: number
  minted: number
  floorPrice: number
  totalVolume: number
  holders: number
  status: 'active' | 'paused' | 'completed'
  category: string
  createdAt: string
}

interface CollectionCardProps {
  collection: Collection
}

export function CollectionCard({ collection }: CollectionCardProps) {
  const [isImageLoaded, setIsImageLoaded] = useState(false)

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-500'
      case 'paused':
        return 'bg-yellow-500'
      case 'completed':
        return 'bg-blue-500'
      default:
        return 'bg-gray-500'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active':
        return 'Active'
      case 'paused':
        return 'Paused'
      case 'completed':
        return 'Completed'
      default:
        return 'Unknown'
    }
  }

  const mintProgress = (collection.minted / collection.totalSupply) * 100

  return (
    <Card className="group hover:shadow-lg transition-all duration-200">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <CardTitle className="text-lg">{collection.name}</CardTitle>
              <Badge 
                variant="secondary" 
                className={getStatusColor(collection.status)}
              >
                {getStatusText(collection.status)}
              </Badge>
            </div>
            <CardDescription className="line-clamp-2">
              {collection.description}
            </CardDescription>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Edit className="h-4 w-4 mr-2" />
                Edit Collection
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Eye className="h-4 w-4 mr-2" />
                View Details
              </DropdownMenuItem>
              {collection.status === 'active' && (
                <DropdownMenuItem>
                  <Pause className="h-4 w-4 mr-2" />
                  Pause Minting
                </DropdownMenuItem>
              )}
              {collection.status === 'paused' && (
                <DropdownMenuItem>
                  <Play className="h-4 w-4 mr-2" />
                  Resume Minting
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Image with Dialog */}
        <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-100">
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
                <DialogTitle>{collection.name}</DialogTitle>
              </DialogHeader>
              <div className="flex justify-center">
                <img
                  src={collection.image}
                  alt={collection.name}
                  className="max-w-full max-h-[70vh] object-contain rounded-lg"
                  onLoad={() => setIsImageLoaded(true)}
                />
              </div>
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Creator</p>
                  <p className="text-sm">{collection.creator}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Category</p>
                  <p className="text-sm capitalize">{collection.category}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Created</p>
                  <p className="text-sm">{new Date(collection.createdAt).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Status</p>
                  <Badge variant="secondary" className={getStatusColor(collection.status)}>
                    {getStatusText(collection.status)}
                  </Badge>
                </div>
              </div>
            </DialogContent>
          </Dialog>
          
          <img
            src={collection.image}
            alt={collection.name}
            className={`w-full h-full object-cover transition-opacity duration-300 ${
              isImageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={() => setIsImageLoaded(true)}
          />
          
          {!isImageLoaded && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          )}
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-1">
              <TrendingUp className="h-3 w-3 text-green-500" />
              <span className="text-xs text-muted-foreground">Minted</span>
            </div>
            <p className="text-sm font-semibold">
              {collection.minted.toLocaleString()} / {collection.totalSupply.toLocaleString()}
            </p>
            <div className="w-full bg-gray-200 rounded-full h-1">
              <div 
                className="bg-green-500 h-1 rounded-full transition-all duration-300"
                style={{ width: `${mintProgress}%` }}
              ></div>
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-1">
              <DollarSign className="h-3 w-3 text-yellow-500" />
              <span className="text-xs text-muted-foreground">Floor Price</span>
            </div>
            <p className="text-sm font-semibold">{collection.floorPrice} ETH</p>
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-1">
              <DollarSign className="h-3 w-3 text-blue-500" />
              <span className="text-xs text-muted-foreground">Volume</span>
            </div>
            <p className="text-sm font-semibold">{collection.totalVolume} ETH</p>
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-1">
              <Users className="h-3 w-3 text-purple-500" />
              <span className="text-xs text-muted-foreground">Holders</span>
            </div>
            <p className="text-sm font-semibold">{collection.holders.toLocaleString()}</p>
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
  )
} 