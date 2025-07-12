"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis } from "recharts"

const data = [
  { name: "Jan", mints: 400, revenue: 2400 },
  { name: "Feb", mints: 300, revenue: 1398 },
  { name: "Mar", mints: 200, revenue: 9800 },
  { name: "Apr", mints: 278, revenue: 3908 },
  { name: "May", mints: 189, revenue: 4800 },
  { name: "Jun", mints: 239, revenue: 3800 },
  { name: "Jul", mints: 349, revenue: 4300 },
]

export function AnalyticsChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Minting Activity</CardTitle>
        <CardDescription>Monthly minting volume and revenue trends</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            mints: {
              label: "Mints",
              color: "hsl(var(--chart-1))",
            },
            revenue: {
              label: "Revenue",
              color: "hsl(var(--chart-2))",
            },
          }}
          className="h-[300px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <XAxis dataKey="name" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Area
                type="monotone"
                dataKey="mints"
                stackId="1"
                stroke="hsl(var(--chart-1))"
                fill="hsl(var(--chart-1))"
                fillOpacity={0.6}
              />
              <Area
                type="monotone"
                dataKey="revenue"
                stackId="2"
                stroke="hsl(var(--chart-2))"
                fill="hsl(var(--chart-2))"
                fillOpacity={0.6}
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
