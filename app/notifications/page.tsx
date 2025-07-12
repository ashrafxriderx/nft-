"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bell } from "lucide-react";

const notifications = [
  { id: 1, title: "Welcome to NFT Terminal!", message: "Your account has been created successfully.", date: "2024-06-01" },
  { id: 2, title: "New Collection Launched", message: "Check out the new 'Cosmic Cats' collection!", date: "2024-06-02" },
  { id: 3, title: "Mint Success", message: "You have successfully minted an NFT.", date: "2024-06-03" },
];

export default function NotificationsPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center py-8">
      <Card className="w-full max-w-xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" /> Notifications
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-4">
            {notifications.map((n) => (
              <li key={n.id} className="border-b pb-4 last:border-b-0 last:pb-0">
                <div className="font-semibold">{n.title}</div>
                <div className="text-sm text-muted-foreground">{n.message}</div>
                <div className="text-xs text-muted-foreground mt-1">{n.date}</div>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
} 