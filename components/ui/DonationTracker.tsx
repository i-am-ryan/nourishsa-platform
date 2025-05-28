
"use client";

import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Flame, Star, Medal } from "lucide-react";
import { GamificationStats } from "@/types/gamification";

const mockStats: GamificationStats = {
  totalKg: 63,
  xp: 780,
  streak: 4,
  lastDonationDate: "2025-05-28",
  badges: ["🥇 Top Rescuer", "🔥 3-Day Streak", "⭐ First Donation"]
};

export default function DonationTracker() {
  const [stats, setStats] = useState<GamificationStats | null>(null);

  useEffect(() => {
    // Simulate backend fetch
    setTimeout(() => setStats(mockStats), 500);
  }, []);

  if (!stats) return <p className="text-center">Loading tracker...</p>;

  return (
    <Card className="mb-10">
      <CardHeader className="flex items-center space-x-2">
        <Star className="w-5 h-5 text-yellow-500" />
        <CardTitle>🎮 Donation Tracker</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-700">
          <div>
            <p className="font-medium">Total Saved</p>
            <p className="text-emerald-600 font-bold">{stats.totalKg} kg</p>
          </div>
          <div>
            <p className="font-medium">XP</p>
            <Progress value={stats.xp % 1000} className="h-2" />
            <p>{stats.xp} XP</p>
          </div>
          <div>
            <p className="font-medium">Streak</p>
            <p className="text-orange-500 font-bold">
              <Flame className="inline w-4 h-4 mr-1" />{stats.streak} Days
            </p>
          </div>
          <div>
            <p className="font-medium">Last Donation</p>
            <p>{stats.lastDonationDate}</p>
          </div>
        </div>

        <div>
          <p className="font-medium mt-4 mb-2">Badges</p>
          <div className="flex flex-wrap gap-2">
            {stats.badges.map((badge, i) => (
              <span
                key={i}
                className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full shadow-sm"
              >
                <Medal className="inline w-4 h-4 mr-1" /> {badge}
              </span>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
