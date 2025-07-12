"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Activity } from "lucide-react"

interface ActivityItem {
  id: string
  type: "mint" | "transfer" | "sale"
  collection: string
  user: string
  amount?: number
  timestamp: Date
}

export function RealTimeActivity() {
  const [activities, setActivities] = useState<ActivityItem[]>([
    {
      id: "1",
      type: "mint",
      collection: "Cosmic Cats",
      user: "0x1234...5678",
      amount: 0.1,
      timestamp: new Date(Date.now() - 30000),
    },
    {
      id: "2",
      type: "sale",
      collection: "Digital Dreams",
      user: "0x9876...5432",
      amount: 2.5,
      timestamp: new Date(Date.now() - 120000),
    },
    {
      id: "3",
      type: "transfer",
      collection: "Neon Nights",
      user: "0xabcd...efgh",
      timestamp: new Date(Date.now() - 300000),
    },
  ])

  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate new activity
      const newActivity: ActivityItem = {
        id: Date.now().toString(),
        type: ["mint", "transfer", "sale"][Math.floor(Math.random() * 3)] as any,
        collection: ["Cosmic Cats", "Digital Dreams", "Neon Nights"][Math.floor(Math.random() * 3)],
        user: `0x${Math.random().toString(16).substr(2, 4)}...${Math.random().toString(16).substr(2, 4)}`,
        amount: Math.random() > 0.5 ? Math.random() * 5 : undefined,
        timestamp: new Date(),
      }

      setActivities((prev) => [newActivity, ...prev.slice(0, 9)])
    }, 10000)

    return () => clearInterval(interval)
  }, [])

  const getActivityColor = (type: string) => {
    switch (type) {
      case "mint":
        return "bg-green-500"
      case "sale":
        return "bg-blue-500"
      case "transfer":
        return "bg-purple-500"
      default:
        return "bg-gray-500"
    }
  }

  const formatTime = (timestamp: Date) => {
    const diff = Date.now() - timestamp.getTime()
    const minutes = Math.floor(diff / 60000)
    if (minutes < 1) return "just now"
    if (minutes < 60) return `${minutes}m ago`
    const hours = Math.floor(minutes / 60)
    return `${hours}h ago`
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Activity className="w-5 h-5 mr-2" />
          Live Activity
        </CardTitle>
        <CardDescription>Real-time blockchain events</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-muted/50">
              <div className={`w-2 h-2 rounded-full ${getActivityColor(activity.type)}`} />
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2">
                  <Badge variant="outline" className="text-xs">
                    {activity.type}
                  </Badge>
                  <span className="text-sm font-medium truncate">{activity.collection}</span>
                </div>
                <div className="text-xs text-muted-foreground">
                  {activity.user}
                  {activity.amount && <span className="ml-2 font-medium">{activity.amount} MON</span>}
                </div>
              </div>
              <div className="text-xs text-muted-foreground">{formatTime(activity.timestamp)}</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
