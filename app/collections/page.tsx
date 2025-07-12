"use client"

import { useState, useEffect } from "react"
import { CollectionCard } from "@/components/collections/collection-card"
import { CollectionGrid } from "@/components/collections/collection-grid"
import { CollectionFilters } from "@/components/collections/collection-filters"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Plus, 
  Search, 
  Filter, 
  Grid3X3, 
  List, 
  TrendingUp,
  Users,
  DollarSign,
  Eye
} from "lucide-react"

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

export default function CollectionsPage() {
  const [collections, setCollections] = useState<Collection[]>([])
  const [filteredCollections, setFilteredCollections] = useState<Collection[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [loading, setLoading] = useState(true)

  // Sample data
  useEffect(() => {
    const sampleCollections: Collection[] = [
      {
        id: "1",
        name: "Cosmic Cats",
        description: "A collection of 10,000 unique cosmic cats exploring the universe",
        image: "/images/collection1.jpg",
        creator: "0x1234...5678",
        totalSupply: 10000,
        minted: 8500,
        floorPrice: 0.05,
        totalVolume: 425,
        holders: 3200,
        status: 'active',
        category: 'art',
        createdAt: '2024-01-15'
      },
      {
        id: "2",
        name: "Digital Dreams",
        description: "Abstract digital art pieces with unique generative patterns",
        image: "/images/collection2.jpg",
        creator: "0x8765...4321",
        totalSupply: 5000,
        minted: 5000,
        floorPrice: 0.08,
        totalVolume: 400,
        holders: 1800,
        status: 'completed',
        category: 'art',
        createdAt: '2024-01-10'
      },
      {
        id: "3",
        name: "Neon Nights",
        description: "Cyberpunk-inspired characters in a neon-lit world",
        image: "/images/collection3.jpg",
        creator: "0xabcd...efgh",
        totalSupply: 3000,
        minted: 1200,
        floorPrice: 0.03,
        totalVolume: 36,
        holders: 950,
        status: 'active',
        category: 'gaming',
        createdAt: '2024-01-20'
      },
      {
        id: "4",
        name: "Pixel Warriors",
        description: "Retro pixel art warriors with unique battle attributes",
        image: "/images/collection4.jpg",
        creator: "0x9876...5432",
        totalSupply: 2000,
        minted: 2000,
        floorPrice: 0.12,
        totalVolume: 240,
        holders: 1200,
        status: 'completed',
        category: 'gaming',
        createdAt: '2024-01-05'
      }
    ]

    setCollections(sampleCollections)
    setFilteredCollections(sampleCollections)
    setLoading(false)
  }, [])

  // Filter collections based on search and category
  useEffect(() => {
    let filtered = collections

    if (searchTerm) {
      filtered = filtered.filter(collection =>
        collection.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        collection.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(collection => collection.category === selectedCategory)
    }

    setFilteredCollections(filtered)
  }, [collections, searchTerm, selectedCategory])

  const totalStats = {
    totalCollections: collections.length,
    totalMinted: collections.reduce((sum, c) => sum + c.minted, 0),
    totalVolume: collections.reduce((sum, c) => sum + c.totalVolume, 0),
    totalHolders: collections.reduce((sum, c) => sum + c.holders, 0)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-gray-200 rounded w-1/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-32 bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-4xl font-bold tracking-tight">Collections</h1>
              <p className="text-muted-foreground mt-2">
                Manage and explore NFT collections
              </p>
            </div>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Create Collection
            </Button>
          </div>

          {/* Stats Cards */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <Eye className="h-4 w-4 text-blue-500" />
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Collections</p>
                    <p className="text-2xl font-bold">{totalStats.totalCollections}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <TrendingUp className="h-4 w-4 text-green-500" />
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Total Minted</p>
                    <p className="text-2xl font-bold">{totalStats.totalMinted.toLocaleString()}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <DollarSign className="h-4 w-4 text-yellow-500" />
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Total Volume</p>
                    <p className="text-2xl font-bold">{totalStats.totalVolume} ETH</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <Users className="h-4 w-4 text-purple-500" />
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Total Holders</p>
                    <p className="text-2xl font-bold">{totalStats.totalHolders.toLocaleString()}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="mb-6">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="flex gap-2 flex-1 max-w-md">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search collections..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="flex items-center gap-2">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'outline'}
                size="icon"
                onClick={() => setViewMode('grid')}
              >
                <Grid3X3 className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'outline'}
                size="icon"
                onClick={() => setViewMode('list')}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Collections Display */}
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all" onClick={() => setSelectedCategory('all')}>
              All ({collections.length})
            </TabsTrigger>
            <TabsTrigger value="art" onClick={() => setSelectedCategory('art')}>
              Art ({collections.filter(c => c.category === 'art').length})
            </TabsTrigger>
            <TabsTrigger value="gaming" onClick={() => setSelectedCategory('gaming')}>
              Gaming ({collections.filter(c => c.category === 'gaming').length})
            </TabsTrigger>
            <TabsTrigger value="active" onClick={() => setSelectedCategory('active')}>
              Active ({collections.filter(c => c.status === 'active').length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-6">
            {viewMode === 'grid' ? (
              <CollectionGrid collections={filteredCollections} />
            ) : (
              <div className="space-y-4">
                {filteredCollections.map(collection => (
                  <CollectionCard key={collection.id} collection={collection} />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="art" className="mt-6">
            {viewMode === 'grid' ? (
              <CollectionGrid collections={filteredCollections} />
            ) : (
              <div className="space-y-4">
                {filteredCollections.map(collection => (
                  <CollectionCard key={collection.id} collection={collection} />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="gaming" className="mt-6">
            {viewMode === 'grid' ? (
              <CollectionGrid collections={filteredCollections} />
            ) : (
              <div className="space-y-4">
                {filteredCollections.map(collection => (
                  <CollectionCard key={collection.id} collection={collection} />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="active" className="mt-6">
            {viewMode === 'grid' ? (
              <CollectionGrid collections={filteredCollections} />
            ) : (
              <div className="space-y-4">
                {filteredCollections.map(collection => (
                  <CollectionCard key={collection.id} collection={collection} />
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>

        {filteredCollections.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No collections found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  )
} 