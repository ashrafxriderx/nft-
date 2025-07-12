import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock } from "lucide-react"

const activities = [
  {
    id: 1,
    type: "mint",
    description: "New mint in Cosmic Cats",
    user: "0x1234...5678",
    time: "2 minutes ago",
    status: "success",
  },
  {
    id: 2,
    type: "collection",
    description: "Digital Dreams sold out",
    user: "System",
    time: "1 hour ago",
    status: "info",
  },
  {
    id: 3,
    type: "mint",
    description: "Bulk mint in Neon Nights",
    user: "0x9876...5432",
    time: "3 hours ago",
    status: "success",
  },
  {
    id: 4,
    type: "error",
    description: "Failed mint attempt",
    user: "0xabcd...efgh",
    time: "5 hours ago",
    status: "error",
  },
]

export function RecentActivity() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>Latest events across your collections</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-start space-x-3 p-3 border rounded-lg">
              <div className="bg-muted rounded-full p-2">
                <Clock className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium">{activity.description}</p>
                <p className="text-xs text-muted-foreground">by {activity.user}</p>
                <p className="text-xs text-muted-foreground">{activity.time}</p>
              </div>
              <Badge
                variant={
                  activity.status === "success" ? "default" : activity.status === "error" ? "destructive" : "secondary"
                }
              >
                {activity.status}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
