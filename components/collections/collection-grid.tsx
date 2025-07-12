"use client"

import { CollectionCard } from "./collection-card"

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

interface CollectionGridProps {
  collections: Collection[]
}

export function CollectionGrid({ collections }: CollectionGridProps) {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {collections.map((collection) => (
        <CollectionCard key={collection.id} collection={collection} />
      ))}
    </div>
  )
} 