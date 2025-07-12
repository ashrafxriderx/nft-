"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts"

const data = [
  { date: "2024-01", sales: 65, volume: 850 },
  { date: "2024-02", sales: 59, volume: 720 },
  { date: "2024-03", sales: 80, volume: 1100 },
  { date: "2024-04", sales: 81, volume: 1200 },
  { date: "2024-05", sales: 56, volume: 680 },
  { date: "2024-06", sales: 55, volume: 650 },
  { date: "2024-07", sales: 40, volume: 500 },
]

export function SalesChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Sales Trends</CardTitle>
        <CardDescription>Monthly sales volume and transaction count</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            sales: {
              label: "Sales",
              color: "hsl(var(--chart-1))",
            },
            volume: {
              label: "Volume",
              color: "hsl(var(--chart-2))",
            },
          }}
          className="h-[300px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <XAxis dataKey="date" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Line
                type="monotone"
                dataKey="sales"
                stroke="hsl(var(--chart-1))"
                strokeWidth={2}
                dot={{ fill: "hsl(var(--chart-1))" }}
              />
              <Line
                type="monotone"
                dataKey="volume"
                stroke="hsl(var(--chart-2))"
                strokeWidth={2}
                dot={{ fill: "hsl(var(--chart-2))" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
