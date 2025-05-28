"use client";

import React from "react";
import SmartBundleBuilder from "@/components/SmartBundleBuilder";
import BudgetMealPlanner from "@/components/BudgetMealPlanner";
import SkillTrainer from "@/components/SkillTrainer";
import MockNFTBadgeCabinet from "@/components/MockNFTBadgeCabinet";
import ImpactMap from "@/components/ImpactMap";
import BlockchainTraceability from "@/components/BlockchainTraceability";
import GamificationTracker from "@/components/GamificationTracker";
import Leaderboard from "@/components/Leaderboard";

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
