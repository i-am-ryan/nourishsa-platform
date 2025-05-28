"use client";

import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Flame, BadgeCheck, Trophy } from "lucide-react";
import confetti from "canvas-confetti";

interface GamificationStats {
  totalKg: number;
  xp: number;
  streak: number;
  lastDonationDate: string;
  badges: string[];
}

export default function GamificationTracker() {
  const [username, setUsername] = useState("user1");
  const [kg, setKg] = useState("");
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState<GamificationStats | null>(null);
  const [level, setLevel] = useState(1);
  const [xpProgress, setXpProgress] = useState(0);
  const [showPopup, setShowPopup] = useState(false);

  const fetchStats = async () => {
    const res = await fetch("http://localhost:5000/api/gamification-stats", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username }),
    });
    const data = await res.json();
    if (data.success) {
      const stats = data.stats;
      setStats(stats);

      const xp = stats.xp;
      const newLevel = Math.floor(xp / 100) + 1;
      const remainder = xp % 100;

      if (newLevel > level) {
        confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
        setShowPopup(true);
        setTimeout(() => setShowPopup(false), 3000);
      }

      setLevel(newLevel);
      setXpProgress(remainder);
    }
  };

  const handleSubmit = async () => {
    if (!kg || isNaN(Number(kg))) return;
    setLoading(true);
    await fetch("http://localhost:5000/api/submit-donation", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username,
        kg,
        date: new Date().toISOString().split("T")[0],
      }),
    });
    await fetchStats();
    setKg("");
    setLoading(false);
  };

  useEffect(() => {
    fetchStats();
  }, [username]);

  return (
    <Card className="mb-10 relative">
      <CardHeader>
        <CardTitle>🎮 Gamified Donation Tracker</CardTitle>
        <p className="text-sm text-muted-foreground">
          Track your food-saving XP and streaks!
        </p>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <Input
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            placeholder="KG donated"
            value={kg}
            onChange={(e) => setKg(e.target.value)}
          />
          <Button onClick={handleSubmit} disabled={loading}>
            {loading ? "Saving..." : "Submit"}
          </Button>
        </div>

        {stats && (
          <div className="space-y-3 mt-4 bg-gray-50 p-4 rounded-md border">
            <p className="font-medium text-gray-700">
              🧮 Total Donated: <strong>{stats.totalKg} kg</strong>
            </p>
            <p className="text-blue-600 font-semibold">💥 XP: {stats.xp}</p>

            <div>
              <div className="flex justify-between text-sm text-gray-700 mb-1">
                <span>Level {level}</span>
                <span>{xpProgress}/100 XP</span>
              </div>
              <Progress value={xpProgress} className="h-2 bg-blue-200" />
            </div>

            <div className="flex items-center gap-2 text-orange-600 mt-2">
              <Flame
                className={`w-5 h-5 ${stats.streak >= 3 ? "animate-pulse" : ""}`}
              />
              <span>
                🔥 Streak: {stats.streak} day{stats.streak !== 1 && "s"}
              </span>
            </div>

            <div className="text-sm text-gray-500">
              📅 Last donation: {stats.lastDonationDate}
            </div>

            {stats.badges.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2 text-green-700 text-sm">
                {stats.badges.map((badge, i) => (
                  <div key={i} className="flex items-center gap-1">
                    <BadgeCheck className="w-4 h-4" />
                    {badge}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </CardContent>

      {showPopup && (
        <div className="absolute top-4 right-4 z-50 bg-white border shadow-lg rounded-lg p-3 animate-bounce">
          <div className="flex items-center gap-2 text-green-600 font-bold">
            <Trophy className="w-5 h-5" />
            <span>Level Up! You reached Level {level} 🥳</span>
          </div>
        </div>
      )}
    </Card>
  );
}
