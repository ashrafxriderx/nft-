import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"

interface PreviewCardProps {
  data: {
    name: string
    description: string
    symbol: string
    maxSupply: number
    mintPrice: number
    image: any
  }
}

export function PreviewCard({ data }: PreviewCardProps) {
  return (
    <Card className="sticky top-8">
      <CardHeader>
        <CardTitle>Preview</CardTitle>
        <CardDescription>How your collection will appear to users</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="aspect-square bg-muted rounded-lg flex items-center justify-center">
            {data.image ? (
              <Image
                src={data.image || "/placeholder.svg"}
                alt="Collection preview"
                width={200}
                height={200}
                className="rounded-lg"
              />
            ) : (
              <div className="text-center text-muted-foreground">
                <div className="text-4xl mb-2">🖼️</div>
                <p className="text-sm">Collection image will appear here</p>
              </div>
            )}
          </div>

          <div className="space-y-2">
            <h3 className="text-xl font-bold">{data.name || "Collection Name"}</h3>
            <div className="flex items-center space-x-2">
              <Badge variant="secondary">{data.symbol || "SYMBOL"}</Badge>
              <Badge variant="outline">{data.maxSupply || 0} items</Badge>
            </div>
            <p className="text-sm text-muted-foreground">
              {data.description || "Collection description will appear here..."}
            </p>
            <div className="flex items-center justify-between pt-4 border-t">
              <span className="text-sm font-medium">Mint Price</span>
              <span className="text-lg font-bold">{data.mintPrice || 0} MON</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
