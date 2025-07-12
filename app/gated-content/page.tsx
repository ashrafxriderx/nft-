"use client"

import { useState, useEffect } from "react"
import { GatedContentList } from "@/components/gated-content/gated-content-list"
import { CreateGatedContent } from "@/components/gated-content/create-gated-content"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  Lock, 
  Unlock, 
  Plus, 
  Users, 
  FileText, 
  Video, 
  Music, 
  Image,
  Settings,
  Eye
} from "lucide-react"

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

const formatDate = (dateStr: string) => {
  const d = new Date(dateStr);
  return `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}`; // MM/DD/YYYY
};

export default function GatedContentPage() {
  const [activeTab, setActiveTab] = useState("all")
  const [showCreateForm, setShowCreateForm] = useState(false)

  // --- Demo: Dynamic stats ---
  const [stats, setStats] = useState({
    totalContent: 4,
    activeContent: 3,
    totalAccess: 313,
    totalViews: 577,
  })

  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => ({
        totalContent: prev.totalContent, // static for demo
        activeContent: prev.activeContent, // static for demo
        totalAccess: prev.totalAccess + Math.floor(Math.random() * 5),
        totalViews: prev.totalViews + Math.floor(Math.random() * 10),
      }))
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const sampleContent: GatedContent[] = [
    {
      id: "1",
      title: "Exclusive Behind-the-Scenes Video",
      description: "Watch the making of our latest NFT collection",
      type: "video",
      thumbnail: "/images/gated1.jpg",
      requiredNFT: "Cosmic Cats #1-100",
      accessCount: 45,
      totalViews: 120,
      createdAt: "2024-01-15",
      status: "active"
    },
    {
      id: "2",
      title: "Private Discord Access",
      description: "Join our exclusive community channel",
      type: "link",
      requiredNFT: "Digital Dreams Collection",
      accessCount: 89,
      totalViews: 156,
      createdAt: "2024-01-10",
      status: "active"
    },
    {
      id: "3",
      title: "Early Access Whitelist",
      description: "Get priority access to upcoming drops",
      type: "document",
      requiredNFT: "Neon Nights #1-50",
      accessCount: 23,
      totalViews: 67,
      createdAt: "2024-01-20",
      status: "active"
    },
    {
      id: "4",
      title: "Exclusive Artwork Download",
      description: "High-resolution versions of your NFTs",
      type: "image",
      thumbnail: "/images/gated2.jpg",
      requiredNFT: "Pixel Warriors Collection",
      accessCount: 156,
      totalViews: 234,
      createdAt: "2024-01-05",
      status: "inactive"
    }
  ]

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
        return <Eye className="h-4 w-4" />
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

  const totalStats = {
    totalContent: stats.totalContent,
    activeContent: stats.activeContent,
    totalAccess: stats.totalAccess,
    totalViews: stats.totalViews
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-4xl font-bold tracking-tight">Gated Content</h1>
              <p className="text-muted-foreground mt-2">
                Manage exclusive content accessible only to NFT holders
              </p>
            </div>
            <Button onClick={() => setShowCreateForm(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Create Gated Content
            </Button>
          </div>

          {/* Stats Cards */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <Lock className="h-4 w-4 text-blue-500" />
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Total Content</p>
                    <p className="text-2xl font-bold">{totalStats.totalContent}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <Unlock className="h-4 w-4 text-green-500" />
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Active Content</p>
                    <p className="text-2xl font-bold">{totalStats.activeContent}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <Users className="h-4 w-4 text-purple-500" />
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Total Access</p>
                    <p className="text-2xl font-bold">{totalStats.totalAccess}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <Eye className="h-4 w-4 text-orange-500" />
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Total Views</p>
                    <p className="text-2xl font-bold">{totalStats.totalViews}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all">All Content</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="video">Videos</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-6">
            <GatedContentList 
              content={sampleContent} 
              onEdit={(id) => console.log('Edit content:', id)}
              onToggleStatus={(id) => console.log('Toggle status:', id)}
            />
          </TabsContent>

          <TabsContent value="active" className="mt-6">
            <GatedContentList 
              content={sampleContent.filter(c => c.status === 'active')} 
              onEdit={(id) => console.log('Edit content:', id)}
              onToggleStatus={(id) => console.log('Toggle status:', id)}
            />
          </TabsContent>

          <TabsContent value="video" className="mt-6">
            <GatedContentList 
              content={sampleContent.filter(c => c.type === 'video')} 
              onEdit={(id) => console.log('Edit content:', id)}
              onToggleStatus={(id) => console.log('Toggle status:', id)}
            />
          </TabsContent>

          <TabsContent value="documents" className="mt-6">
            <GatedContentList 
              content={sampleContent.filter(c => c.type === 'document')} 
              onEdit={(id) => console.log('Edit content:', id)}
              onToggleStatus={(id) => console.log('Toggle status:', id)}
            />
          </TabsContent>
        </Tabs>

        {/* Create Form Dialog */}
        {showCreateForm && (
          <CreateGatedContent 
            onClose={() => setShowCreateForm(false)}
            onSubmit={(data) => {
              console.log('Create gated content:', data)
              setShowCreateForm(false)
            }}
          />
        )}
      </div>
    </div>
  )
} 