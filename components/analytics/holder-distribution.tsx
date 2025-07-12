"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts"

const data = [
  { name: "1 NFT", value: 65, color: "#8884d8" },
  { name: "2-5 NFTs", value: 25, color: "#82ca9d" },
  { name: "6-10 NFTs", value: 7, color: "#ffc658" },
  { name: "10+ NFTs", value: 3, color: "#ff7c7c" },
]

export function HolderDistribution() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Holder Distribution</CardTitle>
        <CardDescription>Distribution of NFTs among holders</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            value: {
              label: "Percentage",
            },
          }}
          className="h-[300px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, value }) => `${name}: ${value}%`}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <ChartTooltip content={<ChartTooltipContent />} />
            </PieChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
