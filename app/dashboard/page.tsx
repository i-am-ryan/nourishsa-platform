"use client";

import React from "react";
import dynamic from "next/dynamic";

// Direct imports (safe)
import SmartBundleBuilder from "@/components/SmartBundleBuilder";
import BudgetMealPlanner from "@/components/BudgetMealPlanner";
import Leaderboard from "@/components/Leaderboard";

// Dynamic imports (to avoid window-related SSR errors)
const GamificationTracker = dynamic(() => import("@/components/GamificationTracker"), { ssr: false });
const SkillTrainer = dynamic(() => import("@/components/SkillTrainer"), { ssr: false });
const MockNFTBadgeCabinet = dynamic(() => import("@/components/MockNFTBadgeCabinet"), { ssr: false });
const ImpactMap = dynamic(() => import("@/components/ImpactMap"), { ssr: false });
const BlockchainTraceability = dynamic(() => import("@/components/BlockchainTraceability"), { ssr: false });

export default function DashboardPage() {
  return (
    <main className="p-6 max-w-5xl mx-auto space-y-10">
      <h1 className="text-3xl font-bold text-gray-900">📦 NourishSA Dashboard</h1>
      <p className="text-gray-600">
        Plan meals, learn food skills, view food impact & rescue surplus with AI.
      </p>

      {/* 🎯 Gamified Tracker Section */}
      <section>
        <h2 className="text-2xl font-semibold mt-6 mb-4">Your Impact Journey</h2>
        <GamificationTracker />
      </section>

      {/* 🔍 Smart AI Tools */}
      <SmartBundleBuilder />
      <BudgetMealPlanner />
      <Leaderboard />

      {/* 🧾 Blockchain Traceability */}
      <BlockchainTraceability />

      {/* 🌍 Interactive Map */}
      <section>
        <h2 className="text-2xl font-semibold mt-8 mb-2">Live Impact Map</h2>
        <ImpactMap />
      </section>

      {/* 🎓 Skill Learning */}
      <SkillTrainer />

      {/* 🏅 NFT Reward Cabinet */}
      <section>
        <h2 className="text-2xl font-semibold mt-10 mb-4">Your Badges</h2>
        <MockNFTBadgeCabinet />
      </section>
    </main>
  );
}
