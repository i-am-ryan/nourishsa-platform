"use client";

import { Trophy } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import Image from "next/image";

const leaderboardData = [
  {
    id: 1,
    name: "Thabo",
    avatar: "/avatars/avatar1.png.jpg",
    kgRescued: 36,
    level: "Gold Saver",
    badge: "🥇",
  },
  {
    id: 2,
    name: "Ayanda",
    avatar: "/avatars/avatar2.png.jpg",
    kgRescued: 29,
    level: "Silver Saver",
    badge: "🥈",
  },
  {
    id: 3,
    name: "Neo",
    avatar: "/avatars/avatar3.png.jpg",
    kgRescued: 21,
    level: "Bronze Saver",
    badge: "🥉",
  },
];

export default function ImpactLeaderboard() {
  return (
    <Card className="mb-12">
      <CardHeader className="flex items-center gap-2">
        <Trophy className="w-5 h-5 text-yellow-500" />
        <CardTitle>Community Impact Leaderboard</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {leaderboardData.map((user) => (
          <div
            key={user.id}
            className="flex items-center justify-between bg-white/70 backdrop-blur rounded-lg p-3 shadow-sm border hover:scale-[1.01] transition-transform"
          >
            <div className="flex items-center gap-4">
              <Image
                src={user.avatar}
                alt={`${user.name} avatar`}
                width={40}
                height={40}
                className="rounded-full border object-cover"
              />
              <div>
                <p className="font-semibold text-gray-900">
                  {user.name} <span>{user.badge}</span>
                </p>
                <p className="text-xs text-gray-500">{user.level}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-emerald-600 font-bold">{user.kgRescued}kg saved</p>
              <Progress value={(user.kgRescued / 40) * 100} className="w-24 mt-1" />
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
