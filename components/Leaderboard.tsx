"use client";
import { useEffect, useState } from "react";
import { Trophy } from "lucide-react";

// ✅ Add interface for TypeScript to know the structure of each leader
interface LeaderEntry {
  username: string;
  xp: number;
}

export default function Leaderboard() {
  const [leaders, setLeaders] = useState<LeaderEntry[]>([]); // ✅ Apply the type

  useEffect(() => {
    fetch("http://localhost:5000/api/leaderboard")
      .then((res) => res.json())
      .then((data) => setLeaders(data));
  }, []);

  return (
    <div className="bg-white border rounded-lg p-4 mt-6">
      <h2 className="text-xl font-bold flex items-center gap-2">
        <Trophy className="text-yellow-500" /> Leaderboard
      </h2>
      <ul className="mt-2 space-y-1">
        {leaders.map((user, index) => (
          <li key={index} className="flex justify-between">
            <span className="font-medium">{index + 1}. {user.username}</span>
            <span className="text-sm text-gray-600">{user.xp} XP</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
