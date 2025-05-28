"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

const mockBadges = [
  {
    name: "Top Donor",
    description: "Donated 10+ surplus items",
    icon: "/icons/top-donor.png",
    earned: true,
  },
  {
    name: "Weekly Hero",
    description: "Rescued food 5 days in a row",
    icon: "/icons/weekly-hero.png",
    earned: true,
  },
  {
    name: "First Rescue",
    description: "Your first saved bundle!",
    icon: "/icons/first-rescue.png",
    earned: true,
  },
  {
    name: "Volunteer Champ",
    description: "Completed 3 delivery pickups",
    icon: "/icons/volunteer.png",
    earned: false,
  },
];

export default function MockNFTBadgeCabinet() {
  const [xp, setXp] = useState(620);
  const nextLevel = 1000;
  const progress = Math.min((xp / nextLevel) * 100, 100);

  return (
    <Card className="mb-10">
      <CardHeader>
        <CardTitle className="text-lg">🏅 NFT Reward Cabinet</CardTitle>
        <p className="text-sm text-muted-foreground">
          Celebrate your impact and unlock digital badges for your contributions
        </p>
      </CardHeader>

      <CardContent className="space-y-4">
        <div>
          <p className="text-sm font-medium mb-1">Your XP Progress</p>
          <Progress value={progress} className="h-2 bg-emerald-100" />
          <p className="text-xs text-gray-500 mt-1">
            {xp} XP / {nextLevel} XP to next badge
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {mockBadges.map((badge, i) => (
            <div
              key={i}
              className={`relative border rounded-lg p-3 flex flex-col items-center text-center transition shadow-sm ${
                badge.earned ? "bg-white" : "bg-gray-100 opacity-60"
              }`}
            >
              <img
                src={badge.icon}
                alt={badge.name}
                className="w-12 h-12 mb-2"
              />
              <h4 className="font-semibold text-sm mb-1">{badge.name}</h4>
              <p className="text-xs text-muted-foreground">{badge.description}</p>
              {badge.earned && (
                <Badge className="absolute top-1 right-1 text-[10px] bg-gradient-to-r from-orange-500 to-emerald-600 text-white">
                  Earned
                </Badge>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
