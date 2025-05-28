"use client";

import { Badge } from "@/components/ui/badge";

const MockNFTBadgeCabinet = () => {
  const mockBadges = [
    { title: "Top Donor", emoji: "🥇" },
    { title: "Weekly Hero", emoji: "🔥" },
    { title: "Meal Master", emoji: "🍽️" },
  ];

  return (
    <div className="flex flex-wrap gap-4">
      {mockBadges.map((badge, i) => (
        <Badge key={i} className="bg-yellow-100 text-yellow-800 px-4 py-2 text-md">
          {badge.emoji} {badge.title}
        </Badge>
      ))}
    </div>
  );
};

export default MockNFTBadgeCabinet;
