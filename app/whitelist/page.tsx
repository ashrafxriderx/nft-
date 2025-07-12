"use client"

import { useState } from "react"
import { WhitelistTable } from "@/components/whitelist/whitelist-table"
import { CreateWhitelist } from "@/components/whitelist/create-whitelist"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Users, 
  Plus, 
  Search, 
  Upload, 
  Download,
  CheckCircle,
  Clock,
  XCircle,
  Settings,
  Eye
} from "lucide-react"

interface WhitelistEntry {
  id: string
  walletAddress: string
  collection: string
  tier: 'gold' | 'silver' | 'bronze'
  status: 'active' | 'used' | 'expired'
  mintLimit: number
  mintedCount: number
  addedAt: string
  usedAt?: string
}

export default function WhitelistPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [activeTab, setActiveTab] = useState("all")

  const sampleWhitelist: WhitelistEntry[] = [
    {
      id: "1",
      walletAddress: "0x1234...5678",
      collection: "Cosmic Cats",
      tier: "gold",
      status: "active",
      mintLimit: 3,
      mintedCount: 0,
      addedAt: "2024-01-15"
    },
    {
      id: "2",
      walletAddress: "0x8765...4321",
      collection: "Digital Dreams",
      tier: "silver",
      status: "used",
      mintLimit: 2,
      mintedCount: 2,
      addedAt: "2024-01-10",
      usedAt: "2024-01-20"
    },
    {
      id: "3",
      walletAddress: "0xabcd...efgh",
      collection: "Neon Nights",
      tier: "bronze",
      status: "active",
      mintLimit: 1,
      mintedCount: 0,
      addedAt: "2024-01-20"
    },
    {
      id: "4",
      walletAddress: "0x9876...5432",
      collection: "Pixel Warriors",
      tier: "gold",
      status: "expired",
      mintLimit: 5,
      mintedCount: 3,
      addedAt: "2024-01-05"
    }
  ]

  const filteredWhitelist = sampleWhitelist.filter(entry => {
    const matchesSearch = entry.walletAddress.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         entry.collection.toLowerCase().includes(searchTerm.toLowerCase())
    
    if (activeTab === 'all') return matchesSearch
    if (activeTab === 'active') return matchesSearch && entry.status === 'active'
    if (activeTab === 'used') return matchesSearch && entry.status === 'used'
    if (activeTab === 'expired') return matchesSearch && entry.status === 'expired'
    
    return matchesSearch
  })

  const totalStats = {
    totalEntries: sampleWhitelist.length,
    activeEntries: sampleWhitelist.filter(e => e.status === 'active').length,
    usedEntries: sampleWhitelist.filter(e => e.status === 'used').length,
    totalMinted: sampleWhitelist.reduce((sum, e) => sum + e.mintedCount, 0)
  }

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'gold':
        return 'bg-yellow-500'
      case 'silver':
        return 'bg-gray-400'
      case 'bronze':
        return 'bg-orange-600'
      default:
        return 'bg-gray-500'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-500'
      case 'used':
        return 'bg-blue-500'
      case 'expired':
        return 'bg-red-500'
      default:
        return 'bg-gray-500'
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-4xl font-bold tracking-tight">Whitelist Management</h1>
              <p className="text-muted-foreground mt-2">
                Manage early access and priority minting for your community
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline">
                <Upload className="h-4 w-4 mr-2" />
                Import CSV
              </Button>
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
              <Button onClick={() => setShowCreateForm(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Add Entry
              </Button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <Users className="h-4 w-4 text-blue-500" />
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Total Entries</p>
                    <p className="text-2xl font-bold">{totalStats.totalEntries}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Active</p>
                    <p className="text-2xl font-bold">{totalStats.activeEntries}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4 text-blue-500" />
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Used</p>
                    <p className="text-2xl font-bold">{totalStats.usedEntries}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <Eye className="h-4 w-4 text-purple-500" />
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Total Minted</p>
                    <p className="text-2xl font-bold">{totalStats.totalMinted}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="mb-6">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="flex gap-2 flex-1 max-w-md">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search by wallet or collection..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Whitelist Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all">
              All ({sampleWhitelist.length})
            </TabsTrigger>
            <TabsTrigger value="active">
              Active ({sampleWhitelist.filter(e => e.status === 'active').length})
            </TabsTrigger>
            <TabsTrigger value="used">
              Used ({sampleWhitelist.filter(e => e.status === 'used').length})
            </TabsTrigger>
            <TabsTrigger value="expired">
              Expired ({sampleWhitelist.filter(e => e.status === 'expired').length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-6">
            <WhitelistTable 
              entries={filteredWhitelist}
              onEdit={(id) => console.log('Edit entry:', id)}
              onDelete={(id) => console.log('Delete entry:', id)}
            />
          </TabsContent>

          <TabsContent value="active" className="mt-6">
            <WhitelistTable 
              entries={filteredWhitelist}
              onEdit={(id) => console.log('Edit entry:', id)}
              onDelete={(id) => console.log('Delete entry:', id)}
            />
          </TabsContent>

          <TabsContent value="used" className="mt-6">
            <WhitelistTable 
              entries={filteredWhitelist}
              onEdit={(id) => console.log('Edit entry:', id)}
              onDelete={(id) => console.log('Delete entry:', id)}
            />
          </TabsContent>

          <TabsContent value="expired" className="mt-6">
            <WhitelistTable 
              entries={filteredWhitelist}
              onEdit={(id) => console.log('Edit entry:', id)}
              onDelete={(id) => console.log('Delete entry:', id)}
            />
          </TabsContent>
        </Tabs>

        {filteredWhitelist.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No whitelist entries found matching your criteria.</p>
          </div>
        )}

        {/* Create Form Dialog */}
        {showCreateForm && (
          <CreateWhitelist 
            onClose={() => setShowCreateForm(false)}
            onSubmit={(data) => {
              console.log('Create whitelist entry:', data)
              setShowCreateForm(false)
            }}
          />
        )}
      </div>
    </div>
  )
} 