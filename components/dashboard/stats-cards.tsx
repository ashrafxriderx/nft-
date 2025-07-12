import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, Minus } from "lucide-react"

interface StatsCardsProps {
  data: {
    totalCollections: number
    totalMinted: number
    totalRevenue: number
    activeHolders: number
  } | null
}

export function StatsCards({ data }: StatsCardsProps) {
  if (!data) return null

  const stats = [
    {
      title: "Total Collections",
      value: data.totalCollections,
      change: "+12%",
      trend: "up",
      icon: TrendingUp,
    },
    {
      title: "NFTs Minted",
      value: data.totalMinted.toLocaleString(),
      change: "+8%",
      trend: "up",
      icon: TrendingUp,
    },
    {
      title: "Revenue (MON)",
      value: data.totalRevenue,
      change: "+23%",
      trend: "up",
      icon: TrendingUp,
    },
    {
      title: "Active Holders",
      value: data.activeHolders.toLocaleString(),
      change: "0%",
      trend: "neutral",
      icon: Minus,
    },
  ]

  return (
    <>
      {stats.map((stat, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            <stat.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p
              className={`text-xs ${
                stat.trend === "up"
                  ? "text-green-600"
                  : stat.trend === "down"
                    ? "text-red-600"
                    : "text-muted-foreground"
              }`}
            >
              {stat.change} from last month
            </p>
          </CardContent>
        </Card>
      ))}
    </>
  )
}
