"use client"

import { useState, useEffect } from "react"
import { AnalyticsHeader } from "@/components/analytics/header"
import { MetricsOverview } from "@/components/analytics/metrics-overview"
import { SalesChart } from "@/components/analytics/sales-chart"
import { HolderDistribution } from "@/components/analytics/holder-distribution"
import { TopCollections } from "@/components/analytics/top-collections"
import { RealTimeActivity } from "@/components/analytics/real-time-activity"
import { LoadingSpinner } from "@/components/ui/loading-spinner"

export default function AnalyticsPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [analyticsData, setAnalyticsData] = useState(null)

  useEffect(() => {
    // Simulate real-time data loading
    const timer = setTimeout(() => {
      setAnalyticsData({
        totalVolume: 1234.5,
        totalSales: 5678,
        averagePrice: 0.25,
        uniqueHolders: 2341,
      })
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <AnalyticsHeader />
      <div className="container mx-auto px-4 py-8 space-y-8">
        <MetricsOverview data={analyticsData} />

        <div className="grid gap-6 lg:grid-cols-2">
          <SalesChart />
          <HolderDistribution />
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <TopCollections />
          </div>
          <RealTimeActivity />
        </div>
      </div>
    </div>
  )
}
