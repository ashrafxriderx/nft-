"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";

const collections = [
  {
    id: "1",
    name: "Cosmic Cats",
    image: "/images/collection1.jpg",
    token: "CAT-4F2A-9B1C-8D7E-2A1F-9C3B-7E2D-4A6F-1B2C-3D4E-5F6A-7B8C-9D0E",
  },
  {
    id: "2",
    name: "Digital Dreams",
    image: "/images/collection2.jpg",
    token: "DREAM-7E1B-2C3D-4F5A-6B7C-8D9E-0A1B-2C3D-4E5F-6A7B-8C9D-0E1F",
  },
  {
    id: "3",
    name: "Neon Nights",
    image: "/images/collection3.jpg",
    token: "NEON-8A2D-5F6E-1B3C-7D8E-9F0A-2B3C-4D5E-6F7A-8B9C-0D1E-2F3A",
  },
  {
    id: "4",
    name: "Pixel Warriors",
    image: "/images/collection4.jpg",
    token: "PIXEL-1B3C-7D8E-9F0A-2B3C-4D5E-6F7A-8B9C-0D1E-2F3A-4B5C-6D7E",
  },
];

export default function GatingPage() {
  const [selectedId, setSelectedId] = useState<string>("");
  const selected = collections.find((c) => c.id === selectedId);

  return (
    <div className="min-h-screen bg-background flex flex-col items-center py-8">
      <Card className="w-full max-w-xl">
        <CardHeader>
          <CardTitle>Token Gating</CardTitle>
          <div className="text-muted-foreground text-sm mt-1">Generate access code snippets</div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <label className="block mb-2 font-medium">Select Collection</label>
            <Select value={selectedId} onValueChange={setSelectedId}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Choose a collection..." />
              </SelectTrigger>
              <SelectContent>
                {collections.map((c) => (
                  <SelectItem key={c.id} value={c.id}>
                    <div className="flex items-center gap-2">
                      <img src={c.image} alt={c.name} className="w-8 h-8 rounded object-cover" />
                      <span>{c.name}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          {selected && (
            <div className="flex flex-col items-center gap-4 mt-6">
              <img src={selected.image} alt={selected.name} className="w-24 h-24 rounded-lg object-cover border" />
              <div className="text-lg font-semibold">{selected.name}</div>
              <div className="w-full">
                <label className="block mb-1 text-sm font-medium">Access Token</label>
                <Input value={selected.token} readOnly className="font-mono text-base" />
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
} 