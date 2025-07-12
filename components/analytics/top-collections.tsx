import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp } from "lucide-react"
import Image from "next/image"

const collections = [
  {
    id: 1,
    name: "Cosmic Cats",
    image: "/placeholder.svg?height=40&width=40",
    volume: 125.5,
    sales: 850,
    change: "+12.5%",
    trend: "up",
  },
  {
    id: 2,
    name: "Digital Dreams",
    image: "/placeholder.svg?height=40&width=40",
    volume: 98.2,
    sales: 1000,
    change: "+8.7%",
    trend: "up",
  },
  {
    id: 3,
    name: "Neon Nights",
    image: "/placeholder.svg?height=40&width=40",
    volume: 67.8,
    sales: 234,
    change: "+15.2%",
    trend: "up",
  },
  {
    id: 4,
    name: "Pixel Warriors",
    image: "/placeholder.svg?height=40&width=40",
    volume: 45.3,
    sales: 567,
    change: "-2.1%",
    trend: "down",
  },
]

export function TopCollections() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Collections</CardTitle>
        <CardDescription>Best performing collections by volume</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {collections.map((collection, index) => (
            <div key={collection.id} className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="text-sm font-medium text-muted-foreground w-6">#{index + 1}</div>
                <Image
                  src={collection.image || "/placeholder.svg"}
                  alt={collection.name}
                  width={40}
                  height={40}
                  className="rounded-lg"
                />
                <div>
                  <h4 className="font-medium">{collection.name}</h4>
                  <p className="text-sm text-muted-foreground">{collection.sales} sales</p>
                </div>
              </div>
              <div className="text-right">
                <div className="font-semibold">{collection.volume} MON</div>
                <div
                  className={`text-sm flex items-center ${
                    collection.trend === "up" ? "text-green-600" : "text-red-600"
                  }`}
                >
                  <TrendingUp className={`w-3 h-3 mr-1 ${collection.trend === "down" ? "rotate-180" : ""}`} />
                  {collection.change}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
