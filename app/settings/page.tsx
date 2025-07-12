"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";
import { Settings } from "lucide-react";

export default function SettingsPage() {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(true);

  return (
    <div className="min-h-screen bg-background flex flex-col items-center py-8">
      <Card className="w-full max-w-xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" /> Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <span>Email Notifications</span>
            <Switch checked={emailNotifications} onCheckedChange={setEmailNotifications} />
          </div>
          <div className="flex items-center justify-between">
            <span>Dark Mode</span>
            <Switch checked={darkMode} onCheckedChange={setDarkMode} />
          </div>
          <div className="pt-4 text-xs text-muted-foreground">
            For demo purposes only. Settings are not persisted.
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 