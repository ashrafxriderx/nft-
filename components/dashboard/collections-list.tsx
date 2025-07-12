import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MoreHorizontal } from "lucide-react"
import Image from "next/image"

const collections = [
  {
    id: 1,
    name: "Cosmic Cats",
    image: "/images/collection1.jpg",
    minted: 850,
    total: 1000,
    revenue: 12.5,
    status: "active",
  },
  {
    id: 2,
    name: "Digital Dreams",
    image: "/images/collection2.jpg",
    minted: 1000,
    total: 1000,
    revenue: 25.0,
    status: "sold-out",
  },
  {
    id: 3,
    name: "Neon Nights",
    image: "/images/collection3.jpg",
    minted: 234,
    total: 500,
    revenue: 5.8,
    status: "active",
  },
]

export function CollectionsList() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Collections</CardTitle>
        <CardDescription>Manage and monitor your NFT collections</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {collections.map((collection) => (
            <div key={collection.id} className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center space-x-4">
                <Image
                  src={collection.image || "/placeholder.svg"}
                  alt={collection.name}
                  width={60}
                  height={60}
                  className="rounded-lg"
                />
                <div>
                  <h3 className="font-semibold">{collection.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {collection.minted}/{collection.total} minted
                  </p>
                  <div className="flex items-center space-x-2 mt-1">
                    <Badge variant={collection.status === "sold-out" ? "default" : "secondary"}>
                      {collection.status === "sold-out" ? "Sold Out" : "Active"}
                    </Badge>
                    <span className="text-sm font-medium text-green-600">{collection.revenue} MON</span>
                  </div>
                </div>
              </div>
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
