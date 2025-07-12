"use client"

import { useState, useEffect } from "react"
import { DashboardHeader } from "@/components/dashboard/header"
import { StatsCards } from "@/components/dashboard/stats-cards"
import { AnalyticsChart } from "@/components/dashboard/analytics-chart"
import { CollectionsList } from "@/components/dashboard/collections-list"
import { QuickActions } from "@/components/dashboard/quick-actions"
import { RecentActivity } from "@/components/dashboard/recent-activity"
import { DatabaseStatus } from "@/components/dashboard/database-status"
import { useAuth } from "@/hooks/use-auth"
import { LoadingSpinner } from "@/components/ui/loading-spinner"

interface DashboardData {
  totalCollections: number
  totalMinted: number
  totalRevenue: number
  activeHolders: number
}

export default function DashboardPage() {
  const { user, loading } = useAuth()
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading dashboard data
    const timer = setTimeout(() => {
      setDashboardData({
        totalCollections: 12,
        totalMinted: 2847,
        totalRevenue: 45.6,
        activeHolders: 1234,
      })
      setIsLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  if (loading || isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      <div className="container mx-auto px-4 py-8 space-y-8">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <StatsCards data={dashboardData} />
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <AnalyticsChart />
          </div>
          <QuickActions />
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <CollectionsList />
          <RecentActivity />
        </div>

        <div className="grid gap-6 lg:grid-cols-1">
          <DatabaseStatus />
        </div>
      </div>
    </div>
  )
}
