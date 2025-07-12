import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, DollarSign, Users, Activity } from "lucide-react"

interface MetricsOverviewProps {
  data: {
    totalVolume: number
    totalSales: number
    averagePrice: number
    uniqueHolders: number
  } | null
}

export function MetricsOverview({ data }: MetricsOverviewProps) {
  if (!data) return null

  const metrics = [
    {
      title: "Total Volume",
      value: `${data.totalVolume} MON`,
      change: "+12.5%",
      icon: DollarSign,
      color: "text-green-600",
    },
    {
      title: "Total Sales",
      value: data.totalSales.toLocaleString(),
      change: "+8.2%",
      icon: TrendingUp,
      color: "text-blue-600",
    },
    {
      title: "Average Price",
      value: `${data.averagePrice} MON`,
      change: "+3.1%",
      icon: Activity,
      color: "text-purple-600",
    },
    {
      title: "Unique Holders",
      value: data.uniqueHolders.toLocaleString(),
      change: "+15.7%",
      icon: Users,
      color: "text-orange-600",
    },
  ]

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      {metrics.map((metric, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
            <metric.icon className={`h-4 w-4 ${metric.color}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metric.value}</div>
            <p className="text-xs text-green-600">{metric.change} from last month</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
