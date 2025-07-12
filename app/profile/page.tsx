"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center py-8">
      <Card className="w-full max-w-xl">
        <CardHeader>
          <CardTitle>Profile</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center space-y-4">
          <Avatar className="w-24 h-24">
            <AvatarImage src="/placeholder-user.jpg" alt="User" />
            <AvatarFallback>DT</AvatarFallback>
          </Avatar>
          <div className="text-lg font-semibold">Demo User</div>
          <div className="text-sm text-muted-foreground">demo@nftterminal.com</div>
        </CardContent>
      </Card>
    </div>
  );
} 